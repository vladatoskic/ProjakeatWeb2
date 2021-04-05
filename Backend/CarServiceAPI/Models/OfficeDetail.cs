using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceAPI.Models
{
    public class OfficeDetail
    {
        [Key]
        public int OfficeId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string OfficeName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Address { get; set; }

        [Required]
        [Column(TypeName = "float")]
        public float Lat { get; set; }

        [Required]
        [Column(TypeName = "float")]
        public float Lng { get; set; }
    }
}
