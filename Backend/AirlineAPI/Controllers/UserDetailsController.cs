using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces.Services;
using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using AirlineAPI.Models;

namespace AirlineAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserDetailsController : ControllerBase
    {
        private readonly UserDetailContext _context;
        private IEmailService email;

        public UserDetailsController(UserDetailContext context, IEmailService emailService)
        {
            _context = context;
            this.email = emailService;
        }

        // GET: api/UserDetails
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserDetail>>> GetUserDetails()
        {
            return await _context.UserDetails.ToListAsync();
        }


        // GET: api/UserDetails/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDetail>> GetUserDetail(int id)
        {
            var userDetail = await _context.UserDetails.FindAsync(id);

            if (userDetail == null)
            {
                return NotFound();
            }

            return userDetail;
        }

        
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDetail>> Login([FromBody] EmailAndPassword EmailAndPassword)
        {
            Console.WriteLine(EmailAndPassword.email);
            var userDetail = await _context.UserDetails.FirstOrDefaultAsync(x => x.Email == EmailAndPassword.email && x.Password == EmailAndPassword.password);


            if (userDetail == null)
            {
                return BadRequest("Wrong email");
            }

            if (!userDetail.IsVerify)
            {
                return BadRequest("Not Verified");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("this is my custom Secret key for authnetication");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, userDetail.UserId.ToString()),
                    new Claim(ClaimTypes.Role, userDetail.UserType)
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            userDetail.Password = string.Empty;
            userDetail.StringToken = tokenString;

            return await Task.FromResult<ActionResult<UserDetail>>(Ok(JsonConvert.SerializeObject(userDetail)));
        }


        // PUT: api/UserDetails/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]

        public async Task<IActionResult> PutUserDetail(int id, UserDetail userDetail)
        {
            //if (id != userDetail.UserId)
            //{
            //    return BadRequest();
            //}

            //var userDetails = _context.UserDetails.FirstOrDefault(x => x.UserId == userDetail.UserId);
            //userDetails.Name = userDetail.Name;
            //userDetails.Password = userDetail.Password;
            //userDetails.City = userDetail.City;
            //userDetails.Email = userDetail.Email;
            //userDetails.PhoneNumber = userDetail.PhoneNumber;


            //_context.UserDetails.Update(userDetails);
            _context.Entry(userDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(userDetail);
        }

        // POST: api/UserDetails
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDetail>> PostUserDetail(UserDetail userDetail)
        {
            if(_context.UserDetails.Any(U => U.Email == userDetail.Email))
            {
                return BadRequest(new { message = "email alredy exists" });
            }

            _context.UserDetails.Add(userDetail);
            await _context.SaveChangesAsync();

            const string subject = "Email verification";
            var body = $"<p>For:{userDetail.Email}</p><a href=\"http://localhost:5000/api/UserDetails/ConfirmEmail/{userDetail.Email}\"> Email</a>";

            await email.SendMailAsync(userDetail.Email, subject, body);

            return CreatedAtAction("GetUserDetail", new { id = userDetail.UserId }, userDetail);
        }



        [HttpGet]
        [AllowAnonymous]
        [Route("ConfirmEmail/{mail}")]
        public async Task<object> ConfirmEmailAsync(string mail)
        {
            Console.WriteLine("Uso");
            var user = await GetUserByEmailAsync(mail);
            if (user is null)
            {
                return BadRequest(new { message = "Error processing email" });
            }

            Console.WriteLine("All ok");
            user.IsVerify = true;
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok("Uspesno ste potvrdili mejl");
        }







        public UserDetail AddAsync(UserDetail user)
        {
            if (_context.UserDetails.Any(x => x.Email == user.Email))
                throw new Exception("Email is already taken.");
            try
            {
                _context.UserDetails.AddAsync(user);
                _context.SaveChanges();
                return _context.UserDetails.FirstOrDefault(x => x.Email == user.Email);
            }
            catch (Exception e)
            {
                throw new Exception(e.StackTrace);
            }
        }

        public async Task<UserDetail> GetUserByEmailAsync(string email)
        {
            return await _context.UserDetails.FirstOrDefaultAsync(x => x.Email == email);
        }

        private async Task<(bool isVaild, GoogleApiTokenInfo apiTokenInfo)> VerifyTokenAsync(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri($"https://oauth2.googleapis.com/tokeninfo?id_token={providerToken}");

            HttpResponseMessage responseMessage;

            try
            {
                responseMessage = await httpClient.GetAsync(requestUri);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return (false, null);
            }

            if (responseMessage.StatusCode != HttpStatusCode.OK)
            {
                Console.WriteLine(responseMessage.StatusCode);
                return (false, null);
            }

            var response = await responseMessage.Content.ReadAsStringAsync();
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);
            return (true, googleApiTokenInfo);
        }

        private async Task<(bool isVaild, GoogleApiTokenInfo apiTokenInfo)> VerifyTokenAsync2(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri($"https://graph.facebook.com/me?access_token={providerToken}");

            HttpResponseMessage responseMessage;

            try
            {
                responseMessage = await httpClient.GetAsync(requestUri);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return (false, null);
            }

            if (responseMessage.StatusCode != HttpStatusCode.OK)
            {
                Console.WriteLine(responseMessage.StatusCode);
                return (false, null);
            }

            var response = await responseMessage.Content.ReadAsStringAsync();
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);
            return (true, googleApiTokenInfo);
        }

        [HttpPost("Social")]
        [AllowAnonymous]
        public async Task<object> SocialLogin([FromBody] UserDetail model)
        {
            var tokenVerification = await VerifyTokenAsync(model.StringToken);
            if (tokenVerification.isVaild)
            {
                var user = await GetUserByEmailAsync(tokenVerification.apiTokenInfo.email);
                if (user == null)
                {
                    user = AddAsync(new UserDetail()
                    {
                        Email = tokenVerification.apiTokenInfo.email,
                        Name = model.Name,
                        IsVerify = true,
                        UserType = "User"
                    });

                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("this is my custom Secret key for authnetication");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, user.UserId.ToString()),
                        new Claim(ClaimTypes.Role, user.UserType)
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                // return basic user info (without password) and token to store client side
                return await Task.FromResult<IActionResult>(Ok(JsonConvert.SerializeObject(new
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    StringToken = tokenString,
                    Name = user.Name,
                    UserType = user.UserType,
                    City= "",
                    IsVerify = true,
                    Password= "",
                    PhoneNumber= "",
                    UserCars= "",
                    UserFlights=""
                })));
            }

            return BadRequest(new { message = "Error logging in with google" });
        }




        [HttpPost("SocialFB")]
        [AllowAnonymous]
        public async Task<object> SocialLoginFB([FromBody] UserDetail model)
        {
            var tokenVerification = await VerifyTokenAsync2(model.StringToken);
            if (tokenVerification.isVaild)
            {
                var user = await GetUserByEmailAsync(tokenVerification.apiTokenInfo.email);
                if (user == null)
                {
                    user = AddAsync(new UserDetail()
                    {
                        Email = tokenVerification.apiTokenInfo.email,
                        Name = model.Name,
                        IsVerify = true,
                        UserType = "User"
                    });

                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("this is my custom Secret key for authnetication");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, user.UserId.ToString()),
                        new Claim(ClaimTypes.Role, user.UserType)
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                // return basic user info (without password) and token to store client side
                return await Task.FromResult<IActionResult>(Ok(JsonConvert.SerializeObject(new
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    tokenString = tokenString,
                    Name = user.Name,
                    UserType = user.UserType
                })));
            }

            return BadRequest(new { message = "Error logging in with google" });
        }







        // DELETE: api/UserDetails/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]

        public async Task<ActionResult<UserDetail>> DeleteUserDetail(int id)
        {
            var userDetail = await _context.UserDetails.FindAsync(id);
            if (userDetail == null)
            {
                return NotFound();
            }

            _context.UserDetails.Remove(userDetail);
            await _context.SaveChangesAsync();

            return userDetail;
        }

        private bool UserDetailExists(int id)
        {
            return _context.UserDetails.Any(e => e.UserId == id);
        }

    }






    public class EmailAndPassword
    {
        public string email { get; set; }
        public string password { get; set; }
    }

    public class GoogleApiTokenInfo
    {
        /// <summary>
        /// The Issuer Identifier for the Issuer of the response. Always https://accounts.google.com or accounts.google.com for Google ID tokens.
        /// </summary>
        public string iss { get; set; }

        /// <summary>
        /// Access token hash. Provides validation that the access token is tied to the identity token. If the ID token is issued with an access token in the server flow, this is always
        /// included. This can be used as an alternate mechanism to protect against cross-site request forgery attacks, but if you follow Step 1 and Step 3 it is not necessary to verify the 
        /// access token.
        /// </summary>
        public string at_hash { get; set; }

        /// <summary>
        /// Identifies the audience that this ID token is intended for. It must be one of the OAuth 2.0 client IDs of your application.
        /// </summary>
        public string aud { get; set; }

        /// <summary>
        /// An identifier for the user, unique among all Google accounts and never reused. A Google account can have multiple emails at different points in time, but the sub value is never
        /// changed. Use sub within your application as the unique-identifier key for the user.
        /// </summary>
        public string sub { get; set; }

        /// <summary>
        /// True if the user's e-mail address has been verified; otherwise false.
        /// </summary>
        public string email_verified { get; set; }

        /// <summary>
        /// The client_id of the authorized presenter. This claim is only needed when the party requesting the ID token is not the same as the audience of the ID token. This may be the
        /// case at Google for hybrid apps where a web application and Android app have a different client_id but share the same project.
        /// </summary>
        public string azp { get; set; }

        /// <summary>
        /// The user's email address. This may not be unique and is not suitable for use as a primary key. Provided only if your scope included the string "email".
        /// </summary>
        public string email { get; set; }

        /// <summary>
        /// The time the ID token was issued, represented in Unix time (integer seconds).
        /// </summary>
        public string iat { get; set; }

        /// <summary>
        /// The time the ID token expires, represented in Unix time (integer seconds).
        /// </summary>
        public string exp { get; set; }

        /// <summary>
        /// The user's full name, in a displayable form. Might be provided when:
        /// The request scope included the string "profile"
        /// The ID token is returned from a token refresh
        /// When name claims are present, you can use them to update your app's user records. Note that this claim is never guaranteed to be present.
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// The URL of the user's profile picture. Might be provided when:
        /// The request scope included the string "profile"
        /// The ID token is returned from a token refresh
        /// When picture claims are present, you can use them to update your app's user records. Note that this claim is never guaranteed to be present.
        /// </summary>
        public string picture { get; set; }

        public string given_name { get; set; }

        public string family_name { get; set; }

        public string locale { get; set; }

        public string alg { get; set; }

        public string kid { get; set; }
    }
}
