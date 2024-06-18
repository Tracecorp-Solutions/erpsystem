using Core.Models;
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
    }
}
