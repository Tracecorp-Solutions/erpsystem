using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class InviteUserDto
    {
        public List<string> Emails { get; set; }
        public int RoleId { get; set; }
        public int OrganisationId { get; set; }
    }
}
