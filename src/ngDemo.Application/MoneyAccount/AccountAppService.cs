using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using ngDemo.Models;
using ngDemo.MoneyAccount.Dto;

namespace ngDemo.MoneyAccount
{
    public class AccountAppService : ngDemoAppServiceBase,IAccountAppService
    {
        private readonly IRepository<Account> _accountRepository;

        public AccountAppService(IRepository<Account> accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public async void Add(Account account)
        {
            var res = await _accountRepository.InsertAsync(account);
        }
        public async void Delete(int id)
        {
            await _accountRepository.DeleteAsync(id);
        }

        public async Task<ListResultDto<AccountDto>> GetAll()
        {
            var tasks = await _accountRepository
                .GetAll()
                .OrderByDescending(t => t.CreationTime)
                .ToListAsync();

            return new ListResultDto<AccountDto>(
                ObjectMapper.Map<List<AccountDto>>(tasks)
            );
        }
    }
}
