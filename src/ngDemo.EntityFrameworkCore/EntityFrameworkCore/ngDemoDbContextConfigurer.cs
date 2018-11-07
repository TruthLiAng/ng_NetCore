using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ngDemo.EntityFrameworkCore
{
    public static class ngDemoDbContextConfigurer
    {
        //public static void Configure(DbContextOptionsBuilder<ngDemoDbContext> builder, string connectionString)
        //{
        //    builder.UseSqlServer(connectionString);
        //}

        //public static void Configure(DbContextOptionsBuilder<ngDemoDbContext> builder, DbConnection connection)
        //{
        //    builder.UseSqlServer(connection);
        //}
        public static void Configure(DbContextOptionsBuilder<ngDemoDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ngDemoDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}