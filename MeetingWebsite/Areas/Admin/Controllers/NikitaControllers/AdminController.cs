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
            var models = _context.UserProfile.AsQueryable();
            UserTableModels utms = new UserTableModels();
            utms.Users = new List<UserTableModel>();
            foreach (var item in models)
            {
                UserTableModel utm = new UserTableModel();
                utm.Id = item.Id;
                utm.Nickname = item.NickName;
                utm.Registrdate = item.DateOfBirth.ToString("mmmm-dd-yyyy");
                string city = _context.City.FirstOrDefault(a => a.Id == item.CityId).Name;
                utm.City = city;
                utm.Status = "Не забанений";
                utms.Users.Add(utm);
           }
           return Ok(utms.Users);
        }
        [HttpPost("ban-list")]
        public ActionResult GetBanTable([FromBody] UserTableFilters filter)//доробити контролер
        {
            var models = _context.UserProfile.AsQueryable();
            UserTableModels utms = new UserTableModels();
            utms.Users = new List<UserTableModel>();
            foreach (var item in models)
            {
                UserTableModel utm = new UserTableModel();
                utm.Id = item.Id;
                utm.Nickname = item.NickName;
                utm.Registrdate = item.DateOfBirth.ToString("dd.MM.yyyy");
                utm.City = "Покусав собаку!";
                utm.Status = "Забанений";
                utms.Users.Add(utm);
            }
            return Ok(utms.Users);
        }
        [HttpPost("register")]
        public ActionResult GetRegistrationShedule()
        {
            var models = _context.UserProfile.AsQueryable();
            int JUN = models.Select(a => a).Where(a => a.DateOfBirth.Month == 9).Count();//доробити через цикл for замість числа- і 
            return Ok();
        }

    }
}