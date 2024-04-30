using Core.Models;
using Core.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateProduct(Product product) 
        {
            if (product == null) 
            {
                throw new ArgumentException(nameof(Product),"Product Has not been submitted");
            }
            var accounts = _context.Accounts.FirstOrDefault(e => e.Id == product.AccountId);
            if (accounts == null)
            {
                throw new ArgumentException("Invalid Account submitted");
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<IEnumerable<Product>> GetAllProducts() 
        {
            if (!await _context.Products.AnyAsync())
            {
                throw new ArgumentException("No Product found");
            }
            return await _context.Products.ToListAsync();
        }
    }
}
