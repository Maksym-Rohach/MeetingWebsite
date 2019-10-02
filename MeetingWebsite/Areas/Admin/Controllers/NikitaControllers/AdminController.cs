using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Account.ViewModels;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeetingWebsite.Areas.Admin.Controllers.NikitaControllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly EFDbContext _context;

        public AdminController(EFDbContext context)
        {
            _context = context;
        }

        [HttpPost("users")]
        public ActionResult<UserTableModels> GetUserTable()
        {
            var models = _context.UserProfile.AsQueryable().Select(a => a).ToList();
            UserTableModels utms = new UserTableModels();
            var UsersModel = utms.Users;
            foreach (var item in models)
            {
                UserTableModel urm = new UserTableModel();
                urm.Id = item.Id;
                urm.Nickname = item.NickName;
                urm.Registrdate = item.DateOfBirth;
                string city = _context.City.FirstOrDefault(a => a.Id == item.CityId).Name;
                urm.City = city;
                urm.Status = "Не забанений";
                UsersModel.Add(urm);
           }
           return Ok(UsersModel);
        }
        [HttpPost("admins")]
        public IEnumerable<AdminProfile> GetAdminTable()
        {
            var models = _context.AdminProfiles.Select(a => a).ToList();
            
            return models;
        }
        [HttpPost("schedule-attendance")]
        public IEnumerable<DbUser> GetSctivitySchedule()
        {
            var models = _context.Users.Select(a => a);

            return models;
        }
    }
}