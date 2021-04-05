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
    public class CarInfoesController : ControllerBase
    {
        private readonly UserDetailContext _context;

        public CarInfoesController(UserDetailContext context)
        {
            _context = context;
        }

        // GET: api/CarInfoes
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CarInfo>>> GetCarInfo()
        {
            return await _context.CarInfo.Include(x=>x.RateCar).ToListAsync();
        }

        // GET: api/CarInfoes/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<CarInfo>> GetCarInfo(int id)
        {
            var carInfo = await _context.CarInfo.FindAsync(id);

            if (carInfo == null)
            {
                return NotFound();
            }

            return carInfo;
        }

        // PUT: api/CarInfoes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<IActionResult> PutCarInfo(int id, CarInfo carInfo)
        {
            //if (id != carInfo.CarId)
            //{
            //    return BadRequest();
            //}

            _context.Entry(carInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarInfoExists(id))
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

        // POST: api/CarInfoes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<CarInfo>> PostCarInfo(CarInfo carInfo)
        {
            _context.CarInfo.Add(carInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarInfo", new { id = carInfo.CarId }, carInfo);
        }

        // DELETE: api/CarInfoes/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "User,Admin,FlightAdmin,RentAdmin")]
        [AllowAnonymous]
        public async Task<ActionResult<CarInfo>> DeleteCarInfo(int id)
        {
            var carInfo = await _context.CarInfo.FindAsync(id);
            if (carInfo == null)
            {
                return NotFound();
            }

            _context.CarInfo.Remove(carInfo);
            await _context.SaveChangesAsync();

            return carInfo;
        }

        private bool CarInfoExists(int id)
        {
            return _context.CarInfo.Any(e => e.CarId == id);
        }
    }
}
