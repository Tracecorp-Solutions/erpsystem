using Core.DTOs.Billing;
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

        [HttpPost("/BillCustomer")]
        public async Task<IActionResult> BillCustomer([FromBody] BillWaterCustomerDto customerBill)
        {
            try
            {
                await _billing.BillCustomer(customerBill);
                return Ok("Customer billed successfully");
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetCustomerBills/{customerRef}")]
        public async Task<IActionResult> GetCustomerBills(string customerRef)
        {
            try
            {
                var bills = await _billing.GetCustomerBillsByCustRef(customerRef);
                return Ok(bills);
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetCustomerBills")]
        public async Task<IActionResult> GetCustomerBills()
        {
            try
            {
                var bills = await _billing.GetCustomerBills();
                return Ok(bills);
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddBillAdjustmentRequest")]
        public async Task<IActionResult> AddBillAdjustmentRequest([FromForm] IFormFile file, [FromForm] BillAdjustmentRequestDto billAdjustmentRequest)
        {
            try
            {
                await _billing.AddBillAdjustmentRequest(file, billAdjustmentRequest);
                return Ok("Bill Adjustment Request added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetBillAdjustmentRequests")]
        public async Task<IActionResult> GetBillAdjustmentRequests()
        {
            try
            {
                var billAdjustments = await _billing.GetBillAdjustmentRequests();
                return Ok(billAdjustments);
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
