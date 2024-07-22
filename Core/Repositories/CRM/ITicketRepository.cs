using Core.DTOs.CRM;
using Core.Models.CRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.CRM
{
    public interface ITicketRepository
    {
        Task CreateTicketAsync(TicketDto ticket);

        Task<IEnumerable<Ticket>> GetAllTicketsAsync();

        Task<FetchTicketDto> GetTicketByIdAsync(int ticketId);

        Task<IEnumerable<Ticket>> GetTicketsByBranchIdAsync(int branchId);
    }
}
