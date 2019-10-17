using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    [Table("tblUserRecipients")]
    public class UserRecipient
    {
        [Key, ForeignKey("UserProfile")]
        public string Id { get; set; }

        public virtual UserProfile UserProfile { get; set; }

        public virtual ICollection<Messages> Messages { get; set; }

    }
}
