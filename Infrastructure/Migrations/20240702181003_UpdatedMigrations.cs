using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "MeterReadings",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "CustomerBills",
                columns: table => new
                {
                    CustomerBillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    BillDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    BillPeriod = table.Column<int>(type: "int", nullable: false),
                    PreviousReading = table.Column<int>(type: "int", nullable: false),
                    CurrentReading = table.Column<int>(type: "int", nullable: false),
                    consuption = table.Column<int>(type: "int", nullable: false),
                    TotalBillAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalAmountPaid = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    DueAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerBills", x => x.CustomerBillId);
                    table.ForeignKey(
                        name: "FK_CustomerBills_BillingCustomers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "BillingCustomers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBills_CustomerId",
                table: "CustomerBills",
                column: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerBills");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "MeterReadings");
        }
    }
}
