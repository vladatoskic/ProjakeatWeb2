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
    public class FlightInfoesController : ControllerBase
    {
        private readonly UserDetailContext _context;

        public FlightInfoesController(UserDetailContext context)
        {
            _context = context;
        }

        // GET: api/FlightInfoes
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<FlightInfo>>> GetFlightsInfo()
        {
            return await _context.FlightsInfo.ToListAsync();
        }

        // GET: api/FlightInfoes/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightInfo>> GetFlightInfo(string id)
        {
            var flightInfo = await _context.FlightsInfo.FindAsync(id);

            if (flightInfo == null)
            {
                return NotFound();
            }

            return flightInfo;
        }

        // PUT: api/FlightInfoes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> PutFlightInfo(string id, FlightInfo flightInfo)
        {
            if (id != flightInfo.FlightID)
            {
                return BadRequest();
            }

            _context.Entry(flightInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightInfoExists(id))
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

        // POST: api/FlightInfoes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightInfo>> PostFlightInfo(FlightInfo flightInfo)
        {
            _context.FlightsInfo.Add(flightInfo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FlightInfoExists(flightInfo.FlightID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFlightInfo", new { id = flightInfo.FlightID }, flightInfo);
        }

        // DELETE: api/FlightInfoes/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<FlightInfo>> DeleteFlightInfo(string id)
        {
            var flightInfo = await _context.FlightsInfo.FindAsync(id);
            if (flightInfo == null)
            {
                return NotFound();
            }

            _context.FlightsInfo.Remove(flightInfo);
            await _context.SaveChangesAsync();

            return flightInfo;
        }

        private bool FlightInfoExists(string id)
        {
            return _context.FlightsInfo.Any(e => e.FlightID == id);
        }
    }
}
