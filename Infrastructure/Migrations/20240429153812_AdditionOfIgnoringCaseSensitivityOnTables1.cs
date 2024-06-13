using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfIgnoringCaseSensitivityOnTables1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Vendors_VendorId",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_billTranItems_Bills_BillId",
                table: "billTranItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendors",
                table: "Vendors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions");

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
                name: "Transactions",
                newName: "transactions");

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
                name: "IX_billTranItems_BillId",
                table: "billtranitems",
                newName: "IX_billtranitems_BillId");

            migrationBuilder.RenameIndex(
                name: "IX_Addresses_VendorId",
                table: "addresses",
                newName: "IX_addresses_VendorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_vendors",
                table: "vendors",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_transactions",
                table: "transactions",
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_addresses_vendors_VendorId",
                table: "addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_billtranitems_bills_BillId",
                table: "billtranitems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_vendors",
                table: "vendors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_transactions",
                table: "transactions");

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
                name: "transactions",
                newName: "Transactions");

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
                name: "IX_billtranitems_BillId",
                table: "billTranItems",
                newName: "IX_billTranItems_BillId");

            migrationBuilder.RenameIndex(
                name: "IX_addresses_VendorId",
                table: "Addresses",
                newName: "IX_Addresses_VendorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendors",
                table: "Vendors",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions",
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
        }
    }
}
