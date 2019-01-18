using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ngDemo.Roles.Dto;

namespace ngDemo.Roles
{
    public interface IRoleAppService : IAsyncCrudAppService<RoleDto, int, PagedResultRequestDto, CreateRoleDto, RoleDto>
    {
        Task<ListResultDto<PermissionDto>> GetAllPermissions();

        Task<GetRoleForEditOutput> GetRoleForEdit(EntityDto input);

        Task<ListResultDto<RoleListDto>> GetRolesAsync(GetRolesInput input);

        Task<ListResultDto<RoleDto>> GetAllRolesAsync(int? pi, int? ps);
    }
}