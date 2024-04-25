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
        public async Task<IActionResult> CreateGroupAccount([FromBody] GroupAccount groupAccount)
        {
            var addedAccount = await _repository.AddAsync(groupAccount);
            return CreatedAtAction(nameof(CreateGroupAccount), new { id = addedAccount.Id }, addedAccount);
        }

        [HttpGet("/GetAllGroupAccounts")]
        public async Task<IActionResult> GetAllGroupAccounts()
        {
            var groupaccounts = await _repository.GetAllGroupAccounts();
            return Ok(groupaccounts);
        }
    }

}
