using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Models;
using Core.Repositories.Accounting;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountrepository;

        public AccountController(IAccountRepository accountRepository) 
        {
            _accountrepository = accountRepository;
        }

        [HttpPost("/accounts")]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            try
            {
                var createdAccount = await _accountrepository.CreateAccountAsync( account);
                return CreatedAtAction(nameof(CreateAccount), new { account.SubGroupAccountId, accountId = createdAccount.Id }, createdAccount);
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

        [HttpGet("/GetAccounts")]
        public async Task<IActionResult> GetAllAccounts() 
        {
            try
            {
                var accounts = await _accountrepository.GetAccounts();
                return Ok(accounts);
            }
            catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);  
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetAccountById")]
        public async Task<IActionResult> GetAccountById(int id) 
        {
            try
            {
                var account = await _accountrepository.GetAccountById(id);
                return Ok(account);
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

        [HttpPost("/UpdateAccountDetails")]
        public async Task<IActionResult> UpdateAccountDetails([FromBody] Account account) 
        {
            try
            {
                var message = await _accountrepository.UpdateAccount(account);
                return Ok(message);
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

        [HttpGet("/GetAccountsBySubGroupId")]
        public async Task<IActionResult> GetAccountsBySubGroupId(int subgroupid) 
        {
            try
            {
                var accounts = await _accountrepository.GetAccountsBySubGroupId(subgroupid);


                return Ok(accounts);

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
