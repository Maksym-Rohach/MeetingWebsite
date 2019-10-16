using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Default.Yana.ViewModels;
using MeetingWebsite.DAL.Entities;
using MeetingWebsite.Helpers;
using MeetingWebsite.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace MeetingWebsite.Areas.Default.Yana.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    
    public class BoysController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly IConfiguration _configuration;        
        //private readonly IFileService _fileService;       

        public BoysController(EFDbContext context,
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
        [HttpPost("boys")]
        public async Task<IActionResult> Boys([FromBody]BoysViewModels filter)//model
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var GenderId = _context.Gender.Where(x => x.Type == "Man").SingleOrDefault();
                       
            GetListBoysModel result = new GetListBoysModel();
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



            var today = DateTime.Today;

            var a = (today.Year * 100 + today.Month) * 100 + today.Day;        


            List<GetBoysModel> boys = new List<GetBoysModel>();

            result.TotalCount = query.Count();

            boys = query
                    .Include(c => c.City)
                    .OrderBy(u => u.Id)
                    .Skip((filter.CurrentPage - 1) * 10)
                    .Take(10)
                    .Select(u => new GetBoysModel
                    {
                        City = u.City.Name,
                        Status = "Status",
                        Age =(a-(u.DateOfBirth.Year * 100 + u.DateOfBirth.Month) * 100 + u.DateOfBirth.Day)/10000,
                        Name = u.NickName,
                        Avatar = u.Avatar
                    })
                        .ToList();

                result.GetListBoys = boys;

                return Ok(result);
            }

    }
}