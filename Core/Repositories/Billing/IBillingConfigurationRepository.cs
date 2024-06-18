using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Billing
{
    public interface IBillingConfigurationRepository
    {
        Task AddState(State state);
        Task AddOperationArea(OperationArea operationArea);
        Task AddBranch(Branch branch);
        Task AddTerritory(Territory territory);
        Task AddSubTerritory(SubTerritory subTerritory);

        Task<IEnumerable<State>> GetStates();
        Task<IEnumerable<Branch>> GetBranches();
        Task<IEnumerable<OperationArea>> GetOperationAreas();
        Task<IEnumerable<Territory>> GetTerritories();
        Task<IEnumerable<SubTerritory>> GetSubTerritories();

        Task AddCustomerCategory(CustomerCategory customerCategory);
        Task<IEnumerable<CustomerCategory>> GetCustomerCategories();
    }
}
