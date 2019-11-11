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
            var a = (DateTime.Now.Year * 100 + DateTime.Now.Month) * 100 + DateTime.Now.Day;
            GetListBoysModel result = new GetListBoysModel();
            result.CurrentPage = filter.CurrentPage;
            int CityId = -1;
            bool isCityIdParsed = int.TryParse(filter.CityId, out CityId);
            int ZodiacId = -1;
            bool isZodiacIdParsed= int.TryParse(filter.ZodiacId, out ZodiacId);
            var query = _context.UserProfile.AsQueryable();
            //int CityId = Convert.ToInt32(filter.CityId);
            //int ZodiacId = Convert.ToInt32(filter.ZodiacId);
            int Age = -1;
            bool isAgeParsed = int.TryParse(filter.Age, out Age);
            //int Age = Convert.ToInt32(filter.Age);
            if (isCityIdParsed)
            {
                if (CityId > 0)
                {
                    query = query.Where(x => x.CityId == CityId);
                }
            }
            if (isZodiacIdParsed)
            {
                if (ZodiacId > 0)
                {
                    query = query.Where(x => x.ZodiacId == ZodiacId);
                }
            }
            if(isAgeParsed)
            {
               
                if (Age > 0)
                {
                    query.Where(x => filter.Age == ((a - (x.DateOfBirth.Year * 100 + x.DateOfBirth.Month) * 100 + x.DateOfBirth.Day) / 10000).ToString());
                }
            }
            var today = DateTime.Today;

              


            List<GetBoysModel> boys = new List<GetBoysModel>();
            List<GetZodiac> GetZodiacs = new List<GetZodiac>();
            List<GetCity> GetCities = new List<GetCity>();

            var city = _context.City.AsQueryable().ToList();
            var zodiac = _context.Zodiac.AsQueryable().ToList();

            foreach (var item in city)
            {
                GetCities.Add(new GetCity {Value=item.Id.ToString(), Label=item.Name });
            }

            foreach(var item in zodiac)
            {
                GetZodiacs.Add(new GetZodiac { Value = item.Id.ToString(), Label = item.Name });
            }

            result.TotalCount = query.Count();

            boys = query
                    .Include(c => c.City)
                    .Where(u => u.GenderId == GenderId.Id && ((a - (u.DateOfBirth.Year * 100 + u.DateOfBirth.Month) * 100 + u.DateOfBirth.Day) / 10000)<int.Parse(filter.Age_to)&& ((a - (u.DateOfBirth.Year * 100 + u.DateOfBirth.Month) * 100 + u.DateOfBirth.Day) / 10000)>int.Parse(filter.Age_from))
                    .OrderBy(u => Guid.NewGuid())
                    .Take(10)
                    .Skip((filter.CurrentPage - 1) * 10)                 
                    .Select(u => new GetBoysModel
                    {
                        City = u.City.Name,
                        Status = "Status",
                        Age = (a - (u.DateOfBirth.Year * 100 + u.DateOfBirth.Month) * 100 + u.DateOfBirth.Day) / 10000,
                        Name = u.NickName,
                        Avatar = u.Avatar
                       
                        
                    })
                        .ToList();

                result.GetListBoys = boys;
            result.GetCities = GetCities;
            result.GetZodiacs = GetZodiacs;

                return Ok(result);
            }

    }
}