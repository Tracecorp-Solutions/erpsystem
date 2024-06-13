using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreatingOfTransactionEntryModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_accounts_subgroupaccounts_SubGroupAccountId",
                table: "accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_addresses_vendors_VendorId",
                table: "addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_billtranitems_bills_BillId",
                table: "billtranitems");

            migrationBuilder.DropForeignKey(
                name: "FK_subgroupaccounts_groupaccounts_GroupId",
                table: "subgroupaccounts");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_vendors",
                table: "vendors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_subgroupaccounts",
                table: "subgroupaccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_groupaccounts",
                table: "groupaccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_billtranitems",
                table: "billtranitems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_bills",
                table: "bills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_addresses",
                table: "addresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_accounts",
                table: "accounts");

            migrationBuilder.RenameTable(
                name: "vendors",
                newName: "Vendors");

            migrationBuilder.RenameTable(
                name: "subgroupaccounts",
                newName: "SubGroupAccounts");

            migrationBuilder.RenameTable(
                name: "groupaccounts",
                newName: "GroupAccounts");

            migrationBuilder.RenameTable(
                name: "billtranitems",
                newName: "billTranItems");

            migrationBuilder.RenameTable(
                name: "bills",
                newName: "Bills");

            migrationBuilder.RenameTable(
                name: "addresses",
                newName: "Addresses");

            migrationBuilder.RenameTable(
                name: "accounts",
                newName: "Accounts");

            migrationBuilder.RenameIndex(
                name: "IX_subgroupaccounts_GroupId",
                table: "SubGroupAccounts",
                newName: "IX_SubGroupAccounts_GroupId");

            migrationBuilder.RenameIndex(
                name: "IX_billtranitems_BillId",
                table: "billTranItems",
                newName: "IX_billTranItems_BillId");

            migrationBuilder.RenameIndex(
                name: "IX_addresses_VendorId",
                table: "Addresses",
                newName: "IX_Addresses_VendorId");

            migrationBuilder.RenameIndex(
                name: "IX_accounts_SubGroupAccountId",
                table: "Accounts",
                newName: "IX_Accounts_SubGroupAccountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendors",
                table: "Vendors",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubGroupAccounts",
                table: "SubGroupAccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupAccounts",
                table: "GroupAccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_billTranItems",
                table: "billTranItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bills",
                table: "Bills",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Accounts",
                table: "Accounts",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "transactionEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TranAccount = table.Column<int>(type: "int", nullable: false),
                    TransactionType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Amount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TransactionReference = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Narration = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_transactionEntries", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_SubGroupAccounts_SubGroupAccountId",
                table: "Accounts",
                column: "SubGroupAccountId",
                principalTable: "SubGroupAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Vendors_VendorId",
                table: "Addresses",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_billTranItems_Bills_BillId",
                table: "billTranItems",
                column: "BillId",
                principalTable: "Bills",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubGroupAccounts_GroupAccounts_GroupId",
                table: "SubGroupAccounts",
                column: "GroupId",
                principalTable: "GroupAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_SubGroupAccounts_SubGroupAccountId",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Vendors_VendorId",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_billTranItems_Bills_BillId",
                table: "billTranItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubGroupAccounts_GroupAccounts_GroupId",
                table: "SubGroupAccounts");

            migrationBuilder.DropTable(
                name: "transactionEntries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendors",
                table: "Vendors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubGroupAccounts",
                table: "SubGroupAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupAccounts",
                table: "GroupAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_billTranItems",
                table: "billTranItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bills",
                table: "Bills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Accounts",
                table: "Accounts");

            migrationBuilder.RenameTable(
                name: "Vendors",
                newName: "vendors");

            migrationBuilder.RenameTable(
                name: "SubGroupAccounts",
                newName: "subgroupaccounts");

            migrationBuilder.RenameTable(
                name: "GroupAccounts",
                newName: "groupaccounts");

            migrationBuilder.RenameTable(
                name: "billTranItems",
                newName: "billtranitems");

            migrationBuilder.RenameTable(
                name: "Bills",
                newName: "bills");

            migrationBuilder.RenameTable(
                name: "Addresses",
                newName: "addresses");

            migrationBuilder.RenameTable(
                name: "Accounts",
                newName: "accounts");

            migrationBuilder.RenameIndex(
                name: "IX_SubGroupAccounts_GroupId",
                table: "subgroupaccounts",
                newName: "IX_subgroupaccounts_GroupId");

            migrationBuilder.RenameIndex(
                name: "IX_billTranItems_BillId",
                table: "billtranitems",
                newName: "IX_billtranitems_BillId");

            migrationBuilder.RenameIndex(
                name: "IX_Addresses_VendorId",
                table: "addresses",
                newName: "IX_addresses_VendorId");

            migrationBuilder.RenameIndex(
                name: "IX_Accounts_SubGroupAccountId",
                table: "accounts",
                newName: "IX_accounts_SubGroupAccountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_vendors",
                table: "vendors",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_subgroupaccounts",
                table: "subgroupaccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_groupaccounts",
                table: "groupaccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_billtranitems",
                table: "billtranitems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_bills",
                table: "bills",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_addresses",
                table: "addresses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_accounts",
                table: "accounts",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AccountFromId = table.Column<int>(type: "int", nullable: false),
                    AccountToId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Narration = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TransactionDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_accounts_AccountFromId",
                        column: x => x.AccountFromId,
                        principalTable: "accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transactions_accounts_AccountToId",
                        column: x => x.AccountToId,
                        principalTable: "accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountFromId",
                table: "Transactions",
                column: "AccountFromId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountToId",
                table: "Transactions",
                column: "AccountToId");

            migrationBuilder.AddForeignKey(
                name: "FK_accounts_subgroupaccounts_SubGroupAccountId",
                table: "accounts",
                column: "SubGroupAccountId",
                principalTable: "subgroupaccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_addresses_vendors_VendorId",
                table: "addresses",
                column: "VendorId",
                principalTable: "vendors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_billtranitems_bills_BillId",
                table: "billtranitems",
                column: "BillId",
                principalTable: "bills",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_subgroupaccounts_groupaccounts_GroupId",
                table: "subgroupaccounts",
                column: "GroupId",
                principalTable: "groupaccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
