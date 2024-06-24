using Core.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.UserManagement
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetRolesAsync();

        Task AddRole(Role role);
    }
}
