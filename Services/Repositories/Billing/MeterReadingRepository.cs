using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs.Billing;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Core.Repositories.Settings;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;

namespace Services.Repositories.Billing
{
    public class MeterReadingRepository : IMeterReadingRepository
    {
        public readonly ApplicationDbContext _context;
        public readonly ISettings _settings;

        public MeterReadingRepository(ApplicationDbContext context, ISettings settings)
        {
            _context = context;
            _settings = settings;
        }
        public async Task AddMeterReading(MeterReadingDto meterReadingDto)
        {
            //map model to meterReading
            var meterreading = new MeterReading {
                CustomerRef = meterReadingDto.CustomerRef,
                MeterNo = meterReadingDto.MeterNo,
                PreviousReading = meterReadingDto.PreviousReading,
                PreviousReadingDate = meterReadingDto.PreviousReadingDate,
                Reading = meterReadingDto.Reading,
                ReadingType = meterReadingDto.ReadingType,
                IsBilled = meterReadingDto.IsBilled,
                ReadingSource = meterReadingDto.ReadingSource,
                ReadingReason = meterReadingDto.ReadingReason,
                ReadingStatus = meterReadingDto.ReadingStatus,
                ReadingBy = meterReadingDto.ReadingBy,
                ReadingDate = meterReadingDto.ReadingDate
            };

            _context.MeterReadings.Add(meterreading);
            await _context.SaveChangesAsync();

        }

        public Task DeleteMeterReading(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<MeterReadingDto> GetMeterReading(int id)
        {
            //get readings by id and map it to dto
            var meterreading = await _context.MeterReadings.FindAsync(id);
            var meterreadingDto = new MeterReadingDto
            {
                ReadingDate = meterreading.ReadingDate,
                PreviousReading = meterreading.PreviousReading,
                Reading = meterreading.Reading,
                Consumption = (meterreading.Reading- meterreading.PreviousReading).ToString(),
                ReadingType = meterreading.ReadingType,
                MeterNo = meterreading.MeterNo,
                CustomerRef = meterreading.CustomerRef,
                ReadingStatus = meterreading.ReadingStatus,
                ReadingSource = meterreading.ReadingSource,
                ReadingReason = meterreading.ReadingReason,
                ReadingBy = meterreading.ReadingBy
            };

            return meterreadingDto;
        }

        public Task<IEnumerable<MeterReadingDto>> GetMeterReadingByCustomerRef(string customerref)
        {
            //get readings by customer reference and map it to dto
            var meterreadings = _context.MeterReadings.Where(x => x.CustomerRef == customerref).ToList();

            //check whether the customer has any readings
            if (meterreadings.Count == 0)
                throw new ArgumentException("No meter readings found for this customer");

            var meterreadingDtos = new List<MeterReadingDto>();
            foreach (var meterreading in meterreadings)
            {
                var meterreadingDto = new MeterReadingDto
                {
                    ReadingDate = meterreading.ReadingDate,
                    PreviousReading = meterreading.PreviousReading,
                    Reading = meterreading.Reading,
                    Consumption = (meterreading.Reading - meterreading.PreviousReading).ToString(),
                    ReadingType = meterreading.ReadingType,
                    MeterNo = meterreading.MeterNo,
                    CustomerRef = meterreading.CustomerRef,
                    ReadingStatus = meterreading.ReadingStatus,
                    ReadingSource = meterreading.ReadingSource,
                    ReadingReason = meterreading.ReadingReason,
                    ReadingBy = meterreading.ReadingBy
                };
                meterreadingDtos.Add(meterreadingDto);
            }

            return Task.FromResult(meterreadingDtos.AsEnumerable());
        }

        public Task<List<MeterReadingDto>> GetMeterReadings()
        {
            //get all readings and map it to dto
            var meterreadings = _context.MeterReadings.ToList();
            var meterreadingDtos = new List<MeterReadingDto>();
            foreach (var meterreading in meterreadings)
            {
                var meterreadingDto = new MeterReadingDto
                {
                    MeterNo = meterreading.MeterNo,
                    CustomerRef = meterreading.CustomerRef,
                    ReadingDate = meterreading.ReadingDate,
                    Reading = meterreading.Reading,
                    ReadingType = meterreading.ReadingType,
                    ReadingStatus = meterreading.ReadingStatus,
                    ReadingSource = meterreading.ReadingSource,
                    ReadingReason = meterreading.ReadingReason,
                    ReadingBy = meterreading.ReadingBy
                };
                meterreadingDtos.Add(meterreadingDto);
            }

            return Task.FromResult(meterreadingDtos);
        }

        public async Task UpdateMeterReading(MeterReadingDto meterReadingDto)
        {
            //first map dto to model
            var meterreading = new MeterReading
            {
                MeterNo = meterReadingDto.MeterNo,
                CustomerRef = meterReadingDto.CustomerRef,
                ReadingDate = meterReadingDto.ReadingDate,
                Reading = meterReadingDto.Reading,
                ReadingType = meterReadingDto.ReadingType,
                ReadingStatus = meterReadingDto.ReadingStatus,
                ReadingSource = meterReadingDto.ReadingSource,
                ReadingReason = meterReadingDto.ReadingReason,
                ReadingBy = meterReadingDto.ReadingBy
            };

            //update the model
            _context.MeterReadings.Update(meterreading);
            await _context.SaveChangesAsync();
        }

        public async Task BulkMeterReading(IFormFile readings, BulkReadingDto dto)
        {
            // check file format of the readings to see if its a csv
            if (readings.ContentType != "text/csv")
            {
                throw new ArgumentException("Invalid file format. Please upload a csv file");
            }
            //get file location
            var fileLocation = await _settings.SaveFileAndReturnPathAsync(readings);

            //map dto to model
            var bulkReading = new BulkReading
            {
                OperationAreaId = dto.OperationAreaId,
                BranchId = dto.BranchId,
                BillingCycleId = dto.BillingCycleId,
                ReadingDate = dto.ReadingDate,
                MeterReaderId = dto.MeterReaderId,
                filelocation = fileLocation
            };

            //add bulk reading to db
            _context.BulkReadings.Add(bulkReading);
            await _context.SaveChangesAsync();
        }
    }
}
