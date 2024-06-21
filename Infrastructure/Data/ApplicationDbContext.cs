using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        #region accounting
        public DbSet<GroupAccount> GroupAccounts { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<TransactionEntry> transactionEntries { get; set; }
        public DbSet<Vendor> Vendors { get; set; }

        public DbSet<BillTranItems> billTranItems { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<SubGroupAccount> SubGroupAccounts { get; set; }
        public DbSet<Bill> Bills { get; set; }
        #endregion

        #region user management
        public DbSet<User> Users { get; set; }
        public DbSet<AuditTrail> AuditTrails { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<InvitedUsers> InvitedUsers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        #endregion

        #region billing module
        public DbSet<State> States { get; set; }
        public DbSet<OperationArea> OperationAreas { get; set; }
        public DbSet<Territory> Territories { get; set; }
        public DbSet<SubTerritory> SubTerritories { get; set; }
        public DbSet<Branch> Branches { get; set; }

        public DbSet<Application> Applications { get; set; }

        public DbSet<CustomerCategory> CustomerCategories { get; set; }

        public DbSet<SurveyReport> surveyReports { get; set; }

        public DbSet<ApplicationLog> ApplicationLogs { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Specify lowercase table names
            //modelBuilder.Entity<GroupAccount>().ToTable("groupaccounts");
            //modelBuilder.Entity<Account>().ToTable("accounts");

            //modelBuilder.Entity<Transaction>()
            //.HasOne(t => t.AccountFrom)
            //.WithMany(a => a.TransactionsFrom)
            //.HasForeignKey(t => t.AccountFromId);

            //modelBuilder.Entity<Transaction>()
            //    .HasOne(t => t.AccountTo)
            //    .WithMany(a => a.TransactionsTo)
            //    .HasForeignKey(t => t.AccountToId);
            //modelBuilder.Entity<Transaction>().ToTable("transactions");
            //modelBuilder.Entity<Vendor>().ToTable("vendors");
            //modelBuilder.Entity<Address>().ToTable("addresses");
            //modelBuilder.Entity<SubGroupAccount>().ToTable("subgroupaccounts");
            //modelBuilder.Entity<Bill>().ToTable("bills");
            //modelBuilder.Entity<BillTranItems>().ToTable("billtranitems");
            //modelBuilder.Entity<Product>().ToTable("Products");
        }
    }

}
