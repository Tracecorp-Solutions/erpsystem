using Core.DTOs.Billing;
using Core.Models.Billing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Billing
{
    public interface IMeterManagementRepository
    {
        Task AddMeterServicing(MeterServicingDto meterServicing);

        Task<IEnumerable<NewMeterServicing>> GetMeterServicing();

        Task<NewMeterServicing> GetMeterServicingByCustomerRef(string customerRef);

        


    }
}
