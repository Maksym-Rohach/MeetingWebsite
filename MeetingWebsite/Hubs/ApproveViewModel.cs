using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Hubs
{
    public class ApproveViewModel
    {
        [JsonProperty("declinedids")]
        public List<int> DeclinedId { get; set; }
        [JsonProperty("userid")]
        public long UserId { get; set; }
    }
}
