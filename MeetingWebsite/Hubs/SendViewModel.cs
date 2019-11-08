using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Hubs
{
    public class SendViewModel
    {
        [JsonProperty("ids")]
        public List<int> Ids { get; set; }
        [JsonProperty("counts")]
        public List<int> Counts { get; set; }
        [JsonProperty("datetime")]
        public DateTime DateTime { get; set; }
        [JsonProperty("userid")]
        public long UserId { get; set; }
        [JsonProperty("userfirstname")]
        public string UserFirstName { get; set; }
        [JsonProperty("tablenumber")]
        public int TableNumber { get; set; }

    }
}

