using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.Accounting
{
    public interface IBillRepository
    {
        Task<Bill> CreateBillAsync(Bill bill);
        Task<IEnumerable<BillViewModel>> GetBills();

        Task<BillViewModel> GetBillById(int id);
        Task UpdateBill(Bill bill);
        Task<string> PayBill(int id);
    }
}
