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

        [HttpPost("/GetVendorById")]
        public async Task<IActionResult> GetVendorById([FromBody]VendorSearchView view) 
        {
            try
            {
                var vendor = await _vendorRepository.GetVendorById(view);
                return Ok(vendor);
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

        [HttpPost("/UpdateVendorDetails")]
        public async Task<IActionResult> UpdateVendorDetails([FromBody]Vendor vendor) 
        {
            try
            {
                var message = _vendorRepository.UpdateVendor(vendor);
                return Ok(message);
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


    }
}
