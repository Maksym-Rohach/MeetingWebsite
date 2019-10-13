using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Template
{
    public class SearchUser
    {
        public int CityId { get; set; }
        public int CurrentPage { get; set; }
        public int GenderId { get; set; }
    }

    public class UserViewModel
    {
        public string Id { get; set; }
        public string NickName { get; set; }
        public string Phone { get; set; }
        public string DateOfBirth { get; set; }
        public string City { get; set; }
    }

    public class GetClientModel
    {
        public List<UserViewModel> Users { get; set; }
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
    }
}
