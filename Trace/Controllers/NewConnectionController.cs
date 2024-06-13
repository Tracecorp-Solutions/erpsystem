﻿using Core.DTOs;
using Core.Models;
using Core.Repositories.Billing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewConnectionController : ControllerBase
    {
        private readonly INewConnectionRepository _newconnectionRepository;

        public NewConnectionController(INewConnectionRepository newconnectionRepository) 
        {
            _newconnectionRepository = newconnectionRepository;
        }

        [HttpPost("/NewApplication")]
        public async Task<IActionResult> NewApplication([FromBody] IFormFile file, NewApplicationDto application) 
        {
            try
            {
                string appnumber = await _newconnectionRepository.RegisterNewCustomer(file, application);
                return Ok($"Application Registered Successfully Reference Number is {appnumber}");
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetApplications")]
        public async Task<IActionResult> GetApplications() 
        {
            try
            {
                var applications = await _newconnectionRepository.GetApplications();
                return Ok(applications);
            }catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
