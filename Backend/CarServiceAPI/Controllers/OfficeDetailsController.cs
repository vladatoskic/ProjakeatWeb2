using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class OfficeDetailsController : ControllerBase
    {
        private readonly UserDetailContext _context;

        public OfficeDetailsController(UserDetailContext context)
        {
            _context = context;
        }

        // GET: api/OfficeDetails
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<OfficeDetail>>> GetOfficeDetail()
        {
            return await _context.OfficeDetail.ToListAsync();
        }

        // GET: api/OfficeDetails/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<OfficeDetail>> GetOfficeDetail(int id)
        {
            var officeDetail = await _context.OfficeDetail.FindAsync(id);

            if (officeDetail == null)
            {
                return NotFound();
            }

            return officeDetail;
        }

        // PUT: api/OfficeDetails/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> PutOfficeDetail(int id, OfficeDetail officeDetail)
        {
            if (id != officeDetail.OfficeId)
            {
                return BadRequest();
            }

            _context.Entry(officeDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OfficeDetailExists(id))
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

        // POST: api/OfficeDetails
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<OfficeDetail>> PostOfficeDetail(OfficeDetail officeDetail)
        {
            _context.OfficeDetail.Add(officeDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOfficeDetail", new { id = officeDetail.OfficeId }, officeDetail);
        }

        // DELETE: api/OfficeDetails/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<OfficeDetail>> DeleteOfficeDetail(int id)
        {
            var officeDetail = await _context.OfficeDetail.FindAsync(id);
            if (officeDetail == null)
            {
                return NotFound();
            }

            _context.OfficeDetail.Remove(officeDetail);
            await _context.SaveChangesAsync();

            return officeDetail;
        }

        private bool OfficeDetailExists(int id)
        {
            return _context.OfficeDetail.Any(e => e.OfficeId == id);
        }
    }
}
