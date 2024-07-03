using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.Billing
{
    public class MeterServicingDto
    {
        public string CustomerRef { get; set; }
        public string MeterNo { get; set; }
        public int? MeterSizeId { get; set; }
        public int? MeterTypeId { get; set; }

        public string? Dials { get; set; }

        public DateOnly? ManufactureDate { get; set; }

        public string? MeterlifeDuration { get; set; }

        public int InitialReading { get; set; }
        public DateOnly DateOfInstallation { get; set; }
        public int InstalledBy { get; set; }

        public bool IsMeterServiced { get; set; }
        public int MeterMakes { get; set; }
    }
}
