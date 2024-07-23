using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.CRM
{
    public class TicketStatusSummaryDto
    {
        public string Month { get; set; }
        public int OpenTickets { get; set; }
        public int TicketsInProgress { get; set; }
        public int TicketsResolved { get; set; }
    }
}
