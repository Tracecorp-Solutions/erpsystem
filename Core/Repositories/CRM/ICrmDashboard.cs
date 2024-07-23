using Core.DTOs.CRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.CRM
{
    public interface ICrmDashboard
    {
        Task<TicketStatisticsDto> GetTicketStatisticsAsync();
        Task<IEnumerable<TicketStatusSummaryDto>> GetTicketStatusSummaryAsync();
    }
}
