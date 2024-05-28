using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class InvitedUsers
    {
        public int? Id { get; set; }
        public string Email { get; set; }
        public int OrganisationId { get; set; }
        public int RoleId { get; set; }
        public bool Registered { get; set; }
    }
}
