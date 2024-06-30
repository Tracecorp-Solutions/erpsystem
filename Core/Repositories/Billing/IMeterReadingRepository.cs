using Core.DTOs.Billing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Billing
{
    public interface IMeterReadingRepository
    {
        Task AddMeterReading(MeterReadingDto meterReadingDto);
        Task<List<MeterReadingDto>> GetMeterReadings();
        Task<MeterReadingDto> GetMeterReading(int id);
        Task UpdateMeterReading(MeterReadingDto meterReadingDto);
        Task DeleteMeterReading(int id);
    }
}
