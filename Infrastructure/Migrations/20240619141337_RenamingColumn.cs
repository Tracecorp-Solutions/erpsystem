using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenamingColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CustomerCategory",
                table: "Applications",
                newName: "CustomerCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_CustomerCategoryId",
                table: "Applications",
                column: "CustomerCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_CustomerCategories_CustomerCategoryId",
                table: "Applications",
                column: "CustomerCategoryId",
                principalTable: "CustomerCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_CustomerCategories_CustomerCategoryId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_CustomerCategoryId",
                table: "Applications");

            migrationBuilder.RenameColumn(
                name: "CustomerCategoryId",
                table: "Applications",
                newName: "CustomerCategory");
        }
    }
}
