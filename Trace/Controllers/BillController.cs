using Core.Models;
using Core.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IBillRepository _billrepository;

        public BillController(IBillRepository billRepository)
        {
            _billrepository = billRepository;
        }

        [HttpPost("/CreateBill")]
        public async Task<IActionResult> CreateBill([FromBody] Bill bill)
        {
            try
            {
                var createdAccount = await _billrepository.CreateBillAsync(bill);
                return CreatedAtAction(nameof(CreateBill), new { createdAccount.Id, createdAccount });
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

        [HttpGet("/GetAllBills")]
        public async Task<IActionResult> GetAllSubGroupAccounts()
        {
            try
            {
                var bills = await _billrepository.GetBills();
                if (bills.Any())
                    return Ok(bills);

                return NotFound("No Bills found");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occured while processing");
            }
        }
    }
}
