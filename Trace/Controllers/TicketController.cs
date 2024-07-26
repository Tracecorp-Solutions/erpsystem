using Core.DTOs.CRM;
using Core.Repositories.CRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketController(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        [HttpPost("/CreateTicket")]
        public async Task<IActionResult> CreateTicket(TicketDto ticket)
        {
            try
            {
                await _ticketRepository.CreateTicketAsync(ticket);
                return Ok("Ticket created successfully");
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("/GetAllTickets")]
        public async Task<IActionResult> GetAllTickets()
        {
            try
            {
                var result = await _ticketRepository.GetAllTicketsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("/GetTicketById/{ticketId}")]
        public async Task<IActionResult> GetTicketById(int ticketId)
        {
            try
            {
                var result = await _ticketRepository.GetTicketByIdAsync(ticketId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("/GetTicketsByBranchId/{branchId}")]
        public async Task<IActionResult> GetTicketsByBranchId(int branchId)
        {
            try
            {
                var result = await _ticketRepository.GetTicketsByBranchIdAsync(branchId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("/EscalateTicket")]
        public async Task<IActionResult> EscalateTicket(EscalateTicketDto dto)
        {
            try
            {
                await _ticketRepository.EscalateTicket(dto);
                return Ok("Ticket escalated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("/ResolveTicket")]
        public async Task<IActionResult> ResolveTicket([FromForm] IFormFile file, [FromForm] EscalateTicketDto dto)
        {
            try
            {
                await _ticketRepository.ResolveTicket(file, dto);
                return Ok("Ticket resolved successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("/GetTicketStatistics")]
        public async Task<IActionResult> GetTicketStatistics()
        {
            try
            {
                var result = await _ticketRepository.GetTicketStatisticsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("/GetTicketStatusSummary")]
        public async Task<IActionResult> GetTicketStatusSummary()
        {
            try
            {
                var result = await _ticketRepository.GetTicketStatusSummaryAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
