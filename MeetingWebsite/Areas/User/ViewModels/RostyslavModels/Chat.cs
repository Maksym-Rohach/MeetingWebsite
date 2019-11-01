using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.User.ViewModels.RostyslavModels
{
    public class Chat
    {
        public byte[] SenderPhoto { get; set; }
        public byte[] RecipientPhoto { get; set; }
        public string SenderName { get; set; }
        public string RecipientName { get; set; }
        public string SenderId { get; set; }
        public string RecipientId { get; set; }
    }
}
