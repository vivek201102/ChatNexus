using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options) { }

        public DbSet<User> Users { get; set; } = null;
        public DbSet<Question> Questions { get; set; } = null;
        public DbSet<Sollution> Sollutions { get; set; } = null;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            foreach(var foreignKey in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                foreignKey.DeleteBehavior = DeleteBehavior.NoAction;
            }
        }
    }
}
