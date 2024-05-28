using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class InvitedUsers
    {
        public int? Id { get; set; }
        public string Email { get; set; }

        [ForeignKey("Organisation")]
        public int OrganisationId { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public bool Registered { get; set; }

        public Role? Role { get; set; }

        public Organisation? Organisation { get; set; }
    }
}
