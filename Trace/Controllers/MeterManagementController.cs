using Core.DTOs.Billing;
using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeterManagementController : ControllerBase
    {
        private readonly IMeterManagementRepository _meterManagementRepository;

        public MeterManagementController(IMeterManagementRepository meterManagementRepository)
        {
            _meterManagementRepository = meterManagementRepository;
        }

        [HttpPost("/AddMeterServicing")]
        public async Task<IActionResult> AddMeterServicing(MeterServicingDto meterServicing)
        {
            try
            {
                await _meterManagementRepository.AddMeterServicing(meterServicing);
                return Ok("Meter has been serviced/ replaced successfully");
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                string rror = ex.InnerException.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetMeterServicing")]
        public async Task<IActionResult> GetMeterServicing()
        {
            try
            {
                var meterServicing = await _meterManagementRepository.GetMeterServicing();
                return Ok(meterServicing);
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

        [HttpGet("/GetMeterServicingByCustomerRef")]
        public async Task<IActionResult> GetMeterServicingByCustomerRef(string customerRef)
        {
            try
            {
                var meterServicing = await _meterManagementRepository.GetMeterServicingByCustomerRef(customerRef);
                return Ok(meterServicing);
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





    }
}
