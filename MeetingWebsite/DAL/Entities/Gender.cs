using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    public class Gender
    {
        [Key]
        public int Id { get; set; }

        public string Type { get; set; }

    }
}
