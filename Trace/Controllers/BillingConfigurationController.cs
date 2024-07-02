using Core.DTOs.Billing;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingConfigurationController : ControllerBase
    {
        private readonly IBillingConfigurationRepository _billingConfigurationRepository;

        public BillingConfigurationController(IBillingConfigurationRepository billingConfigurationRepository) 
        {
            _billingConfigurationRepository = billingConfigurationRepository;
        }

        [HttpPost("/AddState")]
        public async Task<IActionResult> AddState([FromBody] State state) 
        {
            try
            {
                await _billingConfigurationRepository.AddState(state);
                return Ok("State Added Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetStates")]
        public async Task<IActionResult> GetStates() 
        {
            try
            {
                var states = await _billingConfigurationRepository.GetStates();
                return Ok(states);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddOperationArea")]
        public async Task<IActionResult> AddOperationArea([FromBody] OperationArea operationArea) 
        {
            try
            {
                await _billingConfigurationRepository.AddOperationArea(operationArea);
                return Ok("Operation Area added successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetOperationAreas")]
        public async Task<IActionResult> GetOperationAreas() 
        {
            try
            {
                var opareas = await _billingConfigurationRepository.GetOperationAreas();
                return Ok(opareas);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddBranch")]
        public async Task<IActionResult> AddBranch([FromBody] Branch branch) 
        {
            try
            {
                await _billingConfigurationRepository.AddBranch(branch);
                return Ok("Branch Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetBranches")]
        public async Task<IActionResult> GetBranches() 
        {
            try
            {
                var branches = await _billingConfigurationRepository.GetBranches();
                return Ok(branches);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddTerritory")]
        public async Task<IActionResult> AddTerritory([FromBody] Territory territory)
        {
            try
            {
                await _billingConfigurationRepository.AddTerritory(territory);
                return Ok("Territory Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [HttpGet("/GetTerritories")]
        public async Task<IActionResult> GetTerritories() 
        {
            try
            {
                var territories = await _billingConfigurationRepository.GetTerritories();
                return Ok(territories);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddSubTerritory")]
        public async Task<IActionResult> AddSubTerritory([FromBody] SubTerritory subTerritory) 
        {
            try
            {
                await _billingConfigurationRepository.AddSubTerritory(subTerritory);
                return Ok("SubTerritory Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetSubTerritories")]
        public async Task<IActionResult> GetSubTerritories() 
        {
            try
            {
                var subterritories = await _billingConfigurationRepository.GetSubTerritories();
                return Ok(subterritories);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddCustomerCategory")]
        public async Task<IActionResult> AddCustomerCategory([FromBody] CustomerCategory customerCategory) 
        {
            try
            {
                await _billingConfigurationRepository.AddCustomerCategory(customerCategory);
                return Ok("Customer Category Added Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetCustomerCategories")]
        public async Task<IActionResult> GetCustomerCategories() 
        {
            try
            {
                var custcategories = await _billingConfigurationRepository.GetCustomerCategories();
                return Ok(custcategories);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddCustomerType")]
        public async Task<IActionResult> AddCustomerType([FromBody] CustomerType customerType)
        {
            try
            {
                await _billingConfigurationRepository.AddCustomerType(customerType);
                return Ok("Customer Type Added Successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");

            }
        }

        [HttpGet("/GetCustomerTypes")]
        public async Task<IActionResult> GetCustomerTypes() 
        {
            try
            {
                var custtypes = await _billingConfigurationRepository.GetCustomerTypes();
                return Ok(custtypes);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPut("/EditCustomerCategory")]
        public async Task<IActionResult> EditCustomerCategory([FromBody] CustomerCategory customerCategory) 
        {
            try
            {
                await _billingConfigurationRepository.EditCustomerCategory(customerCategory);
                return Ok("Customer Category Updated Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPut("/EditCustomerType")]
        public async Task<IActionResult> EditCustomerType([FromBody] CustomerType customerType) 
        {
            try
            {
                await _billingConfigurationRepository.EditCustomerType(customerType);
                return Ok("Customer Type Updated Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("/DeleteCustomerType")]
        public async Task<IActionResult> DeleteCustomerType([FromBody] CustomerType customerType) 
        {
            try
            {
                await _billingConfigurationRepository.DeleteCustomerType(customerType);
                return Ok("Customer Type Deleted Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("/DeleteCustomerCategory")]
        public async Task<IActionResult> DeleteCustomerCategory([FromBody] CustomerCategory customerCategory) 
        {
            try
            {
                await _billingConfigurationRepository.DeleteCustomerCategory(customerCategory);
                return Ok("Customer Category Deleted Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddBillDeliveryMethod")]
        public async Task<IActionResult> AddBillDeliveryMethod([FromBody] BillDeliveryMethod billDeliveryMethod) 
        {
            try
            {
                await _billingConfigurationRepository.AddBillDeliveryMethod(billDeliveryMethod);
                return Ok("Bill Delivery Method Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetBillDeliveryMethods")]
        public async Task<IActionResult> GetBillDeliveryMethods() 
        {
            try
            {
                var billdeliverymethods = await _billingConfigurationRepository.GetBillDeliveryMethods();
                return Ok(billdeliverymethods);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPut("/EditBillDeliveryMethod")]
        public async Task<IActionResult> EditBillDeliveryMethod([FromBody] BillDeliveryMethod billDeliveryMethod) 
        {
            try
            {
                await _billingConfigurationRepository.EditBillDeliveryMethod(billDeliveryMethod);
                return Ok("Bill Delivery Method Updated Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("/DeleteBillDeliveryMethod")]
        public async Task<IActionResult> DeleteBillDeliveryMethod([FromBody] BillDeliveryMethod billDeliveryMethod) 
        {
            try
            {
                await _billingConfigurationRepository.DeleteBillDeliveryMethod(billDeliveryMethod);
                return Ok("Bill Delivery Method Deleted Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddMaterial")]
        public async Task<IActionResult> AddMaterial([FromBody] Material material) 
        {
            try
            {
                await _billingConfigurationRepository.AddMaterial(material);
                return Ok("Material Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetMaterials")]
        public async Task<IActionResult> GetMaterials() 
        {
            try
            {
                var materials = await _billingConfigurationRepository.GetMaterials();
                return Ok(materials);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPut("/EditMaterial")]
        public async Task<IActionResult> EditMaterial([FromBody] Material material) 
        {
            try
            {
                await _billingConfigurationRepository.EditMaterial(material);
                return Ok("Material Updated Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("/DeleteMaterial")]
        public async Task<IActionResult> DeleteMaterial([FromBody] Material material) 
        {
            try
            {
                await _billingConfigurationRepository.DeleteMaterial(material);
                return Ok("Material Deleted Successfully");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddCustomerTarrif")]
        public async Task<IActionResult> AddCustomerTarrif([FromBody] CustomerTarrifDto dto) 
        {
            try
            {
                await _billingConfigurationRepository.AddCustomerTarrif(dto);
                return Ok("Customer Tarrif Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetCustomerTarrifs")]
        public async Task<IActionResult> GetCustomerTarrifs()
        {
            try
            {
                var tarrifs = await _billingConfigurationRepository.GetCustomerTarrifs();
                return Ok(tarrifs);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddMeterType")]
        public async Task<IActionResult> AddMeterType([FromBody] MeterTypes meterType) 
        {
            try
            {
                await _billingConfigurationRepository.AddMeterType(meterType);
                return Ok("Meter Type Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetMeterTypes")]
        public async Task<IActionResult> GetMeterTypes()
        {
            try
            {
                var metertypes = await _billingConfigurationRepository.GetMeterTypes();
                return Ok(metertypes);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddMeterSize")]
        public async Task<IActionResult> AddMeterSize([FromBody] MeterSize meterSize) 
        {
            try
            {
                await _billingConfigurationRepository.AddMeterSize(meterSize);
                return Ok("Meter Size Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetMeterSizes")]
        public async Task<IActionResult> GetMeterSizes()
        {
            try
            {
                var metersizes = await _billingConfigurationRepository.GetMeterSizes();
                return Ok(metersizes);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddMeterMake")]
        public async Task<IActionResult> AddMeterMake([FromBody] MeterMake meterMake) 
        {
            try
            {
                await _billingConfigurationRepository.AddMeterMake(meterMake);
                return Ok("Meter Make Added Successfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetMeterMakes")]
        public async Task<IActionResult> GetMeterMakes()
        {
            try
            {
                var metermakes = await _billingConfigurationRepository.GetMeterMakes();
                return Ok(metermakes);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


    }
}
