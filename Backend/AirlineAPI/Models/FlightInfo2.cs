using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineAPI.Models
{
    public class FlightInfo2
    {
        [Key]
        public int FlightID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string From { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string To { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Departing { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Returning { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Baggage { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string ClassF { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public int Stops { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Duration { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string CompanyName { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public int Price { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public int SeatsNumber { get; set; }
        [Required]
        public string StartTime { get; set; }
        [Required]
        public string EndTime { get; set; }


        //public virtual List<Rate2> RateFlight{ get; set; }
        public virtual List<flightRate> FlightRates { get; set; } = new List<flightRate>();
        public virtual List<Seat> Seats { get; set; } = new List<Seat>();
        public int CompanyAboutAvioCompID { get; set; }
        //public int UserDetailUserId { get; set; }
    }
}
