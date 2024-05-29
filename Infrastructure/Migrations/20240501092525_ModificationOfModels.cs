using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ModificationOfModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_transactions",
                table: "transactions");

            migrationBuilder.RenameTable(
                name: "transactions",
                newName: "Transactions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountFromId",
                table: "Transactions",
                column: "AccountFromId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountToId",
                table: "Transactions",
                column: "AccountToId");

            migrationBuilder.CreateIndex(
                name: "IX_subgroupaccounts_GroupId",
                table: "subgroupaccounts",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_accounts_SubGroupAccountId",
                table: "accounts",
                column: "SubGroupAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_accounts_subgroupaccounts_SubGroupAccountId",
                table: "accounts",
                column: "SubGroupAccountId",
                principalTable: "subgroupaccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_subgroupaccounts_groupaccounts_GroupId",
                table: "subgroupaccounts",
                column: "GroupId",
                principalTable: "groupaccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_accounts_AccountFromId",
                table: "Transactions",
                column: "AccountFromId",
                principalTable: "accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_accounts_AccountToId",
                table: "Transactions",
                column: "AccountToId",
                principalTable: "accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_accounts_subgroupaccounts_SubGroupAccountId",
                table: "accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_subgroupaccounts_groupaccounts_GroupId",
                table: "subgroupaccounts");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_accounts_AccountFromId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_accounts_AccountToId",
                table: "Transactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_AccountFromId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_AccountToId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_subgroupaccounts_GroupId",
                table: "subgroupaccounts");

            migrationBuilder.DropIndex(
                name: "IX_accounts_SubGroupAccountId",
                table: "accounts");

            migrationBuilder.RenameTable(
                name: "Transactions",
                newName: "transactions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_transactions",
                table: "transactions",
                column: "Id");
        }
    }
}
