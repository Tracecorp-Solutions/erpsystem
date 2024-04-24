using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionofGroupIdOnAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_GroupAccounts_GroupAccountId",
                table: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_GroupAccountId",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "GroupAccountId",
                table: "Accounts");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "Accounts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Accounts");

            migrationBuilder.AddColumn<int>(
                name: "GroupAccountId",
                table: "Accounts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_GroupAccountId",
                table: "Accounts",
                column: "GroupAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_GroupAccounts_GroupAccountId",
                table: "Accounts",
                column: "GroupAccountId",
                principalTable: "GroupAccounts",
                principalColumn: "Id");
        }
    }
}
