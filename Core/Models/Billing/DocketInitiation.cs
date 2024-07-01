using Core.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class DocketInitiation
    {
        public int Id { get; set; }

        [ForeignKey("Application")]
        public int ApplicationId { get; set; }
        public string CustomerRef { get; set; }
        public string MeterNumber { get; set; }
        public string? BlockNumber { get; set; }
        public string MeterType { get; set; }
        public string? MeterSize { get; set; }
        public string? LocationCordinates { get; set; }
        public int InitialReading { get; set; }
        public string? Dials { get; set; }
        public DateOnly MeterManufactureDate { get; set; }
        public DateOnly DateOfInstallation { get; set; }

        [ForeignKey("User")]
        public int InstalledBy { get; set; }

        public string Remarks { get; set; }

        public virtual User? User { get; set; }

        public Application? Application { get; set; }

    }
}
