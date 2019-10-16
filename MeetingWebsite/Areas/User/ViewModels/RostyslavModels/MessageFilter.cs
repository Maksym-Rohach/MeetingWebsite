using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.User.ViewModels.RostyslavModels
{
    public class MessageFilter
    {
        public int From { get; set; }
        public int Count { get; set; }
        public Chat chat { get; set; }
        

    }
}
