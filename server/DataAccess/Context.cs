using Microsoft.EntityFrameworkCore;
using server.DbModels;

namespace server
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options)
        {
        }

        public DbSet<Bill> Bills { get; set; }

    }
}
