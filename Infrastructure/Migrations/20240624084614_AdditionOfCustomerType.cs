using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfCustomerType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustTypeId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomerTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerTypes", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_CustTypeId",
                table: "Applications",
                column: "CustTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_CustomerTypes_CustTypeId",
                table: "Applications",
                column: "CustTypeId",
                principalTable: "CustomerTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_CustomerTypes_CustTypeId",
                table: "Applications");

            migrationBuilder.DropTable(
                name: "CustomerTypes");

            migrationBuilder.DropIndex(
                name: "IX_Applications_CustTypeId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "CustTypeId",
                table: "Applications");
        }
    }
}
