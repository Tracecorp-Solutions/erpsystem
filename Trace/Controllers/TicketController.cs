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
    }
}
