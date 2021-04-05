using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlineAPI.Models;

namespace AirlineAPI.Models
{
    public class UserDetailContext : DbContext 
    {

        public UserDetailContext(DbContextOptions<UserDetailContext> options) : base(options)
        {


        }

        public DbSet<UserDetail> UserDetails { get; set; }


       

        public DbSet<FlightInfo> FlightsInfo { get; set; }


        public DbSet<AirlineAPI.Models.CompanyAbout> CompanyAbout { get; set; }

        public DbSet<AirlineAPI.Models.FlightInfo2> FlightInfo2 { get; set; }

    

        public DbSet<AirlineAPI.Models.Friends> Friends { get; set; }

        public DbSet<AirlineAPI.Models.Seat> Seat { get; set; }

        public DbSet<AirlineAPI.Models.FlightReservation> FlightReservation { get; set; }

      

        public DbSet<AirlineAPI.Models.flightRate> flightRate { get; set; }
    }
}
