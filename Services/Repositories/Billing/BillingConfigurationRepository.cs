using Core.Models;
using Core.Repositories.Billing;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories.Billing
{
    public class BillingConfigurationRepository : IBillingConfigurationRepository
    {
        private readonly ApplicationDbContext _context;

        public BillingConfigurationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddState(State state)
        {
            _context.States.Add(state);
            await _context.SaveChangesAsync();
        }
        public async Task AddOperationArea(OperationArea operationArea)
        {
            _context.OperationAreas.Add(operationArea);
            await _context.SaveChangesAsync();
        }
        public async Task AddBranch(Branch branch)
        {
            _context.Branches.Add(branch);
            await _context.SaveChangesAsync();
        }
        public async Task AddTerritory(Territory territory)
        {
            _context.Territories.Add(territory);
            await _context.SaveChangesAsync();
        }
        public async Task AddSubTerritory(SubTerritory subTerritory)
        {
            _context.SubTerritories.Add(subTerritory);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<State>> GetStates()
        {
            var states = await _context.States.ToListAsync();
            return states.Any() ? states: throw new ArgumentException("No States Found");
        }
        public async Task<IEnumerable<Branch>> GetBranches()
        {
            var branches = await _context.Branches
                .Include(b => b.OperationArea)
                .ToListAsync();
            return branches.Any() ? branches : throw new ArgumentException("No Branches Found");
        }
        public async Task<IEnumerable<OperationArea>> GetOperationAreas()
        {
            var operationareas = await _context.OperationAreas
                .Include(a => a.State)
                .ToListAsync();
            return operationareas.Any() ? operationareas : throw new ArgumentException("No Operations Areas Found");
        }
        public async Task<IEnumerable<Territory>> GetTerritories()
        {
            var territories = await _context.Territories
                .Include(t => t.Branch)
                .ToListAsync();
            return territories.Any() ? territories : throw new ArgumentException("No Territories Found");
        }
        public async Task<IEnumerable<SubTerritory>> GetSubTerritories()
        {
            var subterritories = await _context.SubTerritories.ToListAsync();
            return subterritories.Any() ? subterritories : throw new ArgumentException("No Sub Territories Found");
        }

        public async Task AddCustomerCategory(CustomerCategory customerCategory)
        {
             _context.CustomerCategories.Add(customerCategory);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<CustomerCategory>> GetCustomerCategories() 
        {
            var custcategories = await _context.CustomerCategories.ToListAsync();

            return custcategories == null ? throw new ArgumentException("No Customer Categories Found") : custcategories;
        }
    }
}
