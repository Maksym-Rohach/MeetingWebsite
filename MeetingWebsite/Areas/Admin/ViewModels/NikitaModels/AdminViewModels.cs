using MeetingWebsite.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Account.ViewModels
{
    public class UserTableModel
    {
        public string Id { get; set; }
        public string Nickname { get; set; }
        public DateTime Registrdate { get; set; }
        public string City { get; set; }
        public string Status { get; set; }
    }

    public class UserTableModels
    {
        public List<UserTableModel> Users { get; set; }
    }
    public class AdminTableModel
    {
        public string Nickname { get; set; }
        public string Status { get; set; }

    }
}
