using Infrastructure.Data;
using Core.Models.CRM;
using Core.Repositories.CRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs.CRM;

namespace Services.Repositories.CRM
{
    public class PriorityRepository : IPriorityRepository
    {
        private readonly ApplicationDbContext _context;

        public PriorityRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddPriority(PriorityDto dto)
        {
            //map dto to model
            var priority = new Priority
            {
                PriorityName = dto.PriorityName,
                ColorCode = dto.ColorCode,
                PriorityDescription = dto.PriorityDescription
            };

            _context.Priorities.Add(priority);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePriority(int id)
        {
            var priority = await GetPriority(id);

            if (priority == null)
                throw new ArgumentException("Priority not found");

            _context.Priorities.Remove(priority);
            await _context.SaveChangesAsync();
        }

        public async Task<Priority> GetPriority(int id)
        {
            return await _context.Priorities.FindAsync(id);
        }

        public async Task<IEnumerable<Priority>> GetPriorities()
        {
            return _context.Priorities;
        }
    }
}
