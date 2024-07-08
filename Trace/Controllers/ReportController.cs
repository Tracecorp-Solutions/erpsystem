using Core.Repositories.Accounting;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        public ReportController(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpGet("AccountStatement")]
        public async Task<IActionResult> GetAccountStatement(int accountId, DateOnly startDate, DateOnly endDate)
        {
            try
            {
                var accountStatement = await _reportRepository.GetAccountStatement(accountId, startDate, endDate);
                return Ok(accountStatement);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }   

        [HttpGet("AuditTrails")]
        public async Task<IActionResult> GetAuditTrails(DateOnly startDate, DateOnly endDate)
        {
            try
            {
                var auditTrails = await _reportRepository.GetAuditTrails(startDate, endDate);
                return Ok(auditTrails);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
