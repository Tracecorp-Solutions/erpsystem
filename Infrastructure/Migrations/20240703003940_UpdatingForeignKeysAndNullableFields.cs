using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingForeignKeysAndNullableFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewMeterServicings_MeterSizes_MeterSizeId",
                table: "NewMeterServicings");

            migrationBuilder.DropForeignKey(
                name: "FK_NewMeterServicings_MeterTypes_MeterTypeId",
                table: "NewMeterServicings");

            migrationBuilder.AlterColumn<string>(
                name: "MeterlifeDuration",
                table: "NewMeterServicings",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "MeterTypeId",
                table: "NewMeterServicings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "MeterSizeId",
                table: "NewMeterServicings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "ManufactureDate",
                table: "NewMeterServicings",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<string>(
                name: "Dials",
                table: "NewMeterServicings",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_NewMeterServicings_MeterSizes_MeterSizeId",
                table: "NewMeterServicings",
                column: "MeterSizeId",
                principalTable: "MeterSizes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NewMeterServicings_MeterTypes_MeterTypeId",
                table: "NewMeterServicings",
                column: "MeterTypeId",
                principalTable: "MeterTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewMeterServicings_MeterSizes_MeterSizeId",
                table: "NewMeterServicings");

            migrationBuilder.DropForeignKey(
                name: "FK_NewMeterServicings_MeterTypes_MeterTypeId",
                table: "NewMeterServicings");

            migrationBuilder.UpdateData(
                table: "NewMeterServicings",
                keyColumn: "MeterlifeDuration",
                keyValue: null,
                column: "MeterlifeDuration",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "MeterlifeDuration",
                table: "NewMeterServicings",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "MeterTypeId",
                table: "NewMeterServicings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MeterSizeId",
                table: "NewMeterServicings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "ManufactureDate",
                table: "NewMeterServicings",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "NewMeterServicings",
                keyColumn: "Dials",
                keyValue: null,
                column: "Dials",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Dials",
                table: "NewMeterServicings",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_NewMeterServicings_MeterSizes_MeterSizeId",
                table: "NewMeterServicings",
                column: "MeterSizeId",
                principalTable: "MeterSizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NewMeterServicings_MeterTypes_MeterTypeId",
                table: "NewMeterServicings",
                column: "MeterTypeId",
                principalTable: "MeterTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
