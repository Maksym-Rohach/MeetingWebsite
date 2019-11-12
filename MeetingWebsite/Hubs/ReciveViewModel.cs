using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Hubs
{
    public class ReceiveViewModel
    {
        [Required]
        [JsonProperty("datetime")]
        public DateTime DateTime { get; set; }
        [Required]
        [JsonProperty("tableuserid")]
        public int TableUserId { get; set; }
        [Required]
        [JsonProperty("ids")]
        public List<int> Ids { get; set; }
        [Required]
        [JsonProperty("counts")]
        public List<int> Counts { get; set; }
    }
}
