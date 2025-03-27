using Kaufland_Software.Server.Data;
using Kaufland_Software.Server.Modely;
using Microsoft.EntityFrameworkCore;

namespace Kaufland_Software.Server.Services
{
    public class UserService
    {
        private readonly IdentityDbContext _context;

        public UserService(IdentityDbContext context)
        {
            _context = context;
        }

        // Method to get user by ID
        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}