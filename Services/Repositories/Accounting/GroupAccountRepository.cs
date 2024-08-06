using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using System.Reflection.Metadata.Ecma335;
using Core.Repositories.Accounting;
using Core.Models.Accounting;

namespace Services.Repositories.Accounting
{
    public class GroupAccountRepository : IGroupAccountRepository
    {
        private readonly ApplicationDbContext _context;

        public GroupAccountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GroupAccountView> AddAsync(GroupAccountView grpView)
        {
            if (!(grpView.Behaviour.Equals("Debit", StringComparison.Ordinal) ||
                grpView.Behaviour.Equals("Credit", StringComparison.Ordinal)))
                throw new ArgumentException("Please supply the behaviour of the account as Debit or Credit");

            // check whether group account already exists with the same name
            var groupaccountexists = await _context.GroupAccounts
                .FirstOrDefaultAsync(ga => ga.Name == grpView.Name);

            if (groupaccountexists != null)
                throw new ArgumentException("Group Account with this name already exists");

            var groupAccount = new GroupAccount
            {
                Name = grpView.Name,
                Behaviour = grpView.Behaviour,
                Description = grpView.Description,
                GroupCode = grpView.GroupCode
            };
            _context.GroupAccounts.Add(groupAccount);
            await _context.SaveChangesAsync();

            var viewMode = new GroupAccountView
            {
                Name = groupAccount.Name,
                Behaviour = groupAccount.Behaviour,
                Description = groupAccount.Description,
            };
            return viewMode;
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
                subGroupAccount.DateCreated = DateTime.Now;
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

        public async Task<GroupAccount> GetGroupById(int id)
        {
            var groupaccount = await _context.GroupAccounts.FirstOrDefaultAsync(a => a.Id == id);
            return groupaccount == null ? throw new ArgumentException("No group account with this id found") : groupaccount;
        }

        public async Task UpdateGroupAccount(GroupAccount groupAccount)
        {
            //fetch existing group account
            var existinggroupaccount = await _context.GroupAccounts
                .FirstOrDefaultAsync(ga => ga.Id == groupAccount.Id);
            if (existinggroupaccount == null)
                throw new ArgumentException("No Group Account found with that id");

            _context.Entry(existinggroupaccount).CurrentValues.SetValues(groupAccount);
            await _context.SaveChangesAsync();
        }

        public async Task<SubGroupAccount> GetSubGroupById(int id)
        {
            //get subgroup with the corresponding group account details
            var subgroup = await _context.SubGroupAccounts
                .Include(sg => sg.GroupAccount)
                .FirstOrDefaultAsync(sg => sg.Id == id);

            return subgroup == null ? throw new ArgumentException("No Sub group account with that id found") : subgroup;
        }

        public async Task UpdateSubGroupAccount(SubGroupAccount subGroupAccount)
        {
            //get existing subgroup account
            var existingSubGroup = await _context.SubGroupAccounts
                .FirstOrDefaultAsync(sg => sg.Id == subGroupAccount.Id);
            if (existingSubGroup == null)
                throw new ArgumentException("No sub group account found with that id");

            _context.Entry(existingSubGroup).CurrentValues.SetValues(subGroupAccount);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<SubGroupAccount>> GetSubGroupByGroupId(int groupId)
        {
            var subgroups = await _context.SubGroupAccounts
                                   .Where(sg => sg.GroupId == groupId)
                                   .ToListAsync();

            if (subgroups.Count == 0)
                throw new ArgumentException("No Subgroup found in that group");

            return subgroups;
        }
    }

}
