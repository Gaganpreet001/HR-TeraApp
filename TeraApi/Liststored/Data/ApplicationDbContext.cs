using Liststored.Models;
using Microsoft.EntityFrameworkCore;

namespace Liststored.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { 
        }
        //For Login
        //public DbSet<UserMaster> UserMaster { get; set; }
        public DbSet<LogisticsInfo> LogisticsInfo { get; set; }

    }
}
