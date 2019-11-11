using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Account.ViewModels.NikitaModels
{
    public class UserModalFilters
    {
        public string Id { get; set; }
    }
    public class UserModalModel
    {
        public string NickName { get; set; }
        public string Gender { get; set; }
        public string Birthday { get; set; }
        public string Avatar { get; set; }
        public string Zodiac { get; set; }
        public string City { get; set; }
        public string Status { get; set; }

    }
}
