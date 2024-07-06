using Core.DTOs.Billing;
using Core.Models.Billing;
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

        public async Task AddCustomerType(CustomerType customerType)
        {
            _context.CustomerTypes.Add(customerType);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CustomerType>> GetCustomerTypes()
        {
            var custtypes = await _context.CustomerTypes.ToListAsync();

            return custtypes == null ? throw new ArgumentException("No Customer Types Found") : custtypes;
        }

        public async Task EditCustomerCategory(CustomerCategory customerCategory)
        {
            // check whether the customer category exists
            var custcategory = await _context.CustomerCategories.FindAsync(customerCategory.Id);
            if (custcategory == null)
                throw new ArgumentException("Customer Category Not Found");

            _context.CustomerCategories.Update(customerCategory);
            await _context.SaveChangesAsync();
        }

        public async Task EditCustomerType(CustomerType customerType)
        {
            //check whether the customer type exists
            var custtype = await _context.CustomerTypes.FindAsync(customerType.Id);
            if (custtype == null)
                throw new ArgumentException("Customer Type Not Found");
            _context.CustomerTypes.Update(customerType);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCustomerType(CustomerType customerType)
        {
            //check whether the customer type exists
            var custtype = await _context.CustomerTypes.FindAsync(customerType.Id);
            if (custtype == null)
                throw new ArgumentException("Customer Type Not Found");
            _context.CustomerTypes.Remove(customerType);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCustomerCategory(CustomerCategory customerCategory)
        {
            //check whether the customer category exists
            var custcategory = await _context.CustomerCategories.FindAsync(customerCategory.Id);
            if (custcategory == null)
                throw new ArgumentException("Customer Category Not Found");
            _context.CustomerCategories.Remove(customerCategory);
            await _context.SaveChangesAsync();
        }

        public async Task AddBillDeliveryMethod(BillDeliveryMethod billDeliveryMethod)
        {
            _context.BillDeliveryMethods.Add(billDeliveryMethod);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BillDeliveryMethod>> GetBillDeliveryMethods()
        {
            var billdeliverymethods = await _context.BillDeliveryMethods.ToListAsync();

            return billdeliverymethods == null ? throw new ArgumentException("No Bill Delivery Methods Found") : billdeliverymethods;
        }

        public async Task EditBillDeliveryMethod(BillDeliveryMethod billDeliveryMethod)
        {
            //check whether the bill delivery method exists
            var billdeliverymethod = await _context.BillDeliveryMethods.FindAsync(billDeliveryMethod.Id);
            if (billdeliverymethod == null)
                throw new ArgumentException("Bill Delivery Method Not Found");
            _context.BillDeliveryMethods.Update(billDeliveryMethod);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBillDeliveryMethod(BillDeliveryMethod billDeliveryMethod)
        {
            //check whether the bill delivery method exists
            var billdeliverymethod = await _context.BillDeliveryMethods.FindAsync(billDeliveryMethod.Id);
            if (billdeliverymethod == null)
                throw new ArgumentException("Bill Delivery Method Not Found");
            _context.BillDeliveryMethods.Remove(billDeliveryMethod);
            await _context.SaveChangesAsync();
        }

        public async Task AddMaterial(Material material)
        {
            _context.Materials.Add(material);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Material>> GetMaterials()
        {
            var materials = await _context.Materials.ToListAsync();

            return materials == null ? throw new ArgumentException("No Materials Found") : materials;
        }

        public async Task EditMaterial(Material material)
        {
            //check whether the material exists
            var mat = await _context.Materials.FindAsync(material.MaterialId);
            if (mat == null)
                throw new ArgumentException("Material Not Found");
            _context.Materials.Update(material);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteMaterial(Material material)
        {
            //check whether the material exists
            var mat = await _context.Materials.FindAsync(material.MaterialId);
            if (mat == null)
                throw new ArgumentException("Material Not Found");
            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();
        }

        public async Task AddCustomerTarrif(CustomerTarrifDto dto)
        {
            var tarrif = new CustomerTarrif
            {
                TarrifName = dto.TarrifName,
                TarrifDescription = dto.TarrifDescription,
                TarrifAmount = dto.TarrifAmount,
                CreatedAt = DateTime.Now
            };

            _context.CustomerTarrifs.Add(tarrif);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CustomerTarrif>> GetCustomerTarrifs()
        {
            var tarrifs = await _context.CustomerTarrifs.ToListAsync();

            return tarrifs == null ? throw new ArgumentException("No Customer Tarrifs Found") : tarrifs;
        }

        public async Task AddMeterType(MeterTypes meterType)
        {
            _context.MeterTypes.Add(meterType);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MeterTypes>> GetMeterTypes()
        {
            var metertypes = await _context.MeterTypes.ToListAsync();

            return metertypes == null ? throw new ArgumentException("No Meter Types Found") : metertypes;
        }

        public async Task AddMeterSize(MeterSize meterSize)
        {
            _context.MeterSizes.Add(meterSize);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MeterSize>> GetMeterSizes()
        {
            var metersizes = await _context.MeterSizes.ToListAsync();

            return metersizes == null ? throw new ArgumentException("No Meter Sizes Found") : metersizes;
        }

        public async Task AddMeterMake(MeterMake meterMake)
        {
            _context.MeterMakes.Add(meterMake);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MeterMake>> GetMeterMakes()
        {
            var metermakes = await _context.MeterMakes.ToListAsync();

            return metermakes == null ? throw new ArgumentException("No Meter Makes Found") : metermakes;
        }

        public async Task AddBlocks(BlockDto block)
        {
            var blk = new Block
            {
                BlockName = block.BlockName,
                BlockCode = block.BlockCode,
                BranchId = block.BranchId,
                TerritoryId = block.TerritoryId,
                SubTerritoryId = block.SubTerritoryId,
                OperationAreaId = block.OperationAreaId
            };

            _context.Blocks.Add(blk);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Block>> GetBlocks()
        {
            var blocks = await _context.Blocks.ToListAsync();

            return blocks == null ? throw new ArgumentException("No Blocks Found") : blocks;
        }

        public async Task EditBlock(BlockDto block)
        {
            var blk = await _context.Blocks.FindAsync(block.BlockName);
            if (blk == null)
                throw new ArgumentException("Block Not Found");

            blk.BlockName = block.BlockName;
            blk.BlockCode = block.BlockCode;
            blk.BranchId = block.BranchId;
            blk.TerritoryId = block.TerritoryId;
            blk.SubTerritoryId = block.SubTerritoryId;
            blk.OperationAreaId = block.OperationAreaId;

            _context.Blocks.Update(blk);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBlock(BlockDto block)
        {
            var blk = await _context.Blocks.FindAsync(block.BlockName);
            if (blk == null)
                throw new ArgumentException("Block Not Found");

            _context.Blocks.Remove(blk);
            await _context.SaveChangesAsync();
        }

        public async Task AddTransactionCode(TransactionCodeDto dto)
        {
            var transcode = new TransactionCodes
            {
                TransactionCode = dto.TransactionCode,
                Description = dto.Description
            };

            _context.TransactionCodes.Add(transcode);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TransactionCodes>> GetTransactionCodes() 
        {
            var transcodes = await _context.TransactionCodes.ToListAsync();

            return transcodes == null ? throw new ArgumentException("No Transaction Codes Found") : transcodes;
        }

        public async Task EditTransactionCode(TransactionCodeDto dto)
        {
            var transcode = await _context.TransactionCodes.FindAsync(dto.TransactionCode);
            if (transcode == null)
                throw new ArgumentException("Transaction Code Not Found");

            transcode.TransactionCode = dto.TransactionCode;
            transcode.Description = dto.Description;
            await _context.SaveChangesAsync();
        }

        
    }
}
