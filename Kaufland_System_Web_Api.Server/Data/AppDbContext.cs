using Kaufland_Software.Server.Modely;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Kaufland_Software.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Produkt> Produkty { get; set; }
    }
}