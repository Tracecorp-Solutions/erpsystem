using Core.DTOs;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IReportRepository
    {
        Task<AccountStatement> GetAccountStatement(int accountId, DateOnly startDate, DateOnly endDate);

        Task<IEnumerable<AuditTrail>> GetAuditTrails(DateOnly startDate, DateOnly endDate);
    }
}
