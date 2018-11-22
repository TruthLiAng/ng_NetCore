using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using ngDemo.Models;
using ngDemo.MoneyAccount.Dto;

namespace ngDemo.MoneyAccount
{
    public class MoneyAccountAppService : AsyncCrudAppService<Account, AccountDto, int, PagedResultRequestDto, AccountDto, AccountDto>, IMoneyAccountAppService
    {
        private readonly IRepository<Account> _accountRepository;

        public MoneyAccountAppService(IRepository<Account> accountRepository) : base(accountRepository)
        {
            _accountRepository = accountRepository;
        }
    }
}
