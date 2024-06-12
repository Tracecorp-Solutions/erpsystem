using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Accounting
{
    public interface IVendorRepository
    {
        Task<string> CreateVendorAsync(Vendor vendor);
        Task<IEnumerable<Vendor>> GetAllVendors();

        Task<IEnumerable<Vendor>> GetVendorByIdAsync(VendorSearchView vendor);

        Task<IEnumerable<Vendor>> GetVendorsByTypeAsync(string type);

        Task<string> UpdateVendor(Vendor vendor);
    }
}
