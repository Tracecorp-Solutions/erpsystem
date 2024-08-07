﻿using Core.DTOs.UserManagement;
using Core.Models;
using Core.Repositories.UserManagement;
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
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing your request. {ex.Message} Inner Exception {ex.InnerException}");
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

        [HttpPost("/InviteUsers")]
        public async Task<IActionResult> InviteUsers([FromBody] InviteUserDto InviteUserDto)
        {
            try
            {
                await _userRepository.InviteUsers(InviteUserDto);
                return Ok("Users invited successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while processing your request. Error : {ex.Message}");
            }
        }

        [HttpGet("/GetInvitedUsers/{orginsationid}")]
        public async Task<IActionResult> GetInvitedUsers(int orginsationid)
        {
            try
            {
                var invitedUsers = await _userRepository.GetInvitedUsersByOrganisationId(orginsationid);
                return Ok(invitedUsers);
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

        [HttpGet("/GetUserByToken/{token}")]
        public async Task<IActionResult> GetUserByToken(string token)
        {
            try
            {
                var user = await _userRepository.GetUserByTokenAsync(token);
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

        [HttpGet("/GetUsersByRole/{rolename}")]
        public async Task<IActionResult> GetUsersByRole(string rolename)
        {
            try
            {
                var users = await _userRepository.GetUsersByRoleName(rolename);
                return Ok(users);
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

        [HttpPost("/AssignUserRole")]
        public async Task<IActionResult> AssignUserRole([FromBody] AssignUserRoleDto assignUserRoleDto)
        {
            try
            {
                await _userRepository.AssignUserRole(assignUserRoleDto);
                return Ok("User role assigned successfully");
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

        [HttpGet("/GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userRepository.GetAllUsers();
                return Ok(users);
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
