using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IBillRepository
    {
        Task<Bill> CreateBillAsync(Bill bill);
        Task<IEnumerable<Bill>> GetBills();
    }
}
