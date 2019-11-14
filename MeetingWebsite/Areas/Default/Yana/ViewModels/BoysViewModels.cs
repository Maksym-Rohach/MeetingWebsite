using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Default.Yana.ViewModels
{
    public class BoysViewModels
    {
        public string ZodiacId { get; set; } = "default";
        public string Age { get; set; } = "default";
        public string Age_to { get; set; } = "default";
        public string Age_from { get; set; } = "default";
        public string Status { get; set; }  
        public string CityId { get; set; } = "default";
        public int CurrentPage { get; set; }
        public int GenderId { get; set; }
    }

    public class GetBoysModel
    {        
        public string Avatar { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public string Status { get; set; }
        
    }

    public class GetZodiac
    {
        public string Value { get; set; }
        public string Label { get; set; }
    }

    public class GetCity
    {
        public string Value { get; set; }
        public string Label { get; set; }
    }

    public class GetListBoysModel
    {
        public List<GetBoysModel> GetListBoys { get; set; }
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
        public List<GetZodiac> GetZodiacs { get; set; }
        public List<GetCity> GetCities { get; set; }
    }
}
