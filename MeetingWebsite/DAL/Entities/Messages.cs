using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    [Table("tblMessages")]
    public class Messages
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }

        public DateTime DateCreate { get; set; }
        public DateTime? DateRecipientRead { get; set; }

        [ForeignKey("UserSender")]
        public string SenderId { get; set; }
        public virtual UserProfile UserSender { get; set; }

        [ForeignKey("UserRecipient")]
        public string RecipientId { get; set; }
        public virtual UserRecipient UserRecipient { get; set; }
        public bool IsValide() {
            if ( this.RecipientId == null || this.SenderId == null || this.Text == null || this.Text.Count() == 0 || this.Text.Count() > 300 )
            {
                return false;
            }
            return true;
        }
    }
}
