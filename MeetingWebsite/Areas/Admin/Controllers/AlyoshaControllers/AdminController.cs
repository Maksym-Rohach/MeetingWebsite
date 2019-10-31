using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Admin.Controllers.AyoshaControllers;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeetingWebsite.Areas.Admin.Controllers.AlyoshaControllers
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

        [HttpPost("admins")]
        //public ActionResult<AdminTableModels> GetUserTable()
        public ActionResult GetAminTable()

        {
            var models = _context.AdminProfiles.AsQueryable();
            AdminTableModels atms = new AdminTableModels();
            atms.Admins = new List<AdminTableModel>();
            foreach (var item in models)
            {
                AdminTableModel atm = new AdminTableModel();
                atm.Id = item.Id;
                atm.Nickname = item.Name;
                //urm.Registrdate = item.DateOfBirth;
                //string city = _context.City.FirstOrDefault(a => a.Id == item.CityId).Name;
                //urm.City = city;
                // atm.Status = "Активный";
                atms.Admins.Add(atm);
            }
            return Ok(atms.Admins);
        }

        //[HttpPost("vips")] //UserTableFilters
        //public ActionResult GetUserTable([FromBody] VipTableModel filter)
        //{
        //    var models = _context.UserProfile.Select(a => a).Where(a => a.DateOfRegister.Year == filter.Year && a.DateOfRegister.Month == filter.Month).AsQueryable();
        //    if (filter.NickName != "")
        //    {
        //        models = models.Select(a => a).Where(a => a.NickName.Contains(filter.NickName));
        //    }
        //    VipTableModels utms = new VipTableModels();
        //    utms.Vips = new List<VipTableModels>();
        //    foreach (var item in models)
        //    {
        //        VipTableModel utm = new VipTableModel();
        //        utm.Id = item.Id;
        //        utm.Nickname = item.NickName;
        //        //utm.Registrdate = item.DateOfBirth.ToString("dd.MM.yyyy");
        //        string city = _context.City.FirstOrDefault(a => a.Id == item.CityId).Name;
        //        utm.City = city;
        //        utm.Status = "Активний";
        //        //utms.Users.Add(utm);
        //    }
        //    return Ok(utms.Vips);
        //}






    }
}
