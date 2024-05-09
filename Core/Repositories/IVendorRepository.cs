﻿using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IVendorRepository
    {
        Task<Vendor> CreateVendorAsync(Vendor vendor);
        Task<IEnumerable<Vendor>> GetAllVendors();

        Task<IEnumerable<Vendor>> GetVendorById(VendorSearchView vendor);

        Task<string> UpdateVendor(Vendor vendor);
    }
}
