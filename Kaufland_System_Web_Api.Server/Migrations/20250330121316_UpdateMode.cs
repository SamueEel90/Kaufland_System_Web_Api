using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kaufland_System_Web_Api.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ASproces",
                table: "Produkty",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ASproces",
                table: "Produkty");
        }
    }
}
