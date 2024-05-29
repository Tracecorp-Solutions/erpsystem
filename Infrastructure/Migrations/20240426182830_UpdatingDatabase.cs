using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubGroupAccounts_GroupAccounts_GroupAccountId",
                table: "SubGroupAccounts");

            migrationBuilder.DropIndex(
                name: "IX_SubGroupAccounts_GroupAccountId",
                table: "SubGroupAccounts");

            migrationBuilder.DropColumn(
                name: "GroupAccountId",
                table: "SubGroupAccounts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GroupAccountId",
                table: "SubGroupAccounts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SubGroupAccounts_GroupAccountId",
                table: "SubGroupAccounts",
                column: "GroupAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubGroupAccounts_GroupAccounts_GroupAccountId",
                table: "SubGroupAccounts",
                column: "GroupAccountId",
                principalTable: "GroupAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
