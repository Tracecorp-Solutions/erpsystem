using Core.Repositories.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Core.Models;

namespace Services.Repositories.Settings
{
    public class Settings : ISettings
    {
        public async Task<string> SaveFileAndReturnPathAsync(IFormFile file)
        {
            string uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            // Check whether directory exists and create if it doesn't
            if (!Directory.Exists(uploadsDirectory))
            {
                Directory.CreateDirectory(uploadsDirectory);
            }

            string filename = Guid.NewGuid() + Path.GetExtension(file.FileName);
            string filepath = Path.Combine(uploadsDirectory, filename);

            using (var stream = new FileStream(filepath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return filepath;
        }
    }
}
