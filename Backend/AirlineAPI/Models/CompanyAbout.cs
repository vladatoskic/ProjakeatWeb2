using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineAPI.Models
{
    public class CompanyAbout
    {
        [Key]
        public int AvioCompID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string AvioCompName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string AvioCompAddress { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string AvioCompAbout { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string AvioCompDestinations { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string AvioCompFastReservationDiscount { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string AvioCompSeats { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string AvioCompPrices { get; set; }

        //public virtual List<Rate> RateCompany { get; set; } = new List<Rate>();

        public virtual List<FlightInfo2> CompanyFlights { get; set; } = new List<FlightInfo2>();

    }
}
