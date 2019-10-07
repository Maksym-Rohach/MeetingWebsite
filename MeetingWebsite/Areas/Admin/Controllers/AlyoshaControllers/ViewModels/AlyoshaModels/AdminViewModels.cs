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
    //public class UserTableModel
    //{
    //    public string Id { get; set; }
    //    public string Nickname { get; set; }
    //    public DateTime Registrdate { get; set; }
    //    public string City { get; set; }
    //    public string Status { get; set; }
    //}

    //public class UserTableModels
    //{
    //    public List<UserTableModel> Users { get; set; }
    //}


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



}
