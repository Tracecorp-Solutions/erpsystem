using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string FullName { get; set; }
        public string? OrganizationName { get; set; }
        public string Email { get; set; }

        public bool Verified { get; set; }
        public bool Active { get; set; }
    }
}
