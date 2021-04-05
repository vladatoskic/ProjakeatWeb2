using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineAPI.Models
{
    public class Seat
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Number2 { get; set; }
        [Required]
        public string Class2 { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public int Discount { get; set; }
        [Required]
        public bool Taken { get; set; }

      //  [ForeignKey("FlightInfo2")]
        public int FlightInfo2Id { get; set; }
        //public FlightInfo2 FlightInfo2 { get; set; }
    }
}
