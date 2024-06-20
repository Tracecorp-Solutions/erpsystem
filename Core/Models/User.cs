using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Gender { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string? ProfilePic { get; set; }

        [JsonIgnore]
        public string? PasswordHash { get; set; }
        public bool Verified { get; set; }
        public bool Active { get; set; }
        public bool IsAdmin { get; set; }

        [ForeignKey("Organisation")]
        public int? OrganisationId { get; set; }

        public string? Token { get; set; }   

        public Organisation? Organisation { get; set; }

        [ForeignKey("Role")]
        public int? RoleId { get; set; }
        public Role? Role { get; set; }
    }
}
