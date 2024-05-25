using Core.DTOs;
using Core.Models;
using Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public AuthenticationController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("/RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto user)
        {
            try
            {
                var createdUser = await _userRepository.CreateUserAsync(user);
                return Ok("User Created Successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AuthenticateUser")]
        public async Task<IActionResult> AuthenticateUser([FromBody] LoginDTo loginDTo)
        {
            try
            {
                var token = await _userRepository.AuthenticateUserAsync(loginDTo);
                return Ok(token);
            }
            catch (ArgumentException ex)
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
