using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Admin.Controllers.AyoshaControllers;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

 
                //arm.Registrdate = item.DateOfBirth;
                //string city = _context.City.FirstOrDefault(a => a.Id == item.CityId).Name;
                //urm.City = city;
                atm.Status = "Активный";
                //atms.Admins.Add(atm);
            }
            return Ok(atms.Admins);
        }

        [HttpPost("vips")] //UserTableFilters
        public ActionResult GetVipTable([FromBody] VipTableFilters filter)//()
        {
            // vtm - VipTableModel
            // vtms - VipTableModels

           // var models = _context.VipUsers.Select(a => a).Where(a => a.DateOfRegister.Year == filter.Year && a.DateOfRegister.Month == filter.Month).AsQueryable();
            var query = _context.VipUsers.Select(a => a).Where(a => a.DateForValid.Year == filter.Year && a.DateForValid.Month == filter.Month).AsQueryable();
            query = _context.VipUsers
                .Include(x => x.User)
                .AsQueryable();


            query = query.Select(a => a)
                .Where(a => a.DateForValid.Year == filter.Year && a.DateForValid.Month == filter.Month);
            if (!string.IsNullOrEmpty(filter.NickName))
            {

                query = query.Select(a => a).Where(a => a.User.NickName.Contains(filter.NickName));
            }

            VipTableModels vtms = new VipTableModels();
            vtms.Vips = new List<VipTableModel>();
            foreach (var item in query)
            {
                VipTableModel vtm = new VipTableModel();
                vtm.Id = item.Id;
                vtm.Nickname = item.User.NickName;
                vtm.DateForValid = item.DateForValid.ToString("MM.dd.yyyy");
                //vtm.Registrdate = item.DateOfBirth.ToString("dd.MM.yyyy");

                string city = _context.City.FirstOrDefault(a => a.Id == item.User.CityId).Name;
                vtm.City = city;
                //vtm.City = item.User.CityId;

                vtm.Status = "Активний";
                vtms.Vips.Add(vtm);
            }
            return Ok(vtms.Vips);
        }





    }
}
