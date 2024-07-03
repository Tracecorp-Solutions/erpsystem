using Core.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class DocketInitiationDto
    {
        public string ApplicationNumber { get; set; }
        public string CustomerRef { get; set; }
        public string MeterNumber { get; set; }
        public string? BlockNumber { get; set; }
        public string MeterType { get; set; }
        public string? MeterSize { get; set; }
        public string? LocationCordinates { get; set; }
        public string? InitialReading { get; set; }
        public string? Dials { get; set; }
        public DateOnly? MeterManufactureDate { get; set; }
        public DateOnly DateOfInstallation { get; set; }
        public int InstalledBy { get; set; }

        public string Remarks { get; set; }
    }
}
