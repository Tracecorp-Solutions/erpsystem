using Core.Models;
using Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionsController(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        [HttpPost("/RecordTransaction")]
        public async Task<IActionResult> RecordTransaction([FromBody] Transaction transaction)
        {
            try
            {
                await _transactionRepository.RecordTransactionAsync(transaction);
                return Ok("Transaction recorded successfully.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/RetrieveTransactions")]
        public async Task<IActionResult> RetrieveAllTransactions() 
        {
            try
            {
                var transactions = await _transactionRepository.GetAllTransactions();
                return Ok(transactions);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
