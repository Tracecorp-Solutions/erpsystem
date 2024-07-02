using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Modifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewMeterServicings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CustomerRef = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MeterNo = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MeterSizeId = table.Column<int>(type: "int", nullable: false),
                    MeterTypeId = table.Column<int>(type: "int", nullable: false),
                    Dials = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ManufactureDate = table.Column<DateOnly>(type: "date", nullable: false),
                    MeterlifeDuration = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    InitialReading = table.Column<int>(type: "int", nullable: false),
                    DateOfInstallation = table.Column<DateOnly>(type: "date", nullable: false),
                    InstalledBy = table.Column<int>(type: "int", nullable: false),
                    MeterTypeNavigationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewMeterServicings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewMeterServicings_MeterSizes_MeterSizeId",
                        column: x => x.MeterSizeId,
                        principalTable: "MeterSizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewMeterServicings_MeterTypes_MeterTypeNavigationId",
                        column: x => x.MeterTypeNavigationId,
                        principalTable: "MeterTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewMeterServicings_Users_InstalledBy",
                        column: x => x.InstalledBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_NewMeterServicings_InstalledBy",
                table: "NewMeterServicings",
                column: "InstalledBy");

            migrationBuilder.CreateIndex(
                name: "IX_NewMeterServicings_MeterSizeId",
                table: "NewMeterServicings",
                column: "MeterSizeId");

            migrationBuilder.CreateIndex(
                name: "IX_NewMeterServicings_MeterTypeNavigationId",
                table: "NewMeterServicings",
                column: "MeterTypeNavigationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewMeterServicings");
        }
    }
}
