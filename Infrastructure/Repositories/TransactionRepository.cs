using Core.Models;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {

        private readonly ApplicationDbContext _context;

        public TransactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task RecordTransactionAsync(Transaction transaction)
        {
            // Retrieve accounts involved in the transaction
            var accountFrom = await _context.Accounts.FindAsync(transaction.AccountFromId);
            var accountTo = await _context.Accounts.FindAsync(transaction.AccountToId);

            if (accountFrom == null || accountTo == null)
                throw new ArgumentException("Invalid account(s) specified.");

            // Perform double-entry bookkeeping
            accountFrom.Balance -= transaction.Amount;
            accountTo.Balance += transaction.Amount;

            // Save changes to the database
            await _context.SaveChangesAsync();
        }
    }
}
