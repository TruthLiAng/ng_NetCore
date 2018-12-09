using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ngDemo.MoneyAccountLog.Dto
{
    public class PagedResultRequestAccountLogDto : PagedResultRequestDto
    {
        public virtual int accountId { get; set; }
    }
}