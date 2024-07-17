using Core.DTOs.CRM;
using Core.Models.CRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.CRM
{
    public interface ITicketCategoryRepository
    {
        Task AddTicketCategory(TicketCategoryDto dto);
        Task UpdateTicketCategory(TicketCategoryDto ticket);
        Task DeleteTicketCategory(int id);
        Task<IEnumerable<TicketCategory>> GetTicketCategories();
    }
}
