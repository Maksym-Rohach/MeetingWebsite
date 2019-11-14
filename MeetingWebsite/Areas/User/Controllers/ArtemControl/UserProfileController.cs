using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MeetingWebsite.DAL.Entities;
using System.Linq.Expressions;
using MeetingWebsite.Areas.User.ViewModels;
using Microsoft.AspNetCore.Authorization;
using MeetingWebsite.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

namespace MeetingWebsite.Controllers.ArtemControl
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;

        public UserProfileController(EFDbContext context, IConfiguration configuration, IHostingEnvironment env)
        {
            _context = context;
            _configuration = configuration;
            _env = env;
        }
        
        [HttpGet("getprofile")]
        public IActionResult GetUserProfile()
        {
            
            var userid = (User.Claims.ToList()[0].Value).ToString();
            //var i = "fe623d77-2603-4787-99f6-e13337cc4083";
            var user = _context.UserProfile.SingleOrDefault(a => a.Id == userid);
            
            var birthDate = user.DateOfBirth;
            int age = DateTime.Now.Year - birthDate.Year;
            List<GetCityModel> GetCities = new List<GetCityModel>();

            var city = _context.City.AsQueryable().ToList();

            foreach (var item in city)
            {
                GetCities.Add(new GetCityModel { Value = item.Id.ToString(), Label = item.Name });
            }

            string path = $"{_configuration.GetValue<string>("UserUrlImages")}/300_";

            UserProfileModel model = new UserProfileModel()
            {
                NickName = user.NickName,
                Age = (birthDate > DateTime.Now.AddYears(-age)) ? age-- : age,
                City = _context.City.SingleOrDefault(a => a.Id == user.CityId).Name,
                Gender = _context.Gender.SingleOrDefault(a => a.Id == user.GenderId).Type,
                Zodiac = _context.Zodiac.SingleOrDefault(a => a.Id == user.ZodiacId).Name,
                Description = user.Description !=null? user.Description : "",
                Email = _context.Users.SingleOrDefault(a => a.Id == userid).Email,
                Cities = GetCities,
                Avatar = user.Avatar != "" ?
                    path + user.Avatar :
                    _configuration.GetValue<string>("UserUrlImages") +
                    "/300_" + _configuration.GetValue<string>("DefaultImage")
            };

            return Ok(model);
        }
        [HttpPost("setprofile")]

        public IActionResult ChangeUserProfile([FromBody]UserProfileModel model)
        {

            if (!ModelState.IsValid)
            {
                var errrors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errrors);
            }

            var userid = (User.Claims.ToList()[0].Value).ToString();
            // var i = "fe623d77-2603-4787-99f6-e13337cc4083";
            var user = _context.UserProfile.SingleOrDefault(a => a.User.Id == userid);

            string image = null;
           
                if (user != null)
                {
                string imageName = "";
                if (user.Avatar == "")
                {
                    imageName = Guid.NewGuid().ToString() + ".jpg";
                }
                else
                {
                    imageName = user.Avatar + ".jpg";
                }
                string pathSaveImages = InitStaticFiles
                               .CreateImageByFileName(_env, _configuration,
                                    new string[] { "ImagesPath", "ImagesPathUsers" },
                                    imageName,
                                    model.Avatar);
                    if (pathSaveImages != null)
                    {
                        image = imageName;
                        user.Avatar = image;
                        _context.SaveChanges();
                    }
                    else
                    {
                        image = user.Avatar;
                    }
                }

            //string imageName = user.Avatar ?? Guid.NewGuid().ToString() + ".jpg";
            //string path = $"{_configuration.GetValue<string>("UserUrlImages")}/600_";
            //string imagePath = image != null ?
            //    path + image :
            //    _configuration.GetValue<string>("UrlImages") +
            //    "300_" + _configuration.GetValue<string>("DefaultImage");
            //return Ok(imagePath);

            _context.Users.Where(a => a.Id == user.Id).SingleOrDefault().Email = model.Email;
            _context.Users.Where(a => a.Id == user.Id).SingleOrDefault().NormalizedEmail = model.Email.ToUpper();
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("change-image")]
        
        public IActionResult ChangeImage([FromBody]ChangeImageModel model)
        {
            string image = null;
            if (User.Identity.IsAuthenticated)
            {
                var userId = User.Claims.ToList()[0].Value.ToString();
                var user = _context.UserProfile.SingleOrDefault(c => c.Id == userId);
                if (user != null)
                {
                    string imageName = "";
                    if(user.Avatar == "")
                    {
                        imageName = Guid.NewGuid().ToString() + ".jpg";
                    }
                    else
                    {
                        imageName = user.Avatar  + ".jpg";
                    }
                    
                    string pathSaveImages = InitStaticFiles
                               .CreateImageByFileName(_env, _configuration,
                                    new string[] { "ImagesPath", "ImagesPathUsers" },
                                    imageName,
                                    model.Avatar);
                    if (pathSaveImages != null)
                    {
                        image = imageName;
                        user.Avatar = image;
                        _context.SaveChanges();
                    }
                    else
                    {
                        image = user.Avatar;
                    }
                }
            }

            string path = $"{_configuration.GetValue<string>("UserUrlImages")}/300_";
            string imagePath = image != "" ?
                path + image :
                _configuration.GetValue<string>("UrlImages") +
                "300_" + _configuration.GetValue<string>("DefaultImage");
            return Ok(imagePath);
        }

    }
}