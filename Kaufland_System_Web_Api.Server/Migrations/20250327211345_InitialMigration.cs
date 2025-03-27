using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kaufland_System_Web_Api.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Produkty",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nazov = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cena = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EanKod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zasoba = table.Column<int>(type: "int", nullable: false),
                    Kategoria = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DruhListovania = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Vyrobca = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PocetPredanych = table.Column<int>(type: "int", nullable: false),
                    MinZasoba = table.Column<int>(type: "int", nullable: false),
                    MaxZasoba = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produkty", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produkty");
        }
    }
}
