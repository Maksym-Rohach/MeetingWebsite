using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.User.ViewModels
{
    public class UserProfileModel
    {
        public string NickName { get; set; }
        public string Description { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public string Zodiac { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public List<GetCityModel> Cities { get; set; }

    }

    public class GetCityModel
    {
        public string Value { get; set; }
        public string Label { get; set; }
    }

    public class ChangeImageModel
    {
        public string Avatar { get; set; }
    }

}
