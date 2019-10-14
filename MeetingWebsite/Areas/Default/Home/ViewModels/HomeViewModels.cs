using MeetingWebsite.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Default.Home.ViewModels
{
       public class HomeViewModels
        {
            public int CityId { get; set; }
            public int CurrentPage { get; set; }
        }

        public class GetHomeUserModel
        {
            public string Avatar { get; set; }
            public string Name { get; set; }
            public int Age { get; set; }
            public string City { get; set; }
            public string Status { get; set; }
        }
        public class GetListHomeModel
        {
            public List<GetHomeUserModel> GetHomeUserModel { get; set; }
            public int TotalCount { get; set; }
            public int CurrentPage { get; set; }
        }
}

