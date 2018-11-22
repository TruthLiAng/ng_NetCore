using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ngDemo.MoneyAccountLog.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ngDemo.MoneyAccountLog
{
    public interface IMoneyAccountLogAppService : IAsyncCrudAppService<AccountLogDto, int, PagedResultRequestDto, AccountLogDto, AccountLogDto>
    {

    }
}
