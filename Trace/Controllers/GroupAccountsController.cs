using Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Models;

namespace Trace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupAccountsController : ControllerBase
    {
        private readonly IGroupAccountRepository _repository;

        public GroupAccountsController(IGroupAccountRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("/CreateGroupAccount")]
        public async Task<IActionResult> CreateGroupAccount([FromBody] GroupAccountView groupAccount)
        {
            try
            {
                var addedAccount = await _repository.AddAsync(groupAccount);
                return CreatedAtAction(nameof(CreateGroupAccount), new { addedAccount });
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        [HttpGet("/GetAllGroupAccounts")]
        public async Task<IActionResult> GetAllGroupAccounts()
        {
            try
            {
                var groupaccounts = await _repository.GetAllGroupAccounts();
                if (groupaccounts.Any())
                    return Ok(groupaccounts);
                return NotFound("No Group Accounts Found");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occured while processing");
            }
        }

        [HttpPost("/CreateSubGroupAccount")]
        public async Task<IActionResult> CreateSubGroupAccount([FromBody] SubGroupAccount subGroupAccount) 
        {
            try
            {
                var addedaccount = await _repository.AddSubGroupAccount(subGroupAccount);
                return CreatedAtAction(nameof(CreateSubGroupAccount), new { id = addedaccount.Id }, addedaccount);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occured while processing");
            }
        }

        [HttpGet("/GetAllSubGroupAccounts")]
        public async Task<IActionResult> GetAllSubGroupAccounts() 
        {
            try
            {
                var subgroupaccounts = await _repository.GetAllSubGroupAccounts();
                if (subgroupaccounts.Any())
                    return Ok(subgroupaccounts);
                return NotFound("No subgroup accounts found");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occured while processing");
            }
        }
    }

}
