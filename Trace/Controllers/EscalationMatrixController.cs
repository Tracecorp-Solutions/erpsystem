using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Repositories.CRM;
using Core.Models.CRM;
using Core.DTOs.CRM;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EscalationMatrixController : ControllerBase
    {
        private readonly IEscalationMatrixRepository _escalationMatrixRepository;

        public EscalationMatrixController(IEscalationMatrixRepository escalationMatrixRepository)
        {
            _escalationMatrixRepository = escalationMatrixRepository;
        }

        [HttpPost("/CreateEscalationMatrix")]
        public async Task<IActionResult> CreateEscalationMatrix(EscatalationMatrixDto matrix)
        {
            try
            {
                await _escalationMatrixRepository.CreateEscalationMatrixAsync(matrix);
                return Ok("Escalation matrix created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //get all escalation matrices
        [HttpGet("/GetAllEscalationMatrices")]
        public async Task<IActionResult> GetAllEscalationMatrices()
        {
            try
            {
                var result = await _escalationMatrixRepository.GetAllEscalationMatricesAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //get escalation matrix by department id
        [HttpGet("/GetEscalationMatrixByDepartmentId/{departmentId}")]
        public async Task<IActionResult> GetEscalationMatrixByDepartmentId(int departmentId)
        {
            try
            {
                var result = await _escalationMatrixRepository.GetEscalationMatrixByDepartmentIdAsync(departmentId);
                return Ok(result);
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
