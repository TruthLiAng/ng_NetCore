using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using ngDemo.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ngDemo.MoneyAccount.Dto
{
    [AutoMapFrom(typeof(Account))]
    public class AccountDto:EntityDto, IHasCreationTime, IAudited, ISoftDelete
    {
        public virtual string Name { get; set; }

        public virtual int Money { get; set; }

        public virtual string Memo { get; set; }

        public virtual DateTime CreationTime { get; set; }

        public long? CreatorUserId { get; set; }

        public long? LastModifierUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public bool IsDeleted { get; set; }
    }
}
