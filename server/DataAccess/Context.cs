using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using server.DbModels;

namespace server
{
    public class DomainModelPostgreSqlContext : DbContext
    {
        public DomainModelPostgreSqlContext(DbContextOptions<DomainModelPostgreSqlContext> options)
            : base(options)
        {
        }

        public DbSet<Bill> Bills { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Bill>().HasKey(m => m.Id);
            
            // shadow properties
            builder.Entity<Bill>().Property<DateTime>("UpdatedTimestamp");
            
            base.OnModelCreating(builder);
        }
        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();

            updateUpdatedProperty<Bill>();

            return base.SaveChanges();
        }

        private void updateUpdatedProperty<T>() where T : class
        {
            var modifiedSourceInfo =
                ChangeTracker.Entries<T>()
                    .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in modifiedSourceInfo)
            {
                entry.Property("UpdatedTimestamp").CurrentValue = DateTime.UtcNow;
            }
        }
    }
}
