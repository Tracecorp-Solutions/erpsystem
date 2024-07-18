using Core.DTOs.CRM;
using Core.Repositories.CRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Models.CRM;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketCategoryController : ControllerBase
    {
        private readonly ITicketCategoryRepository _ticketCategoryRepository;

        public TicketCategoryController(ITicketCategoryRepository ticketCategoryRepository)
        {
            _ticketCategoryRepository = ticketCategoryRepository;
        }

        [HttpGet("/GetTicketCategories")]
        public async Task<IActionResult> GetTicketCategories()
        {
            try 
            {
                var ticketCategories = await _ticketCategoryRepository.GetTicketCategories();
                return Ok(ticketCategories);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("/AddTicketCategory")]
        public async Task<IActionResult> AddTicketCategory([FromBody] TicketCategoryDto dto)
        {
            try
            {
                await _ticketCategoryRepository.AddTicketCategory(dto);
                return Ok("Ticket Category added successfully");
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("/UpdateTicketCategory")]
        public async Task<IActionResult> UpdateTicketCategory([FromBody] TicketCategoryDto category)
        {
            try
            {
                await _ticketCategoryRepository.UpdateTicketCategory(category);
                return Ok("Ticket Category updated successfully");
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("/DeleteTicketCategory/{id}")]
        public async Task<IActionResult> DeleteTicketCategory(int id)
        {
            try
            {
                await _ticketCategoryRepository.DeleteTicketCategory(id);
                return Ok("Ticket Category deleted successfully");
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
