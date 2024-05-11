﻿using Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrialBalanceController : ControllerBase
    {
        private readonly ITrialBalanceRepository _taxBalanceRepository;

        public TrialBalanceController(ITrialBalanceRepository taxBalanceRepository)
        {
            _taxBalanceRepository = taxBalanceRepository;
        }

        [HttpGet("/GetTrialBalance")]
        public async Task<IActionResult> GetTrialBalance()
        {
            try
            {
                var trialBalance = await _taxBalanceRepository.GenerateTrialBalance();
                return NotFound("No Transactions Found for trial balance to be populated");
            }catch(ArgumentException ex)
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
