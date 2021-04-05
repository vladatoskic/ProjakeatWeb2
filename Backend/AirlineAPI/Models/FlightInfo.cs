using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineAPI.Models
{
    public class FlightInfo
    {
        [Key]
        public string FlightID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string From { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string To { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public DateTime Departing { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public DateTime Returning { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public  string Baggage { get; set; }


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

    }
}
