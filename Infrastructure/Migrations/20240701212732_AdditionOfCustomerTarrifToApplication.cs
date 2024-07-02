using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfCustomerTarrifToApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomertarrifId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomerTarrifs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TarrifName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TarrifDescription = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TarrifAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerTarrifs", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BillingCustomers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CustomerRef = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ApplicationId = table.Column<int>(type: "int", nullable: false),
                    TarrifId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingCustomers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillingCustomers_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillingCustomers_CustomerTarrifs_TarrifId",
                        column: x => x.TarrifId,
                        principalTable: "CustomerTarrifs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_CustomertarrifId",
                table: "Applications",
                column: "CustomertarrifId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingCustomers_ApplicationId",
                table: "BillingCustomers",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingCustomers_TarrifId",
                table: "BillingCustomers",
                column: "TarrifId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_CustomerTarrifs_CustomertarrifId",
                table: "Applications",
                column: "CustomertarrifId",
                principalTable: "CustomerTarrifs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_CustomerTarrifs_CustomertarrifId",
                table: "Applications");

            migrationBuilder.DropTable(
                name: "BillingCustomers");

            migrationBuilder.DropTable(
                name: "CustomerTarrifs");

            migrationBuilder.DropIndex(
                name: "IX_Applications_CustomertarrifId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "CustomertarrifId",
                table: "Applications");
        }
    }
}
