using Core.Models.Billing;
using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterBillController : ControllerBase
    {
        private readonly IBilling _billing;

        public WaterBillController(IBilling billing)
        {
            _billing = billing;
        }

        [HttpPost("/AddBillingRequest")]
        public async Task<IActionResult> AddBillingRequest([FromBody] BillingRequest billingRequest)
        {
            try
            {
                await _billing.AddBillingRequest(billingRequest);
                return Ok("Billing Request added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
