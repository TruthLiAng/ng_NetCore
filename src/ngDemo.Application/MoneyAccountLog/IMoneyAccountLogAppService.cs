using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ngDemo.MoneyAccountLog.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ngDemo.MoneyAccountLog
{
    public interface IMoneyAccountLogAppService : IAsyncCrudAppService<AccountLogDto, int, PagedResultRequestDto, AccountLogDto, AccountLogDto>
    {
        Task<PagedResultDto<AccountLogDto>> GetAllByAccountId(PagedResultRequestAccountLogDto input);
    }
}