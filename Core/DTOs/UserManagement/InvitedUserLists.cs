using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.UserManagement
{
    public class InvitedUserLists
    {
        public string Role { get; set; }
        public List<string> Emails { get; set; }
    }
}
