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
        public ActionResult GetUserTable([FromBody] UserTableFilters filter)
        {
            var models = _context.UserProfile.Select(a => a).Where(a => a.DateOfRegister.Year == filter.Year && a.DateOfRegister.Month == filter.Month).AsQueryable();
            if (filter.NickName!="")
            {
                models = models.Select(a => a).Where(a => a.NickName.Contains(filter.NickName));
            }
            UserTableModels utms = new UserTableModels();
            utms.Users = new List<UserTableModel>();
            foreach (var item in models)
            {
                UserTableModel utm = new UserTableModel();
                utm.Id = item.Id;
                utm.Nickname = item.NickName;
                utm.Registrdate = item.DateOfBirth.ToString("dd.MM.yyyy");
                string city = _context.City.FirstOrDefault(a => a.Id == item.CityId).Name;
                utm.City = city;
                utm.Status = "Не забанений";
                utms.Users.Add(utm);
           }
           return Ok(utms.Users);
        }
        [HttpPost("ban-list")]
        public ActionResult GetBanTable([FromBody] UserTableFilters filter)
        {
            var models = _context.UserAccessLocks.Select(a=>a).Where(a=>a.LockDate.Year==filter.Year&&a.LockDate.Month==filter.Month).AsQueryable();
            BanTableModels btms = new BanTableModels();
            btms.Bans = new List<BanTableModel>();
            foreach (var item in models)
            {
                BanTableModel btm = new BanTableModel();
                btm.Id = item.Id;
                btm.Nickname = _context.UserProfile.FirstOrDefault(a => a.Id == item.Id).NickName;
                btm.Bandate = item.LockDate.ToString("dd.MM.yyyy");
                btm.Description = item.Reason;
                btm.Status = "Забанений";
                btms.Bans.Add(btm);
            }
            return Ok(btms.Bans);
        }

        [HttpPost("shedule-register")]
        public ActionResult GetRegistrationShedule([FromBody] RegistrySheduleFilters filter)
        {
            var models = _context.UserProfile.AsQueryable();
            List<int> monthes = new List<int>();
            for (int i = 0; i < 12; i++)
            {
                monthes.Add(models.Select(a => a).Where(a => a.DateOfBirth.Month == i&& a.DateOfBirth.Year==filter.Year).Count());
            }
            return Ok(monthes);
        }

    }
}