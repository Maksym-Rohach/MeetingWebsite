using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.User.ViewModels.RostyslavModels
{
    public class ModelMessage
    {
        public string Text { get; set; }

        public DateTime? DateCreate { get; set; }
        public DateTime? DateRecipientRead { get; set; }
        public string SenderId { get; set; }
        public string RecipientId { get; set; }

    }
}
