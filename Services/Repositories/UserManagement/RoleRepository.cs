using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Repositories.UserManagement;
using Core.Models.UserManagement;

namespace Services.Repositories.UserManagement
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ApplicationDbContext _context;

        public RoleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await Task.FromResult(_context.Roles);
        }

        public async Task AddRole(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
        }

    }
}
