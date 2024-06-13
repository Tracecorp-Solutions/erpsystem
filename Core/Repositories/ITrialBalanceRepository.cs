using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface ITrialBalanceRepository
    {
        Task<Dictionary<string, decimal>> GetTrialBalance();
        Task<IEnumerable<TrialBalanceEntry>> GenerateTrialBalance();
    }
}
