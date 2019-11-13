using System;
using System.Collections.Generic;
using System.Linq;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using MeetingWebsite.Areas.Default.Home.ViewModels;

namespace MeetingWebsite.Areas.Default.Home.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]

    public class HomeController : ControllerBase
    {
        private readonly EFDbContext _context;

        public HomeController(EFDbContext context)
        {
            _context = context;
        }

        [HttpGet("random")]
        public IActionResult Index()
        {
            GetListHomeModel result = new GetListHomeModel();
            List<GetHomeUserModel> users = new List<GetHomeUserModel>();
            var count = _context.UserProfile.Count();
            var D = (DateTime.Now.Year * 100 + DateTime.Now.Month) * 100 + DateTime.Now.Day;
            users = _context.UserProfile
                .AsQueryable()
                .Select(u => new GetHomeUserModel
                {
                    Avatar = u.Avatar,
                    Name = u.NickName,
                    City = u.City.Name,
                    Zodiac = u.Zodiac.Name,
                    Age = (D - (u.DateOfBirth.Year * 100 + u.DateOfBirth.Month) * 100 + u.DateOfBirth.Day) / 10000
                })
                .Where(a=>a.Avatar!=null)
                .OrderBy(u => Guid.NewGuid()).Take(8) 
                .ToList();
                result.GetHomeUserModel = users;

            return Ok(result);
        }
    }
}

