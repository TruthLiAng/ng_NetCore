using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ngDemo.Roles.Dto;
using ngDemo.Users.Dto;

namespace ngDemo.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);

        Task<string> GetNameAsync();
    }
}