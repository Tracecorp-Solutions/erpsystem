using Core.Models;
using Core.Repositories;
using Microsoft.AspNetCore.Http;
using Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Models;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreateAccountController : ControllerBase
    {
        private readonly IAccountRepository _accountrepository;

        public CreateAccountController(IAccountRepository accountRepository) 
        {
            _accountrepository = accountRepository;
        }

        [HttpPost("{groupId}/accounts")]
        public async Task<IActionResult> CreateAccount(int groupId, [FromBody] Account account)
        {
            try
            {
                var createdAccount = await _accountrepository.CreateAccountAsync(groupId, account);
                return CreatedAtAction(nameof(CreateAccount), new { groupId, accountId = createdAccount.Id }, createdAccount);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
