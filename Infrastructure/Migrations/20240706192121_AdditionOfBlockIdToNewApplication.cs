using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfBlockIdToNewApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BlockId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_BlockId",
                table: "Applications",
                column: "BlockId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Blocks_BlockId",
                table: "Applications",
                column: "BlockId",
                principalTable: "Blocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Blocks_BlockId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_BlockId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "BlockId",
                table: "Applications");
        }
    }
}
