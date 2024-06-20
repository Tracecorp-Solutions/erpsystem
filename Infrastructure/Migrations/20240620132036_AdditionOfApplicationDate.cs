using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfApplicationDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "ApplicationDate",
                table: "Applications",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "AssignedTo",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "SurveyDate",
                table: "Applications",
                type: "date",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_AssignedTo",
                table: "Applications",
                column: "AssignedTo");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Users_AssignedTo",
                table: "Applications",
                column: "AssignedTo",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Users_AssignedTo",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_AssignedTo",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ApplicationDate",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "AssignedTo",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "SurveyDate",
                table: "Applications");
        }
    }
}
