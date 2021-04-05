using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceAPI.Models
{
    public class Rate
    {

        [Key]
        public int RateID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public int RateNumber { get; set; }

        public int CarInfoCarId { get; set; }
    }
}
