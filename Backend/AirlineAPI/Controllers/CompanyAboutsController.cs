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
    public class CompanyAboutsController : ControllerBase
    {
        private readonly UserDetailContext _context;

        public CompanyAboutsController(UserDetailContext context)
        {
            _context = context;
        }

        // GET: api/CompanyAbouts
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CompanyAbout>>> GetCompanyAbout()
        {
            return await _context.CompanyAbout.Include(x=>x.CompanyFlights).ToListAsync();
        }

        // GET: api/CompanyAbouts/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<CompanyAbout>> GetCompanyAbout(int id)
        {
            var companyAbout = await _context.CompanyAbout.FindAsync(id);

            if (companyAbout == null)
            {
                return NotFound();
            }

            return companyAbout;
        }

        // PUT: api/CompanyAbouts/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> PutCompanyAbout(int id,[FromBody] CompanyAbout companyAbout)
        {
            //if (id != companyAbout.AvioCompID)
            //{
            //    return BadRequest();
            //}

            _context.Entry(companyAbout).State = EntityState.Modified;

            var ca = _context.CompanyAbout.FirstOrDefault(x => x.AvioCompID == companyAbout.AvioCompID);
            ca.CompanyFlights=companyAbout.CompanyFlights;
            foreach (var item in ca.CompanyFlights)
            {
                _context.Entry(item).State = item.FlightID == 0 ? EntityState.Added : EntityState.Modified;

            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyAboutExists(id))
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

        // POST: api/CompanyAbouts
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<CompanyAbout>> PostCompanyAbout(CompanyAbout companyAbout)
        {
            _context.CompanyAbout.Add(companyAbout);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompanyAbout", new { id = companyAbout.AvioCompID }, companyAbout);
        }

        // DELETE: api/CompanyAbouts/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<CompanyAbout>> DeleteCompanyAbout(int id)
        {
            var companyAbout = await _context.CompanyAbout.FindAsync(id);
            if (companyAbout == null)
            {
                return NotFound();
            }

            _context.CompanyAbout.Remove(companyAbout);
            await _context.SaveChangesAsync();

            return companyAbout;
        }

        private bool CompanyAboutExists(int id)
        {
            return _context.CompanyAbout.Any(e => e.AvioCompID == id);
        }
    }
}
