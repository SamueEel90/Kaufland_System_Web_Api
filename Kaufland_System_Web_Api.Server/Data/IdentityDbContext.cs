using Kaufland_Software.Server.Modely;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Kaufland_Software.Server.Data
{
    public class IdentityDbContext : DbContext
    {
        public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}