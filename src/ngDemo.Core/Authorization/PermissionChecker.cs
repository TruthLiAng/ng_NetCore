using Abp.Authorization;
using ngDemo.Authorization.Roles;
using ngDemo.Authorization.Users;

namespace ngDemo.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
