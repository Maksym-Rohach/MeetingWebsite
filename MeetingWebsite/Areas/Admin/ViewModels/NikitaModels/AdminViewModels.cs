using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Account.ViewModels
{
    public class UserTableModel
    {
        public string Nickname { get; set; }
        public DateTime Registrdate { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
    }

    public class AdminTableModel
    {

    }
}
