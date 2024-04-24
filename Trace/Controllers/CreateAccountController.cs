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

        [HttpPost("/accounts")]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            try
            {
                var createdAccount = await _accountrepository.CreateAccountAsync( account);
                return CreatedAtAction(nameof(CreateAccount), new { account.GroupId, accountId = createdAccount.Id }, createdAccount);
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
