using Core;
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
        public async Task<IActionResult> RecordTransaction([FromBody] TransactionViewModel trans)
        {

            try
            {
                await _transactionRepository.RecordTransactionAsync(trans);
                return Ok("Transaction recorded successfully.");
            }catch(InvalidOperationException ex) 
            {
                return BadRequest(ex.Message);
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
                if (transactions.Any())
                    return Ok(transactions);
                return NotFound("No transaction found");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetTransactionsByAccountId")]
        public async Task<IActionResult> GetTransactionEntriesByAccountId(int accountid) 
        {
            try
            {
                var transactions = await _transactionRepository.GetTransactionEntriesByAccountId(accountid);
                return Ok(transactions);
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

        [HttpGet("/GetTransactionsByDateRange/{startDate}&{endDate}")]
        public async Task<IActionResult> GetTransactionsByDateRange(DateOnly startDate, DateOnly endDate)
        {
            try
            {
                var transactions = await _transactionRepository.GetTransactionsByDateRange(startDate, endDate);
                if (transactions.Any())
                    return Ok(transactions);
                return NotFound("No transaction found");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
