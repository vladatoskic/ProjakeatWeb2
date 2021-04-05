using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarServiceAPI.Models;

namespace CarServiceAPI.Models
{
    public class UserDetailContext : DbContext 
    {

        public UserDetailContext(DbContextOptions<UserDetailContext> options) : base(options)
        {


        }

        public DbSet<UserDetail> UserDetails { get; set; }


        public DbSet<RentService> RentService { get; set; }

       

        public DbSet<CarInfo> CarInfo { get; set; }

     

        public DbSet<CarServiceAPI.Models.OfficeDetail> OfficeDetail { get; set; }

        public DbSet<CarServiceAPI.Models.ReservationDetails> ReservationDetails { get; set; }

      

        public DbSet<CarServiceAPI.Models.Rate> Rate { get; set; }

       
    }
}
