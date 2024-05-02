using Core.Models;
using Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorRepository _vendorRepository;

        public VendorController(IVendorRepository vendorRepository)
        {
            _vendorRepository = vendorRepository;
        }

        [HttpPost("/CreateVendor")]

        public async Task<IActionResult> CreateVendor([FromBody] Vendor vendor) 
        {
            try
            {
                await _vendorRepository.CreateVendorAsync(vendor);
                return Ok("Vendor recorded successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("/GetAllVendors")]
        public async Task<IActionResult> GetAllVendors() 
        {
            try
            {
                var vendors = await _vendorRepository.GetAllVendors();
                if(vendors.Any())
                    return Ok(vendors);
                return NotFound("No Vendors found");
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
