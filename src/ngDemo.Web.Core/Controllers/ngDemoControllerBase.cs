using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ngDemo.Controllers
{
    public abstract class ngDemoControllerBase: AbpController
    {
        protected ngDemoControllerBase()
        {
            LocalizationSourceName = ngDemoConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
