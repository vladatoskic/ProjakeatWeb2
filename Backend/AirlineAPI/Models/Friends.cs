using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineAPI.Models
{
    public class Friends
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public bool Accepted { get; set; }
        [Required]
        public bool Removed { get; set; }
        [Required]
        public bool Added { get; set; }

        [Required]
        public string UserEmail1 { get; set; }
        [Required]
        public string UserEmail2 { get; set; }
    }
}
