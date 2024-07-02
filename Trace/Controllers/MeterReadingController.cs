using Core.DTOs.Billing;
using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeterReadingController : ControllerBase
    {
        private readonly IMeterReadingRepository _meterReadingRepository;

        public MeterReadingController(IMeterReadingRepository meterReadingRepository)
        {
            _meterReadingRepository = meterReadingRepository;
        }

        [HttpPost("/AddMeterReading")]
        public async Task<IActionResult> AddMeterReading(MeterReadingDto meterReadingDto)
        {
            try
            {
                await _meterReadingRepository.AddMeterReading(meterReadingDto);
                return Ok("Meter Reading added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetAllMeterReadings")]
        public async Task<IActionResult> GetAllMeterReadings()
        {
            try
            {
                var meterReadings = await _meterReadingRepository.GetMeterReadings();
                if (meterReadings.Any())
                    return Ok(meterReadings);

                return NotFound("No Meter Readings found");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occured while processing");
            }
        }

        [HttpGet("/GetMeterReadingById/{id}")]
        public async Task<IActionResult> GetMeterReadingById(int id)
        {
            try
            {
                var meterReading = await _meterReadingRepository.GetMeterReading(id);
                return Ok(meterReading);
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

        [HttpPut("/UpdateMeterReading")]
        public async Task<IActionResult> UpdateMeterReading(MeterReadingDto meterReadingDto)
        {
            try
            {
                await _meterReadingRepository.UpdateMeterReading(meterReadingDto);
                return Ok("Meter Reading updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("/DeleteMeterReading/{id}")]
        public async Task<IActionResult> DeleteMeterReading(int id)
        {
            try
            {
                await _meterReadingRepository.DeleteMeterReading(id);
                return Ok("Meter Reading deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
