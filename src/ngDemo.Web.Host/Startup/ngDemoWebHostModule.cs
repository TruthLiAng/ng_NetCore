using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ngDemo.Configuration;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace ngDemo.Web.Host.Startup
{
    [DependsOn(
       typeof(ngDemoWebCoreModule))]
    public class ngDemoWebHostModule : AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ngDemoWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ngDemoWebHostModule).GetAssembly());
        }
    }

    public class ExceptionAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var res = context.HttpContext.Response;

            res.StatusCode = 200;
            res.ContentType = "application/json; charset=utf-8";
            context.Result = new JsonResult(new
            {
                msg = context.Exception.Message,
                code = 503
            });
        }
    }
}