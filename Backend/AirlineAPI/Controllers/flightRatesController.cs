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
    public class flightRatesController : ControllerBase
    {
        private readonly UserDetailContext _context;

        public flightRatesController(UserDetailContext context)
        {
            _context = context;
        }

        // GET: api/flightRates
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<flightRate>>> GetflightRate()
        {
            return await _context.flightRate.ToListAsync();
        }

        // GET: api/flightRates/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<flightRate>> GetflightRate(int id)
        {
            var flightRate = await _context.flightRate.FindAsync(id);

            if (flightRate == null)
            {
                return NotFound();
            }

            return flightRate;
        }

        // PUT: api/flightRates/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> PutflightRate(int id, flightRate flightRate)
        {
            if (id != flightRate.RateIdd)
            {
                return BadRequest();
            }

            _context.Entry(flightRate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!flightRateExists(id))
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

        // POST: api/flightRates
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<flightRate>> PostflightRate(flightRate flightRate)
        {
            _context.flightRate.Add(flightRate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetflightRate", new { id = flightRate.RateIdd }, flightRate);
        }

        // DELETE: api/flightRates/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<flightRate>> DeleteflightRate(int id)
        {
            var flightRate = await _context.flightRate.FindAsync(id);
            if (flightRate == null)
            {
                return NotFound();
            }

            _context.flightRate.Remove(flightRate);
            await _context.SaveChangesAsync();

            return flightRate;
        }

        private bool flightRateExists(int id)
        {
            return _context.flightRate.Any(e => e.RateIdd == id);
        }
    }
}
