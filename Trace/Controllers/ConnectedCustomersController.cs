using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectedCustomersController : ControllerBase
    {
        private readonly IConnectedCustomersRepository _connectedCustomersRepository;

        public ConnectedCustomersController(IConnectedCustomersRepository connectedCustomersRepository)
        {
            _connectedCustomersRepository = connectedCustomersRepository;
        }

        [HttpGet("/GetConnectedCustomers")]
        public async Task<IActionResult> GetConnectedCustomers()
        {
            try
            {
                var connectedCustomers = await _connectedCustomersRepository.GetConnectedCustomers();
                return Ok(connectedCustomers);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing your request. {ex.Message} Inner Exception {ex.InnerException}");
            }
        }
    }
}
