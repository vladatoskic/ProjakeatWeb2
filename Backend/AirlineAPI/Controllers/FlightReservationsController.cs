using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces.Services;
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
    public class FlightReservationsController : ControllerBase
    {
        private readonly UserDetailContext _context;
        private IEmailService email;

        public FlightReservationsController(UserDetailContext context, IEmailService emailService)
        {
            _context = context;
            this.email = emailService;
        }

        // GET: api/FlightReservations
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<FlightReservation>>> GetFlightReservation()
        {
            return await _context.FlightReservation.Include(i => i.ReservedSeat).Include(i => i.ReservedFlight).Include(i => i.ReservedUser).ToListAsync();
        }

        // GET: api/FlightReservations/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightReservation>> GetFlightReservation(int id)
        {
            var flightReservation = await _context.FlightReservation.FindAsync(id);

            if (flightReservation == null)
            {
                return NotFound();
            }

            return flightReservation;
        }

        // PUT: api/FlightReservations/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> PutFlightReservation(int id, FlightReservation flightReservation)
        {
            if (id != flightReservation.ReservationID)
            {
                return BadRequest();
            }

            _context.Entry(flightReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightReservationExists(id))
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

        // POST: api/FlightReservations
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightReservation>> PostFlightReservation(FlightReservation flightReservation)
        {
            var flight = _context.FlightInfo2.FirstOrDefault(f => f.FlightID == flightReservation.ReservedFlight.FlightID);
            var seat = _context.Seat.FirstOrDefault(f => f.Id == flightReservation.ReservedSeat.Id);
            var user = _context.UserDetails.FirstOrDefault(f => f.UserId == flightReservation.ReservedUser.UserId);
            flightReservation.ReservedFlight = flight;
            flightReservation.ReservedSeat = seat;
            flightReservation.ReservedUser = user;

            _context.FlightReservation.Add(flightReservation);
            await _context.SaveChangesAsync();

            const string subject = "Reservation";
            var body = $"<p>For:{flightReservation.ReservedUser.Email}</p><p> Uspesno ste rezervisai let</a>";

            await email.SendMailAsync(flightReservation.ReservedUser.Email, subject, body);

            return CreatedAtAction("GetFlightReservation", new { id = flightReservation.ReservationID }, flightReservation);
        }

        // DELETE: api/FlightReservations/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightReservation>> DeleteFlightReservation(int id)
        {
            var flightReservation = await _context.FlightReservation.FindAsync(id);
            if (flightReservation == null)
            {
                return NotFound();
            }

            _context.FlightReservation.Remove(flightReservation);
            await _context.SaveChangesAsync();

            return flightReservation;
        }

        private bool FlightReservationExists(int id)
        {
            return _context.FlightReservation.Any(e => e.ReservationID == id);
        }
    }
}
