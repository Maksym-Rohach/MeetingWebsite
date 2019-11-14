using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Account.ViewModels;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


    namespace MeetingWebsite.Areas.Admin.Controllers.AyoshaControllers
{
    

    public class AdminTableModel
    {
        public string Nickname { get; set; }
        public string Status { get; set; }
        public string Id { get; set; }
    }
    public class AdminTableModels
    {
        public List<AdminTableModel> Admins { get; set; }
    }

    public class VipTableModel
    {
        public string Id { get; set; }
        public string Nickname { get; set; }
        public string DateForValid { get; set; }
        public string City { get; set; }
        public string Status { get; set; }
    }

    public class VipTableModels
    {
        public List<VipTableModel> Vips { get; set; }
        public int TotalCount { get; set; }
    }

    public class VipTableFilters
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public string NickName { get; set; }
        public int CurrentPage { get; set; }
    }


}
