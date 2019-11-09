using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Account.ViewModels.NikitaModels
{
    public class ResetPasswordModels
    {
        public bool Ok { get; set; }
    }
    public class ResetPasswordFilters
    {
        public string Email { get; set; }
        public string OldPass { get; set; }
        public string NewPass { get; set; }

    }

}
