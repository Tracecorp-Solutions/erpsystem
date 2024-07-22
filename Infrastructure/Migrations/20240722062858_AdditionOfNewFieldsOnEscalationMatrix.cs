using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfNewFieldsOnEscalationMatrix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepartmentLevel",
                table: "EscalationMatrices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EmailTemplate",
                table: "EscalationMatrices",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "NotificationType",
                table: "EscalationMatrices",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepartmentLevel",
                table: "EscalationMatrices");

            migrationBuilder.DropColumn(
                name: "EmailTemplate",
                table: "EscalationMatrices");

            migrationBuilder.DropColumn(
                name: "NotificationType",
                table: "EscalationMatrices");
        }
    }
}
