using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirlineAPI.Models;

namespace AirlineAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FriendsController : ControllerBase
    {
        private readonly UserDetailContext _context;

        public FriendsController(UserDetailContext context)
        {
            _context = context;
        }

        // GET: api/Friends
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Friends>>> GetFriends()
        {
            return await _context.Friends.ToListAsync();
        }

        // GET: api/Friends/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Friends>> GetFriends(int id)
        {
            var friends = await _context.Friends.FindAsync(id);

            if (friends == null)
            {
                return NotFound();
            }

            return friends;
        }

        // PUT: api/Friends/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> PutFriends(int id,[FromBody] Friends friends)
        {
            if (id != friends.Id)
            {
                return BadRequest();
            }

            _context.Entry(friends).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Friends
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<Friends>> PostFriends(Friends friends)
        {
            var friend = _context.Friends.Add(friends);
            //var user1 = _context.UserDetails.FirstOrDefault(u => u.Email == friend.Entity.UserEmail1);
            //user1.UserFriends.Add(friend.Entity);
            //var user2 = _context.UserDetails.FirstOrDefault(u => u.Email == friend.Entity.UserEmail2);
            //user2.UserFriends.Add(friend.Entity); 
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFriends", new { id = friends.Id }, friends);
        }

        //[HttpGet("GetFriend/{email}")]
        //[AllowAnonymous]
        //public async Task<ActionResult<List<Friends>>> GetFriend(string email)
        //{
        //    // nadjes sve iz baze koji imaju taj email za prvog usera ili drugog
        //    //_context.Friends.SelectMany(x => x.UserEmail1 == email);
        //    return null;
        //}

        // DELETE: api/Friends/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<Friends>> DeleteFriends(int id)
        {
            var friends = await _context.Friends.FindAsync(id);
            if (friends == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friends);
            await _context.SaveChangesAsync();

            return friends;
        }

        private bool FriendsExists(int id)
        {
            return _context.Friends.Any(e => e.Id == id);
        }
    }
}
