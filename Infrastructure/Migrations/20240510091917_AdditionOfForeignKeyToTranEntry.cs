using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfForeignKeyToTranEntry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_transactionEntries_TranAccount",
                table: "transactionEntries",
                column: "TranAccount");

            migrationBuilder.AddForeignKey(
                name: "FK_transactionEntries_Accounts_TranAccount",
                table: "transactionEntries",
                column: "TranAccount",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_transactionEntries_Accounts_TranAccount",
                table: "transactionEntries");

            migrationBuilder.DropIndex(
                name: "IX_transactionEntries_TranAccount",
                table: "transactionEntries");
        }
    }
}
