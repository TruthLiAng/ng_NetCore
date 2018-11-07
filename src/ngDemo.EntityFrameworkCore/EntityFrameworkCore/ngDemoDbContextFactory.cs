using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using ngDemo.Configuration;
using ngDemo.Web;

namespace ngDemo.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class ngDemoDbContextFactory : IDesignTimeDbContextFactory<ngDemoDbContext>
    {
        public ngDemoDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ngDemoDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            ngDemoDbContextConfigurer.Configure(builder, configuration.GetConnectionString(ngDemoConsts.ConnectionStringName));

            return new ngDemoDbContext(builder.Options);
        }
    }
}
