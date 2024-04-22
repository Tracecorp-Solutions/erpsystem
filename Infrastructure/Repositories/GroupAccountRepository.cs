using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Infrastructure.Repositories
{
    public class GroupAccountRepository : IGroupAccountRepository
    {
        private readonly ApplicationDbContext _context;

        public GroupAccountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GroupAccount> AddAsync(GroupAccount groupAccount)
        {
            _context.GroupAccounts.Add(groupAccount);
            await _context.SaveChangesAsync();
            return groupAccount;
        }
    }

}
