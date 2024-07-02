using Core.Models.Accounting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Accounting
{
    public interface IProductRepository
    {
        Task<Product> CreateProduct(Product product);
        Task<IEnumerable<Product>> GetAllProducts();


    }
}
