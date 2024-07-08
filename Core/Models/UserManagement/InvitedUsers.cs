using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Models.UserManagement
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

        [JsonIgnore]
        public Role? Role { get; set; }

        [JsonIgnore]
        public Organisation? Organisation { get; set; }
    }
}
