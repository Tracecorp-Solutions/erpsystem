using Core.Models;
using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewConnectionController : ControllerBase
    {
        private readonly INewConnectionRepository _newconnectionRepository;

        public NewConnectionController(INewConnectionRepository newconnectionRepository) 
        {
            _newconnectionRepository = newconnectionRepository;
        }

        [HttpPost("/NewApplication")]
        public IActionResult NewApplication([FromBody] Application application) 
        {
            try
            {
                _newconnectionRepository.RegisterNewCustomer(application);
                return Ok("ApplicationRegisteredSuccessfully");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
