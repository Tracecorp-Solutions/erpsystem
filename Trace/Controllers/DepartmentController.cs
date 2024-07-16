using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Repositories.CRM;
using Core.Models.CRM;
using Core.DTOs.CRM;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        [HttpPost("/AddDepartments")]
        public async Task<IActionResult> AddDepartments(DepartmentDto department)
        {
            try 
            {
                await _departmentRepository.AddDepartment(department);
                return Ok("Deparment added successfully");
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //get all departments
        [HttpGet("/GetAllDepartments")]
        public async Task<IActionResult> GetAllDepartments()
        {
            try
            {
                var result = await _departmentRepository.GetDepartments();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //get department by id
        [HttpGet("/GetDepartmentById/{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            try
            {
                var result = await _departmentRepository.GetDepartment(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //update department
        [HttpPut("/UpdateDepartment")]
        public async Task<IActionResult> UpdateDepartment(Department department)
        {
            try
            {
                await _departmentRepository.UpdateDepartment(department);
                return Ok("Department updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //delete department
        [HttpDelete("/DeleteDepartment/{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            try
            {
                await _departmentRepository.DeleteDepartment(id);
                return Ok("Department deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        
    }
}
