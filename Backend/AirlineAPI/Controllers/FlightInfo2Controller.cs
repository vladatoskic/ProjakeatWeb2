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
    public class FlightInfo2Controller : ControllerBase
    {
        private readonly UserDetailContext _context;

        public FlightInfo2Controller(UserDetailContext context)
        {
            _context = context;
        }

        // GET: api/FlightInfo2
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<FlightInfo2>>> GetFlightInfo2()
        {
            return await _context.FlightInfo2.Include(f=>f.FlightRates).ToListAsync();
        }

        // GET: api/FlightInfo2/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightInfo2>> GetFlightInfo2(int id)
        {
            var flightInfo2 = await _context.FlightInfo2.FindAsync(id);

            if (flightInfo2 == null)
            {
                return NotFound();
            }

            return flightInfo2;
        }

        // PUT: api/FlightInfo2/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> PutFlightInfo2(int id, FlightInfo2 flightInfo2)
        {
            //if (id != flightInfo2.FlightID)
            //{
            //    return BadRequest();
            //}
            var flightInfo = _context.FlightInfo2.FirstOrDefault(x => x.FlightID == flightInfo2.FlightID);
            flightInfo.Departing = flightInfo2.Departing;
            flightInfo.Baggage = flightInfo2.Baggage;
            flightInfo.ClassF = flightInfo2.ClassF;
            flightInfo.CompanyName = flightInfo2.CompanyName;
            flightInfo.Duration = flightInfo2.Duration;
            flightInfo.To = flightInfo2.To;
            flightInfo.Returning = flightInfo2.Returning;
            flightInfo.From = flightInfo2.From;
            flightInfo.Stops = flightInfo2.Stops;
            flightInfo.Duration = flightInfo2.Duration;
            flightInfo.Price = flightInfo2.Price;
            flightInfo.SeatsNumber = flightInfo2.SeatsNumber;
            flightInfo.StartTime = flightInfo2.StartTime;
            flightInfo.EndTime = flightInfo2.EndTime;
           




            _context.FlightInfo2.Update(flightInfo);
            //_context.Entry(flightInfo2).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightInfo2Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/FlightInfo2
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightInfo2>> PostFlightInfo2(FlightInfo2 flightInfo2, [FromQuery] int companyId)
        {
            var flight = _context.FlightInfo2.Add(flightInfo2);
            _context.CompanyAbout.FirstOrDefault(x => x.AvioCompID == companyId).CompanyFlights.Add(flight.Entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlightInfo2", new { id = flightInfo2.FlightID }, flightInfo2);
        }

        // DELETE: api/FlightInfo2/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightInfo2>> DeleteFlightInfo2(int id)
        {
            var flightInfo2 = await _context.FlightInfo2.FindAsync(id);
            if (flightInfo2 == null)
            {
                return NotFound();
            }

            _context.FlightInfo2.Remove(flightInfo2);
            await _context.SaveChangesAsync();

            return flightInfo2;
        }

        private bool FlightInfo2Exists(int id)
        {
            return _context.FlightInfo2.Any(e => e.FlightID == id);
        }
    }
}
