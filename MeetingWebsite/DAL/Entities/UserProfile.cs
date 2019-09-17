using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    public class UserProfile
    {
        [Key, ForeignKey("User")]
        public string Id { get; set; }

        [Required, StringLength(50)]
        public string NickName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [StringLength(256)]
        public string Description { get; set; }

        public string Image { get; set; }

        [ForeignKey("City")]
        [Required]
        public int CityId { get; set; }

        [ForeignKey("Gender")]
        [Required]
        public int GenderId { get; set; }

        [ForeignKey("Zodiac")]
        [Required]
        public int ZodiacId { get; set; }

        public virtual Zodiac Zodiac { get; set; }
        public virtual Gender Gender { get; set; }
        public virtual City City { get; set; }
        public virtual DbUser User { get; set; }

    }
}
