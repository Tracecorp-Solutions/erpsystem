using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs.CRM;
using Core.Models.CRM;
using Core.Repositories.CRM;

namespace Services.Repositories.CRM
{
    public class TicketCategoryRepository : ITicketCategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public TicketCategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddTicketCategory(TicketCategoryDto dto)
        {
            var ticketCategory = new TicketCategory
            {
                Name = dto.Name,
                DepartmentId = dto.DepartmentId,
                Description = dto.Description
            };

            _context.TicketCategories.Add(ticketCategory);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTicketCategory(int id)
        {

            var ticketCategory = await _context.TicketCategories.FindAsync(id);
            if (ticketCategory != null)
                throw new ArgumentException("Ticket Category not found");

            _context.TicketCategories.Remove(ticketCategory);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TicketCategoryDto>> GetTicketCategories()
        {
            var ticketCategories = _context.TicketCategories.Select(x => new TicketCategoryDto
            {
                Name = x.Name,
                DepartmentId = x.DepartmentId,
                Description = x.Description
            });

            return ticketCategories == null ? throw new ArgumentException("No ticket category found"): ticketCategories;
        }

        public async Task UpdateTicketCategory(TicketCategory ticket)
        {
            var ticketCategory = await _context.TicketCategories.FindAsync(ticket.Id);
            if (ticketCategory == null)
                throw new ArgumentException("Ticket Category not found");

            ticketCategory.Name = ticket.Name;
            ticketCategory.DepartmentId = ticket.DepartmentId;

            await _context.SaveChangesAsync();
        }


    }
}
