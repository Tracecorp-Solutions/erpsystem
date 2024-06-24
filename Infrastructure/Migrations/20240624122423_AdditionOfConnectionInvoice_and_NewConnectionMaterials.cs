using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfConnectionInvoice_and_NewConnectionMaterials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewConnectionInvoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    InvoiceNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ApplicationId = table.Column<int>(type: "int", nullable: false),
                    InvoiceDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PaymentDate = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewConnectionInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewConnectionInvoices_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "NewConnectionInvoiceMaterials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NewConnectionInvoiceId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewConnectionInvoiceMaterials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewConnectionInvoiceMaterials_NewConnectionInvoices_NewConne~",
                        column: x => x.NewConnectionInvoiceId,
                        principalTable: "NewConnectionInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_billTranItems_AccountId",
                table: "billTranItems",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_NewConnectionInvoiceMaterials_NewConnectionInvoiceId",
                table: "NewConnectionInvoiceMaterials",
                column: "NewConnectionInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_NewConnectionInvoices_ApplicationId",
                table: "NewConnectionInvoices",
                column: "ApplicationId");

            migrationBuilder.AddForeignKey(
                name: "FK_billTranItems_Accounts_AccountId",
                table: "billTranItems",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_billTranItems_Accounts_AccountId",
                table: "billTranItems");

            migrationBuilder.DropTable(
                name: "NewConnectionInvoiceMaterials");

            migrationBuilder.DropTable(
                name: "NewConnectionInvoices");

            migrationBuilder.DropIndex(
                name: "IX_billTranItems_AccountId",
                table: "billTranItems");
        }
    }
}
