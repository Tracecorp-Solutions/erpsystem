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
                return Ok("Account created Successfully and pending verification");
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

        [HttpPost("/VerifyUser")]
        public async Task<IActionResult> VerifyUser([FromBody] OTPDto verifyDto)
        {
            try
            {
                await _userRepository.VerifyOtpAsync(verifyDto);
                return Ok("User OTP has been verified successfully");
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

        [HttpPost("/ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePwdDto changePwdDto)
        {
            try
            {
                await _userRepository.ChangePasswordAsync(changePwdDto);
                return Ok("Password changed successfully");
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

        [HttpPost("/ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] string email)
        {
            try
            {
                await _userRepository.ResetPasswordAsync(email);
                return Ok("Password reset link sent to your email");
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

        [HttpGet("/GetUserDetails")]
        public async Task<IActionResult> GetUserDetails(string email)
        {
            try
            {
                var user = await _userRepository.GetUserDetailsByEmail(email);
                return Ok(user);
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

        [HttpPost("/UpdateUserDetails")]
        public async Task<IActionResult> UpdateUserDetails([FromForm] IFormFile file, [FromForm] UserDTO userDTO)
        {
            try
            {
                await _userRepository.UpdateUserDetails(file, userDTO);
                return Ok("User details updated successfully");
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
