using Core.Models.Accounting;
using Core.Models.Billing;
using Core.Models.CRM;
using Core.Models.UserManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

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

        public DbSet<JobCard> JobCards { get; set; }

        public DbSet<CustomerType> CustomerTypes { get; set; }

        public DbSet<BillDeliveryMethod> BillDeliveryMethods { get; set; }

        public DbSet<NewConnectionInvoice> NewConnectionInvoices { get; set; }

        public DbSet<NewConnectionInvoiceMaterials> NewConnectionInvoiceMaterials { get; set; }

        public DbSet<Material> Materials { get; set; }

        public DbSet<DocketInitiation> DocketInitiations { get; set; }

        public DbSet<Payment> Payments { get; set; }

        public DbSet<BillingRequest> BillingRequests { get; set; }

        public DbSet<MeterReading> MeterReadings { get; set; }

        public DbSet<CustomerTarrif> CustomerTarrifs { get; set; }

        public DbSet<BillingCustomer> BillingCustomers { get; set; }

        public DbSet<MeterTypes> MeterTypes { get; set; }

        public DbSet<MeterSize> MeterSizes { get; set; }

        public DbSet<MeterMake> MeterMakes { get; set; }

        public DbSet<NewMeterServicing> NewMeterServicings { get; set; }

        public DbSet<CustomerBill> CustomerBills { get; set; }

        public DbSet<Block> Blocks { get; set; }

        public DbSet<BillAdjustmentRequest> BillAdjustmentRequests { get; set; }

        public DbSet<TransactionCodes> TransactionCodes { get; set; }

        public DbSet<BulkReading> BulkReadings { get; set; }

        public DbSet<BillingPeriod> BillingPeriod { get; set; }

        #endregion

        #region CRM module
        public DbSet<Department> Departments { get; set; }
        public DbSet<TicketCategory> TicketCategories { get; set; }
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
