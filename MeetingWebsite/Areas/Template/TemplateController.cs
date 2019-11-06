using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MeetingWebsite.Areas.Template
{
    [Produces("application/json")]
    [Route("api/admin/[controller]")]
    public class TemplateController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;

        public TemplateController(EFDbContext context,
         UserManager<DbUser> userManager,
         SignInManager<DbUser> signInManager)

        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }

        [HttpPost("search")]
        public IActionResult SearchClient([FromBody] SearchUser filter)
        {
            
            GetClientModel result = new GetClientModel();
            result.CurrentPage = filter.CurrentPage;
            var query = _context.UserProfile.AsQueryable();            

            if (filter.GenderId > 0)
            {                                  
                    query = query.Where(x => x.GenderId == filter.GenderId);
                           
            }

            if (filter.CityId > 0)
            {
                query = query.Where(x => x.CityId == filter.CityId);

            }

            List<UserViewModel> users = new List<UserViewModel>();

            result.TotalCount = query.Count();

            users = query
                    .Include(c => c.City)
                    .OrderBy(u=>u.Id)                    
                    .Skip((filter.CurrentPage - 1) * 10)
                    .Take(10)
                    .Select(u=>new UserViewModel
                    {
                        Id = u.Id,
                        DateOfBirth = u.DateOfBirth.ToString("dd.MM.yyyy"),
                        NickName = u.NickName,
                        Phone = u.User.PhoneNumber,
                        City = u.City.Name
                    })
                    .ToList();

            result.Users = users;


          


            return Ok(result);
        }
    }
}