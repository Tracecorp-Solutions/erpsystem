using Core.DTOs.Billing;
using Core.Models.Billing;
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

        Task EditCustomerCategory(CustomerCategory customerCategory);

        Task EditCustomerType(CustomerType customerType);
        Task DeleteCustomerType(CustomerType customerType);
        Task DeleteCustomerCategory(CustomerCategory customerCategory);

        Task AddCustomerType(CustomerType customerType);
        Task<IEnumerable<CustomerType>> GetCustomerTypes();

        Task AddBillDeliveryMethod(BillDeliveryMethod billDeliveryMethod);
        Task<IEnumerable<BillDeliveryMethod>> GetBillDeliveryMethods();
        Task EditBillDeliveryMethod(BillDeliveryMethod billDeliveryMethod);
        Task DeleteBillDeliveryMethod(BillDeliveryMethod billDeliveryMethod);

        Task AddMaterial(Material material);
        Task<IEnumerable<Material>> GetMaterials();
        Task EditMaterial(Material material);
        Task DeleteMaterial(Material material);
        Task AddCustomerTarrif(CustomerTarrifDto dto);  
        Task<IEnumerable<CustomerTarrif>> GetCustomerTarrifs();

        
        
    }
}
