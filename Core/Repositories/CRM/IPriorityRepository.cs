using Core.DTOs.CRM;
using Core.Models.CRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.CRM
{
    public interface IPriorityRepository
    {
        Task<IEnumerable<Priority>> GetPriorities();
        Task<Priority> GetPriority(int id);
        Task AddPriority(PriorityDto priority);
        Task DeletePriority(int id);
    }
}
