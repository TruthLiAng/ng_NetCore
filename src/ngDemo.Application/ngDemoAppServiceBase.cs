using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Abp.Application.Services;
using Abp.IdentityFramework;
using Abp.Runtime.Session;
using ngDemo.Authorization.Users;
using ngDemo.MultiTenancy;
using ngDemo.Authorization.Roles;
using System.Linq;
using System.Collections.Generic;

namespace ngDemo
{
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class ngDemoAppServiceBase : ApplicationService
    {
        public TenantManager TenantManager { get; set; }

        public UserManager UserManager { get; set; }

        public RoleManager RoleManager { get; set; }

        protected ngDemoAppServiceBase()
        {
            LocalizationSourceName = ngDemoConsts.LocalizationSourceName;
        }

        protected virtual Task<User> GetCurrentUserAsync()
        {
            var user = UserManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            if (user == null)
            {
                throw new Exception("There is no current user!");
            }
            return user;
        }

        protected virtual Task<IList<string>> GetCurrentRoleAsync(User user)
        {
            var roles = UserManager.GetRolesAsync(user);
            return roles;
        }

        protected virtual Task<Tenant> GetCurrentTenantAsync()
        {
            return TenantManager.GetByIdAsync(AbpSession.GetTenantId());
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}