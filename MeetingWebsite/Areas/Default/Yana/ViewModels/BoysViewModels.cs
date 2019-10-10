using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Default.Yana.ViewModels
{
    public class BoysViewModels
    {
        //public string Zodiac { get; set; }
        public int ZodiacId { get; set; }
        public int Age { get; set; }
        public string Status { get; set; }  
        public int CityId { get; set; }
        public int CurrentPage { get; set; }
        public int GenderId { get; set; }
    }

    public class GetBoysModel
    {
        //photo
        public string Name { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public string Status { get; set; }
    }

    public class GetListBoysModel
    {
        public List<GetBoysModel> GetListBoys { get; set; }
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
    }
}
