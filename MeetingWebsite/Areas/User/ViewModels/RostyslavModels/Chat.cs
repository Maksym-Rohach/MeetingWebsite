using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.User.ViewModels.RostyslavModels
{
    public class Chat
    {
        public string icon { get; set; } = "tim-icons icon-chart-pie-36";
        public string layout { get; set; } = "/user";
        public string name { get; set; }
        public string path { get; set; }
        public string SenderId { get; set; }
        public string RecipientId { get; set; }
        public int CountUnreaded { get; set; }
    }
}
