using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using ngDemo.Configuration.Dto;
using ngDemo.Roles.Dto;

namespace ngDemo.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);

        Task<ListResultDto<PermissionDto>> GetAllPermissions();

        Task<ListResultDto<RoleDto>> GetRoles();
    }
}