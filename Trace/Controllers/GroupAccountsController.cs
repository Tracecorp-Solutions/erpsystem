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

        public GroupAccountsController(IGroupAccountRepository repository, Infrastructure.Repositories.GroupAccountRepository @object)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GroupAccount groupAccount)
        {
            var addedAccount = await _repository.AddAsync(groupAccount);
            return CreatedAtAction(nameof(Post), new { id = addedAccount.Id }, addedAccount);
        }
    }

}
