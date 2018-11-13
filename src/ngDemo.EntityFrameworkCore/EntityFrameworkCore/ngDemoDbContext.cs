using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ngDemo.Authorization.Roles;
using ngDemo.Authorization.Users;
using ngDemo.MultiTenancy;
using Abp.Localization;
using ngDemo.Models;

namespace ngDemo.EntityFrameworkCore
{
    public class ngDemoDbContext : AbpZeroDbContext<Tenant, Role, User, ngDemoDbContext>
    {
        /* Define a DbSet for each entity of the application */
        DbSet<Account> Accounts { get; set; }
        DbSet<AccountLog> AccountLogs { get; set; }
        public ngDemoDbContext(DbContextOptions<ngDemoDbContext> options)
            : base(options)
        {
        }

        // add these lines to override max length of property
        // we should set max length smaller than the PostgreSQL allowed size (10485760)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationLanguageText>()
                .Property(p => p.Value)
                .HasMaxLength(100); // any integer that is smaller than 10485760
        }
    }
}