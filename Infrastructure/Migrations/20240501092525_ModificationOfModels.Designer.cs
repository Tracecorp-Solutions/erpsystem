﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240501092525_ModificationOfModels")]
    partial class ModificationOfModels
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Core.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SubGroupAccountId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SubGroupAccountId");

                    b.ToTable("accounts", (string)null);
                });

            modelBuilder.Entity("Core.Models.Address", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("VendorId")
                        .HasColumnType("int");

                    b.Property<string>("ZipCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("VendorId")
                        .IsUnique();

                    b.ToTable("addresses", (string)null);
                });

            modelBuilder.Entity("Core.Models.Bill", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<DateTime>("BillDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("BillNo")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Narration")
                        .HasColumnType("longtext");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal?>("TotalAmount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("bills", (string)null);
                });

            modelBuilder.Entity("Core.Models.BillTranItems", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int?>("BillId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("BillId");

                    b.ToTable("billtranitems", (string)null);
                });

            modelBuilder.Entity("Core.Models.GroupAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Behaviour")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("groupaccounts", (string)null);
                });

            modelBuilder.Entity("Core.Models.Product", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Rate")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.ToTable("Products", (string)null);
                });

            modelBuilder.Entity("Core.Models.SubGroupAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.ToTable("subgroupaccounts", (string)null);
                });

            modelBuilder.Entity("Core.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AccountFromId")
                        .HasColumnType("int");

                    b.Property<int>("AccountToId")
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("Narration")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("TransactionDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("AccountFromId");

                    b.HasIndex("AccountToId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("Core.Models.Vendor", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<int?>("AccountId")
                        .HasColumnType("int");

                    b.Property<decimal>("BillingRate")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("BusinessIdNo")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Company")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Fax")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MiddleName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Mobile")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Notes")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("OpeningBalance")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("OpeningBalanceDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Other")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Suffix")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Website")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("vendors", (string)null);
                });

            modelBuilder.Entity("Core.Models.Account", b =>
                {
                    b.HasOne("Core.Models.SubGroupAccount", "SubGroupAccount")
                        .WithMany("Accounts")
                        .HasForeignKey("SubGroupAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SubGroupAccount");
                });

            modelBuilder.Entity("Core.Models.Address", b =>
                {
                    b.HasOne("Core.Models.Vendor", null)
                        .WithOne("Addres")
                        .HasForeignKey("Core.Models.Address", "VendorId");
                });

            modelBuilder.Entity("Core.Models.BillTranItems", b =>
                {
                    b.HasOne("Core.Models.Bill", null)
                        .WithMany("BillTranItems")
                        .HasForeignKey("BillId");
                });

            modelBuilder.Entity("Core.Models.SubGroupAccount", b =>
                {
                    b.HasOne("Core.Models.GroupAccount", "GroupAccount")
                        .WithMany("SubGroupAccounts")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GroupAccount");
                });

            modelBuilder.Entity("Core.Models.Transaction", b =>
                {
                    b.HasOne("Core.Models.Account", "AccountFrom")
                        .WithMany("TransactionsFrom")
                        .HasForeignKey("AccountFromId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Models.Account", "AccountTo")
                        .WithMany("TransactionsTo")
                        .HasForeignKey("AccountToId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AccountFrom");

                    b.Navigation("AccountTo");
                });

            modelBuilder.Entity("Core.Models.Account", b =>
                {
                    b.Navigation("TransactionsFrom");

                    b.Navigation("TransactionsTo");
                });

            modelBuilder.Entity("Core.Models.Bill", b =>
                {
                    b.Navigation("BillTranItems");
                });

            modelBuilder.Entity("Core.Models.GroupAccount", b =>
                {
                    b.Navigation("SubGroupAccounts");
                });

            modelBuilder.Entity("Core.Models.SubGroupAccount", b =>
                {
                    b.Navigation("Accounts");
                });

            modelBuilder.Entity("Core.Models.Vendor", b =>
                {
                    b.Navigation("Addres")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}