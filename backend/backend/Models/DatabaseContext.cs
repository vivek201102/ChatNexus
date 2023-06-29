using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace backend.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options) { }

        public DbSet<User> Users { get; set; } = null;
        public DbSet<Question> Questions { get; set; } = null;
        public DbSet<Solution> Solutions { get; set; } = null;

    }
}
