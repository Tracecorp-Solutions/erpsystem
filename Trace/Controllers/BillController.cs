using Core.Models.Accounting;
using Core.Repositories.Accounting;
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
                return Ok($"{bill.Type} created successfully");
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

        [HttpGet("/GetBillById/{id}")]
        public async Task<IActionResult> GetBillById(int id)
        {
            try
            {
                var bill = await _billrepository.GetBillById(id);
                return Ok(bill);
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

        [HttpPut("/UpdateBill")]
        public async Task<IActionResult> UpdateBill([FromBody] Bill bill)
        {
            try
            {
                await _billrepository.UpdateBill(bill);
                return Ok($"{bill.Type} updated successfully.");
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

        [HttpGet("/PayBill/{id}")]
        public async Task<IActionResult> PayBill(int id) 
        {
            try
            {
                string billtype = await _billrepository.PayBill(id);
                return Ok($"{billtype} paid successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occured while processing Error : {ex.Message} Inner Exception : {ex.InnerException}");
            }
        }
    }
}
