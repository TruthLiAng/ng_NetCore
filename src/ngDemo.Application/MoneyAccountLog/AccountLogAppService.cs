using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using ngDemo.Models;
using ngDemo.MoneyAccountLog.Dto;

namespace ngDemo.MoneyAccountLog
{
    public class AccountLogAppService : AsyncCrudAppService<AccountLog, AccountLogDto, int, PagedResultRequestDto, AccountLogDto, AccountLogDto>, IAccountLogAppService
    {
        private readonly IRepository<AccountLog> _accountLogRepository;

        public AccountLogAppService(IRepository<AccountLog> accountLogRepository) : base(accountLogRepository)
        {
            _accountLogRepository = accountLogRepository;
        }
    }
}
