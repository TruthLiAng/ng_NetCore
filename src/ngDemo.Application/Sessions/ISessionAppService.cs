using System.Threading.Tasks;
using Abp.Application.Services;
using ngDemo.Sessions.Dto;

namespace ngDemo.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
