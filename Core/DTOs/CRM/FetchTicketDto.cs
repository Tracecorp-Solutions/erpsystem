using Core.Models.CRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.CRM
{
    public class FetchTicketDto
    {
        public Ticket Ticket { get; set; }

        public IEnumerable<TicketAuditTrail> TicketAuditTrails { get; set; }
    }
}
