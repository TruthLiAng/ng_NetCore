using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace ngDemo.Models
{
    public class AccountLog : Entity, IHasCreationTime, IAudited, ISoftDelete
    {
        public virtual int AccountId { get; set; }
        public virtual string Cause { get; set; }

        public virtual int Money { get; set; }

        public virtual string Memo { get; set; }

        public virtual DateTime CreationTime { get; set; }

        public long? CreatorUserId { get; set; }

        public long? LastModifierUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public bool IsDeleted { get; set; }
    }
}