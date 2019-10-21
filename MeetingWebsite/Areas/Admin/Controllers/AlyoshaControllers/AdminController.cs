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


       
    }
}
