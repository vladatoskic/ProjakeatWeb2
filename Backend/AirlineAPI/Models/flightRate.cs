using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineAPI.Models
{
    public class flightRate
    {
        [Key]
        public int RateIdd { get; set; }

        [Required]
        public int UserIdd { get; set; }
        [Required]

        public int FlightInfo2FlightID { get; set; }
        [Required]

        public int Ocena { get; set; }
        [Required]
        public int CompanyIdd { get; set; }


    }
}
