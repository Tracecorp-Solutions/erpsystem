using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Repositories.CRM;
using Core.Models.CRM;

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
        public async Task<IActionResult> AddDepartments(Department department)
        {
            try 
            {
                var result = await _departmentRepository.AddDepartment(department);
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


        
    }
}
