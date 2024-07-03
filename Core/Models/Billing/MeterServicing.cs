using Core.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models.Billing
{
    public class NewMeterServicing
    {
        public int Id { get; set; }
        public string CustomerRef { get; set; }
        public string MeterNo { get; set; }

        [ForeignKey("MeterSize")]
        public int? MeterSizeId { get; set; }

        [ForeignKey("MeterTypes")]
        public int? MeterTypeId { get; set; }

        [ForeignKey("MeterMake")]
        public int MeterMakeId { get; set; }

        public string? Dials { get; set; }
        public DateOnly? ManufactureDate { get; set; }
        public string? MeterlifeDuration { get; set; }
        public int InitialReading { get; set; }
        public DateOnly DateOfInstallation { get; set; }

        [ForeignKey("User")]
        public int InstalledBy { get; set; }

        public MeterSize MeterSize { get; set; }
        public MeterTypes MeterType { get; set; }
        public MeterMake MeterMake { get; set; }
        public User User { get; set; }
    }

}
