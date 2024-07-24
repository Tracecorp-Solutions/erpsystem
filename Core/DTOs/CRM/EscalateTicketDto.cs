using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.CRM
{
    public class EscalateTicketDto
    {
        public int DepartmentId { get; set; }
        public string ReasonOfEscalation { get; set; }
        public int TicketId { get; set; }
        public string RecordedBy { get; set; }
    }
}
