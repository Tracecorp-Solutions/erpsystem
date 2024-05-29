using Core.Models;
using Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;

        public ProductsController(IProductRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("/CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromBody] Product product) 
        {
            try
            {
                var pdt = await _repository.CreateProduct(product);

                return CreatedAtAction(nameof(CreateProduct), new { pdt.Id, product });
            }
            catch(ArgumentException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [HttpGet("/GetAllProducts")]
        public async Task<IActionResult> GetAllProducts() 
        {
            try
            {
                var products = await _repository.GetAllProducts();
                if(products.Any())
                    return Ok(products);
                return NotFound("No Products Found");
            }
            catch(ArgumentException ex) 
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
