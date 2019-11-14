﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    public class DbRole : IdentityRole<string>
    {
        public ICollection<DbUserRole> UserRoles { get; set; }
    }
}
