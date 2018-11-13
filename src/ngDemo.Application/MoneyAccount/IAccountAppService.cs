using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ngDemo.Models;
using ngDemo.MoneyAccount.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ngDemo.MoneyAccount
{
    interface IAccountAppService: IApplicationService
    {
        Task<ListResultDto<AccountDto>> GetAll();

        void Add(Account account);

        void Delete(int id);
    }
}
