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
    public class MoneyAccountLogAppService : AsyncCrudAppService<AccountLog, AccountLogDto, int, PagedResultRequestDto, AccountLogDto, AccountLogDto>, IMoneyAccountLogAppService
    {
        private readonly IRepository<AccountLog> _accountLogRepository;

        public MoneyAccountLogAppService(IRepository<AccountLog> accountLogRepository) : base(accountLogRepository)
        {
            _accountLogRepository = accountLogRepository;
        }

        public async Task<PagedResultDto<AccountLogDto>> GetAllByAccountId(PagedResultRequestAccountLogDto input)
        {
            var logs = await _accountLogRepository.GetAllListAsync(o => o.AccountId == input.accountId);

            var res = ObjectMapper.Map<List<AccountLogDto>>(logs);

            return new PagedResultDto<AccountLogDto>(logs.Count, res);
        }
    }
}