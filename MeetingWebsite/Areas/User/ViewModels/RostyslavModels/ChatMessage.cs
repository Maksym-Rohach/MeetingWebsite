using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.User.ViewModels.RostyslavModels
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public DateTime SendTime { get; set; }
        public string Text { get; set; }
        public int SenderId { get; set; }
        public int PrewiewId { get; set; }
    }
}
