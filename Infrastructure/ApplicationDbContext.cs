using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {
        }

        public DbSet<GroupAccount> GroupAccounts { get; set; }
        public DbSet<Account> Accounts { get; set; }

        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }

}
