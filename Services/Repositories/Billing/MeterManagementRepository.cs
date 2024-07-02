using Core.DTOs.Billing;
using Core.Models.Billing;
using Core.Repositories.Billing;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories.Billing
{
    public class MeterManagementRepository : IMeterManagementRepository
    {
        private readonly ApplicationDbContext _context;

        public MeterManagementRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddMeterServicing(MeterServicingDto meterServicing)
        {
            //check whether customer exists and is assigned a meter
            var customer = _context.BillingCustomers
                .Include(cust => cust.Application)
                .FirstOrDefault(c => c.CustomerRef == meterServicing.CustomerRef);
            if (customer == null)
                throw new ArgumentException("Customer does not exist or is not assigned a meter");

            //check whether meter exists
            var meter = _context.DocketInitiations.FirstOrDefault(m => m.MeterNumber == meterServicing.MeterNo);

            if (meter == null)
                throw new ArgumentException("Meter does not exist");

            //check whether meter is already assigned to a customer
            var meterAssigned = _context.NewMeterServicings.FirstOrDefault(m => m.MeterNo == meterServicing.MeterNo);

            if (meterAssigned != null)
                throw new ArgumentException("Meter is already assigned to a customer");

            //check whether meter size exists
            var meterSize = _context.MeterSizes.FirstOrDefault(m => m.Id == meterServicing.MeterSizeId);

            if (meterSize == null)
                throw new ArgumentException("Meter size does not exist");

            //check whether meter type exists
            var meterType = _context.MeterTypes.FirstOrDefault(m => m.Id == meterServicing.MeterTypeId);

            if (meterType == null)
                throw new ArgumentException("Meter type does not exist");

            //check whether user exists
            var user = _context.Users.FirstOrDefault(u => u.Id == meterServicing.InstalledBy);
            
            if (user == null)
                throw new ArgumentException("User does not exist");

            //map dto to entity
            var newMeterServicing = new NewMeterServicing
            {
                CustomerRef = meterServicing.CustomerRef,
                MeterNo = meterServicing.MeterNo,
                MeterSizeId = meterServicing.MeterSizeId,
                MeterTypeId = meterServicing.MeterTypeId,
                Dials = meterServicing.Dials,
                ManufactureDate = meterServicing.ManufactureDate,
                MeterlifeDuration = meterServicing.MeterlifeDuration,
                InitialReading = meterServicing.InitialReading,
                DateOfInstallation = meterServicing.DateOfInstallation,
                InstalledBy = meterServicing.InstalledBy
            };

            //add entity to context
            _context.NewMeterServicings.Add(newMeterServicing);

            //add log for meter replacement
            var log = new ApplicationLog
            {
                ApplicationNumber = customer.Application.ApplicationNumber,
                Date = DateTime.Now,
                Status = "Meter Servicing",
                Message = $"Meter with number {meterServicing.MeterNo} was installed by {user.FullName} on {meterServicing.DateOfInstallation}",
                //Log = $"Meter with number {meterServicing.MeterNo} was installed by {user.FirstName} {user.LastName} on {meterServicing.DateOfInstallation}"
            };

            _context.ApplicationLogs.Add(log);

            //save changes
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<NewMeterServicing>> GetMeterServicing()
        {
            return await _context.NewMeterServicings
                .Include(m => m.MeterSizeNavigation)
                .Include(m => m.MeterTypeNavigation)
                .Include(m => m.User)
                .ToListAsync();
        }

        public async Task<NewMeterServicing> GetMeterServicingByCustomerRef(string customerRef)
        {
            return await _context.NewMeterServicings
                .Include(m => m.MeterSizeNavigation)
                .Include(m => m.MeterTypeNavigation)
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.CustomerRef == customerRef);
        }




    }
}
