using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs.CRM;
using Core.Models.CRM;
using Core.Repositories.CRM;
using Microsoft.EntityFrameworkCore;

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
                Description = dto.Description,
                IsDeleted = false
            };

            _context.TicketCategories.Add(ticketCategory);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTicketCategory(int id)
        {

            var ticketCategory = await _context.TicketCategories.FindAsync(id);
            if (ticketCategory == null)
                throw new ArgumentException("Ticket Category not found");

            _context.TicketCategories.Remove(ticketCategory);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TicketCategory>> GetTicketCategories()
        {
            var ticketcategories = await _context.TicketCategories
                .Include(x => x.Department)
                .ToListAsync();

            return ticketcategories == null ? throw new ArgumentException("No ticket category found"): ticketcategories;
        }

        public async Task UpdateTicketCategory(TicketCategoryDto ticket)
        {
            var ticketCategory = await _context.TicketCategories.FindAsync(ticket.Id);
            if (ticketCategory == null)
                throw new ArgumentException("Ticket Category not found");

            ticketCategory.Name = ticket.Name;
            ticketCategory.DepartmentId = ticket.DepartmentId;
            ticketCategory.Description = ticket.Description;
            ticketCategory.IsDeleted = ticket.IsDisabled ?? false;

            await _context.SaveChangesAsync();
        }

        public async Task DisableTicketCategory(int id) 
        {
            //check whether category exists
            var category = await _context.TicketCategories.FirstOrDefaultAsync(x => x.Id == id);

            if (category == null)
                throw new ArgumentException("Ticket Category not found");

            category.IsDeleted = true;

            await _context.SaveChangesAsync();  
        }


    }
}
