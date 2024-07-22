using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.CRM
{
    public class TicketAuditTrail
    {
        public int Id { get; set; }
        public int TicketId { get; set; }
        public string Status { get; set; }

        [ForeignKey("Department")]
        public int AssignedTo { get; set; }
        public string ReasonOfEscalation { get; set; }
        public string RecordedBy { get; set; }
        public DateTime RecordedAt { get; set; }

        public virtual Department Department { get; set; }

    }
}
