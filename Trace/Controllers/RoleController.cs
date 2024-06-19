using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Repositories.UserManagement;
using Core.Models;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet("/GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                var roles = await _roleRepository.GetRolesAsync();
                if (roles == null)
                    return NotFound("No roles found");
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("/AddRole")]
        public async Task<IActionResult> AddRole([FromBody] Role role)
        {
            try
            {
                await _roleRepository.AddRole(role);
                return Ok("Role added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

    }
}
