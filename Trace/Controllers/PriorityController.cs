using Core.DTOs.CRM;
using Core.Models.CRM;
using Core.Repositories.CRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriorityController : ControllerBase
    {
        private readonly IPriorityRepository _priorityRepository;   

        public PriorityController(IPriorityRepository priorityRepository)
        {
            _priorityRepository = priorityRepository;
        }

        [HttpGet("/GetPriorities")]
        public async Task<IActionResult> GetPriorities()
        {
            try
            {
                var priorities = await _priorityRepository.GetPriorities();
                return Ok(priorities);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
            
        }

        [HttpGet("/GetPriority/{id}")]
        public async Task<IActionResult> GetPriority(int id)
        {
            try
            {
                var priority = await _priorityRepository.GetPriority(id);
                return Ok(priority);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
            
        }

        [HttpPost("/AddPriority")]
        public async Task<IActionResult> AddPriority(PriorityDto priority)
        {
            try
            {
                await _priorityRepository.AddPriority(priority);
                return Ok("Priority added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("/DeletePriority/{id}")]
        public async Task<IActionResult> DeletePriority(int id)
        {
            try
            {
                await _priorityRepository.DeletePriority(id);
                return Ok("Priority deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPut("/UpdatePriority")]
        public async Task<IActionResult> UpdatePriority(PriorityDto priority)
        {
            try
            {
                await _priorityRepository.UpdatePriority(priority);
                return Ok("Priority updated successfully");
            }catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


    }
}
