using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineAPI.Models
{
    public class UserDetail
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [Column(TypeName ="nvarchar(100)")]
        public string Name { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string City { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PhoneNumber { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string UserType { get; set; }

        public string StringToken { get; set; }

       // public List<CarInfo> UserCars { get; set; } = new List<CarInfo>();

        public List<FlightInfo2> UserFlights { get; set; } = new List<FlightInfo2>();

        //public List<Friends> UserFriends { get; set; } = new List<Friends>();
        public bool IsVerify { get; set; }
        public bool LogOut { get; set; }

    }
}
