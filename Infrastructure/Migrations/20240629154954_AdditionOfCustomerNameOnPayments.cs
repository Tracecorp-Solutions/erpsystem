using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfCustomerNameOnPayments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "Payments",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_NewConnectionInvoiceMaterials_MaterialId",
                table: "NewConnectionInvoiceMaterials",
                column: "MaterialId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewConnectionInvoiceMaterials_Materials_MaterialId",
                table: "NewConnectionInvoiceMaterials",
                column: "MaterialId",
                principalTable: "Materials",
                principalColumn: "MaterialId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewConnectionInvoiceMaterials_Materials_MaterialId",
                table: "NewConnectionInvoiceMaterials");

            migrationBuilder.DropIndex(
                name: "IX_NewConnectionInvoiceMaterials_MaterialId",
                table: "NewConnectionInvoiceMaterials");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "Payments");
        }
    }
}
