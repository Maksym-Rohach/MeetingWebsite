using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Account.ViewModels;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MeetingWebsite.Helpers;
using MeetingWebsite.Services;
using Microsoft.EntityFrameworkCore;
using MeetingWebsite.Areas.Default.Home.ViewModels;

namespace MeetingWebsite.Areas.Default.Home.Controllers
{
    [Produces("application/json")]
    [Route("api/admin/[controller]")]
    public class TemplateController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private object filter;

        public TemplateController(EFDbContext context,
         UserManager<DbUser> userManager,
         SignInManager<DbUser> signInManager)

        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }

        [HttpPost("random")]
        public IActionResult Index()
        {

            GetListHomeModel result = new GetListHomeModel();
            var query = _context.UserProfile.AsQueryable();

            List <GetHomeUserModel> users = new List<GetHomeUserModel>();

            result.TotalCount = query.Count();

            users = query
                .OrderBy(u => Guid.NewGuid())
                .Select(u => new GetHomeUserModel
                {
                       Avatar = u.Avatar,
                       Name = u.NickName,
                        City = u.City.Name,
                        Status = "Status"
                })
                .ToList();

            result.GetHomeUserModel = users;

            return Ok(result);
        }
    }
}