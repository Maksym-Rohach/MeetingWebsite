using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    public class VipUsers
    {
        [Key, ForeignKey("User")]
        public string Id { get; set; }

        [Required]
        public DateTime DateForValid { get; set; }

        public virtual DbUser User { get; set; }
    }
}
