using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceAPI.Models
{
    public class CarInfo
    {
        [Key]
        public int CarId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string ServiceName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Brand { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Model { get; set; }

        [Required]
        [Column(TypeName = "decimal")]
        public long Year { get; set; }

        [Required]
        [Column(TypeName = "decimal")]
        public long PricePerDay { get; set; }

        [Required]
        [Column(TypeName = "decimal")]
        public long NumOfSeats { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(500)")]
        public string ImgUrl { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Location { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string EndLocation { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string TypeOfCar { get; set; }

        public virtual List<Rate> RateCar { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public int IsTaken { get; set; }

        public bool Sale { get; set; }
    }
}
