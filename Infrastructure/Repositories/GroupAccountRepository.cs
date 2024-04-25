using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<SubGroupAccount> AddSubGroupAccount(SubGroupAccount subGroupAccount) 
        {
            _context.SubGroupAccounts.Add(subGroupAccount);
            await _context.SaveChangesAsync();
            return subGroupAccount;
        }

        public async Task<IEnumerable<GroupAccount>> GetAllGroupAccounts()
        {
            IEnumerable<GroupAccount> groupAccounts = await _context.GroupAccounts.ToListAsync();
            return groupAccounts;
        }

        public async Task<IEnumerable<SubGroupAccount>> GetAllSubGroupAccounts() 
        {
            IEnumerable<SubGroupAccount> subGroupAccounts = await _context.SubGroupAccounts
                .Include(e => e.GroupAccount)
                .ToListAsync();

            return subGroupAccounts;
        }
    }

}
