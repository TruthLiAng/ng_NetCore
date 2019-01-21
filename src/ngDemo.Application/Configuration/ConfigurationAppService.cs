using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using ngDemo.Authorization.Roles;
using ngDemo.Configuration.Dto;
using ngDemo.Roles.Dto;

namespace ngDemo.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ngDemoAppServiceBase, IConfigurationAppService
    {
        private readonly IRepository<Role> _roleRepository;

        public ConfigurationAppService(IRepository<Role> roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }

        public Task<ListResultDto<PermissionDto>> GetAllPermissions()
        {
            var permissions = PermissionManager.GetAllPermissions();

            return Task.FromResult(new ListResultDto<PermissionDto>(
                ObjectMapper.Map<List<PermissionDto>>(permissions)
            ));
        }

        public async Task<ListResultDto<RoleDto>> GetRoles()
        {
            var roles = await _roleRepository.GetAllListAsync();
            return new ListResultDto<RoleDto>(ObjectMapper.Map<List<RoleDto>>(roles));
        }
    }
}