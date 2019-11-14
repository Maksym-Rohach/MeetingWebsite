using MeetingWebsite.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Default.Home.ViewModels
{
    public class GetHomeUserModel
    {
        public string City { get; set; }
        public string Zodiac { get; set; }
         public string Avatar { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }
    public class GetListHomeModel
    {
        public List<GetHomeUserModel> GetHomeUserModel { get; set; }
    }
}