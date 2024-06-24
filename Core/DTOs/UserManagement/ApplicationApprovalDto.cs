using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.UserManagement
{
    public class ApplicationApprovalDto
    {
        public string ApplicationNumber { get; set; }
        public string Reason { get; set; }
        public bool Rejected { get; set; }
    }
}
