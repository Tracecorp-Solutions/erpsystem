using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.UserManagement
{
    public class AssignUserRoleDto
    {
        public string Email { get; set; }
        public int RoleId { get; set; }
    }
}
