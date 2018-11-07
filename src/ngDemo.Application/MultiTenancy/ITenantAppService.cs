using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ngDemo.MultiTenancy.Dto;

namespace ngDemo.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
