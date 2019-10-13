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
    [Route("api/[controller]")]

    public class HomeController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly IConfiguration _configuration;
        //private readonly IFileService _fileService;       

        public HomeController(EFDbContext context,
           UserManager<DbUser> userManager,
           SignInManager<DbUser> signInManager,
           IConfiguration configuration
        //IFileService fileService,      
        )

        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
            _configuration = configuration;
            //_fileService = fileService;
        }
        [HttpPost("home_user")]
        public async Task<IActionResult> Users([FromBody]HomeViewModels filter)//model
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var GenderId = _context.Gender.Where(x => x.Type == "Man").SingleOrDefault();

            GetListHomeUserModel result = new GetListHomeUserModel();
            result.CurrentPage = filter.CurrentPage;
            var query = _context.UserProfile.AsQueryable();

            if (filter.CityId > 0)
            {
                query = query.Where(x => x.CityId == filter.CityId);
            }

            if (filter.ZodiacId > 0)
            {
                query = query.Where(x => x.ZodiacId == filter.ZodiacId);
            }

            List<GetHomeUserModel> users = new List<GetHomeUserModel>();
            result.TotalCount = query.Count();
            users = query
                    .Include(c => c.City)
                    .OrderBy(u => u.Id)
                    .Skip((filter.CurrentPage - 1) * 10)
                    .Take(10)
                    .Select(u => new GetHomeUserModel
                    {

                        City = u.City.Name,
                        Status = "Status",
                        Age = 18,
                        Name = u.NickName,
                        Avatar = u.Avatar

                    })
                        .ToList();

            //result.GetListBoys = boys;

            return Ok(result);
        }

    }
}