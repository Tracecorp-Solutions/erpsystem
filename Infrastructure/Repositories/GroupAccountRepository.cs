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
            var groupaccountexists = await _context.GroupAccounts.FindAsync(subGroupAccount.GroupId);
            if (groupaccountexists == null)
            {
                throw new ArgumentException("Invalid group account id.");
            }
            else 
            {
                // Inspect the state of the DbContext
                var entries = _context.ChangeTracker.Entries();
                foreach (var entry in entries)
                {
                    if (entry.Entity is SubGroupAccount)
                    {
                        Console.WriteLine($"Entity Type: {entry.Entity.GetType().Name}, State: {entry.State}");
                    }
                }
                _context.SubGroupAccounts.Add(subGroupAccount);
                await _context.SaveChangesAsync();
                return subGroupAccount;
            }
            
        }

        public async Task<IEnumerable<GroupAccount>> GetAllGroupAccounts()
        {
            IEnumerable<GroupAccount> groupAccounts = await _context.GroupAccounts.ToListAsync();
            return groupAccounts;
        }

        public async Task<IEnumerable<GroupSubGroupViewModel>> GetAllSubGroupAccounts()
        {
            var subGroupAccounts = await _context.SubGroupAccounts
                .Join(
                    _context.GroupAccounts,
                    subGroup => subGroup.GroupId,  // Foreign key from SubGroupAccounts
                    group => group.Id,             // Primary key of GroupAccounts
                    (subGroup, group) => new GroupSubGroupViewModel // Project directly into the view model
                    {
                        SubGroupAccount = subGroup, // Assuming SubGroupAccount in the view model is of type SubGroupAccount
                        GroupAccount = group        // Assuming GroupAccount in the view model is of type GroupAccount
                    })
                .ToListAsync();

            return subGroupAccounts;
        }

        
    }

}
