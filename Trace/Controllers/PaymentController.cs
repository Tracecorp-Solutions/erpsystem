using Core.DTOs.Billing;
using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ICustomerPayments _customerPayments;

        public PaymentController(ICustomerPayments customerPayments)
        {
            _customerPayments = customerPayments;
        }

        [HttpPost("/AddPayment")]
        public async Task<IActionResult> AddPayment([FromBody] PaymentDto payment)
        {
            try
            {
                await _customerPayments.AddPayments(payment);
                return Ok();
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/ValidateCustomer/{customerRef}")]
        public async Task<IActionResult> ValidateCustomer(string customerRef)
        {
            try
            {
                var customer = await _customerPayments.ValidateCustomerDetails(customerRef);
                return Ok(customer);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/GetAllPayments")]
        public async Task<IActionResult> GetAllPayments()
        {
            try
            {
                var payments = await _customerPayments.GetAllPayments();
                return Ok(payments);
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
