using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarServiceAPI.Models;

namespace CarServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReservationDetailsController : ControllerBase
    {
        private readonly UserDetailContext _context;
       // private IEmailService email;

        public ReservationDetailsController(UserDetailContext context /*IEmailService emailService*/)
        {
            _context = context;
          //  this.email = emailService;
        }

        [HttpGet]
        [Route("GetAllReservation")]
        [AllowAnonymous]
        public async Task<List<ReservationDetails>> GetAllReservation()
        {
            return await _context.ReservationDetails.Include(p => p.User).Include(p => p.Car).Include(p => p.StartOffice).Include(p => p.EndOffice).ToListAsync();
        }

        [HttpGet("GetReservationForCar/{carId}")]
        [AllowAnonymous]
        public async Task<List<ReservationDetails>> GetReservationForCar(int carId)
        {
            return await _context.ReservationDetails.Where(x => x.Car.CarId == carId).Include(p=>p.User).Include(p=>p.Car).Include(p => p.StartOffice).Include(p => p.EndOffice).ToListAsync();
        }


        [HttpPost]
        [Microsoft.AspNetCore.Authorization.AllowAnonymous]
        [Route("CreateReservationForCar")]
        public async Task<IActionResult> CreateReservationForCar( ReservationDetails reservationDetails)
        {
            try
            {
                var car = await _context.CarInfo.FirstOrDefaultAsync(x => x.CarId == reservationDetails.Car.CarId);
                var user = await _context.UserDetails.FirstOrDefaultAsync(x => x.UserId == reservationDetails.User.UserId);
                
                reservationDetails.Car = car;
                reservationDetails.User = user;

                _context.Entry(reservationDetails).State = reservationDetails.ReservationId == 0 ? EntityState.Added : EntityState.Modified;
                if(reservationDetails.StartOffice != null || reservationDetails.EndOffice != null)
                {
                _context.Entry(reservationDetails.StartOffice).State = reservationDetails.StartOffice.OfficeId == 0 ? EntityState.Added : EntityState.Modified;
                _context.Entry(reservationDetails.EndOffice).State = reservationDetails.EndOffice.OfficeId == 0 ? EntityState.Added : EntityState.Modified;

                }



                await _context.ReservationDetails.AddAsync(reservationDetails);
                await _context.SaveChangesAsync();

                const string subject = "Reservation";
                var body = $"<p>For:{reservationDetails.User.Email}</p><p> Uspesno ste rezervisai let</a>";
               // await email.SendMailAsync(reservationDetails.User.Email, subject, body);



                return await Task.FromResult<IActionResult>(Ok());
            }
            catch (Exception ex)
            {
                return await Task.FromResult<IActionResult>(BadRequest(ex.Message));
            }
        }

        [HttpDelete]
        [Route("DeleteReservationForCar")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteReservationForCar(int reservationId)
        {
            try
            {
                var reservation = await _context.ReservationDetails.FirstOrDefaultAsync(x => x.ReservationId == reservationId);
                if (reservation == null)
                    return await Task.FromResult<IActionResult>(BadRequest());

                _context.Remove(reservation);
                await _context.SaveChangesAsync();
                return await Task.FromResult<IActionResult>(Ok());
            }
            catch (Exception)
            {
                return await Task.FromResult<IActionResult>(BadRequest());
            }
        }


        [HttpDelete("DeleteReservation/{reservationId}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteReservation(int reservationId)
        {
            try
            {
                var reservation = await _context.ReservationDetails.FindAsync(reservationId);
                if (reservation == null)
                {
                    return NotFound();
                }

                _context.ReservationDetails.Remove(reservation);
                await _context.SaveChangesAsync();
                return await Task.FromResult<IActionResult>(Ok());
            }
            catch (Exception)
            {
                return await Task.FromResult<IActionResult>(BadRequest());
            }

        }
    }
}
