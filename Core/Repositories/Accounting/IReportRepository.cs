using Core.DTOs.Accounting;
using Core.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Accounting
{
    public interface IReportRepository
    {
        Task<AccountStatement> GetAccountStatement(int accountId, DateOnly startDate, DateOnly endDate);

        Task<IEnumerable<AuditTrail>> GetAuditTrails(DateOnly startDate, DateOnly endDate);
    }
}
