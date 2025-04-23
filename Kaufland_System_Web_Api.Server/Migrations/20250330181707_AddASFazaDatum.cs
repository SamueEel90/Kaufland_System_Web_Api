using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kaufland_System_Web_Api.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddASFazaDatum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DatumZmenyASFazy",
                table: "Produkty",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatumZmenyASFazy",
                table: "Produkty");
        }
    }
}
