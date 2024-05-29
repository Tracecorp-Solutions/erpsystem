using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CombiningNametoFullNameOnVendors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Company",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "Fax",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Vendors");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Vendors",
                newName: "PaymentAccount");

            migrationBuilder.RenameColumn(
                name: "Suffix",
                table: "Vendors",
                newName: "VendorType");

            migrationBuilder.RenameColumn(
                name: "Other",
                table: "Vendors",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "MiddleName",
                table: "Vendors",
                newName: "AccountNo");

            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "Vendors",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Vendors",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Vendors_PaymentAccount",
                table: "Vendors",
                column: "PaymentAccount");

            migrationBuilder.AddForeignKey(
                name: "FK_Vendors_Accounts_PaymentAccount",
                table: "Vendors",
                column: "PaymentAccount",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vendors_Accounts_PaymentAccount",
                table: "Vendors");

            migrationBuilder.DropIndex(
                name: "IX_Vendors_PaymentAccount",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Vendors");

            migrationBuilder.RenameColumn(
                name: "VendorType",
                table: "Vendors",
                newName: "Suffix");

            migrationBuilder.RenameColumn(
                name: "PaymentAccount",
                table: "Vendors",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Vendors",
                newName: "Other");

            migrationBuilder.RenameColumn(
                name: "AccountNo",
                table: "Vendors",
                newName: "MiddleName");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Vendors",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "Vendors",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Fax",
                table: "Vendors",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Vendors",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Vendors",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
