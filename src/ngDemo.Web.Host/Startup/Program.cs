using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace ngDemo.Web.Host.Startup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            InitWebHost(args).Run();
        }

        public static IWebHost InitWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseKestrel().UseUrls("http://*:5000")
                .UseStartup<Startup>()
                .Build();
        }
    }
}