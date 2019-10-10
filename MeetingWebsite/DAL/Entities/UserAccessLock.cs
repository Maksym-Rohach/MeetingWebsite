using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    public class UserAccessLock
    {
        [Key, ForeignKey("User")]
        public string Id { get; set; }

        /// <summary>
        /// Дата блокування доступу
        /// </summary>
        public DateTime LockDate { get; set; }

        /// <summary>
        /// Причина блокування доступу
        /// </summary>
        [StringLength(1000)]
        public string Reason { get; set; }

        public virtual DbUser User { get; set; }
    }
}
