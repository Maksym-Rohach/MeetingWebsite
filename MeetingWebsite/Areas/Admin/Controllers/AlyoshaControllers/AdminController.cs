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
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly EFDbContext _context;

        public AdminController(EFDbContext context)
        {
            _context = context;
        }

        [HttpPost("Admins")]
        public ActionResult<AdminTableModels> GetUserTable()
        {
            var models = _context.UserProfile.AsQueryable();
            AdminTableModels atms = new AdminTableModels();
            atms.Admins = new List<AdminTableModel>();
            foreach (var item in models)
            {
                AdminTableModel atm = new AdminTableModel();
                atm.Id = item.Id;
                atm.Nickname = item.NickName;
                atm.Status = "Активный";
                atms.Admins.Add(atm);
            }
            return Ok(atms.Admins);
        }      
    }
}
