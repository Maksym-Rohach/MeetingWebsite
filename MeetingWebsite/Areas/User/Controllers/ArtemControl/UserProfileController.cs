using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MeetingWebsite.DAL.Entities;
using System.Linq.Expressions;
using MeetingWebsite.Areas.User.ViewModels;

namespace MeetingWebsite.Controllers.ArtemControl
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly EFDbContext _context;

        public UserProfileController(EFDbContext context)
        {
            _context = context;
        }
        
        [HttpGet("getprofile")]
        public IActionResult GetUserProfile()
        {
            //var i = User.Claims.ToList()[0].Value.ToString();
            var i = "fe623d77-2603-4787-99f6-e13337cc4083";
            var tmp = _context.UserProfile.SingleOrDefault(a => a.Id == i);
            var birthDate = tmp.DateOfBirth;
            int age = DateTime.Now.Year - birthDate.Year;
            List<GetCityModel> GetCities = new List<GetCityModel>();

            var city = _context.City.AsQueryable().ToList();

            foreach (var item in city)
            {
                GetCities.Add(new GetCityModel { Value = item.Id.ToString(), Label = item.Name });
            }


            UserProfileModel model = new UserProfileModel()
            {
                NickName = tmp.NickName,
                Age = (birthDate > DateTime.Now.AddYears(-age)) ? age-- : age,
                City = _context.City.SingleOrDefault(a => a.Id == tmp.CityId).Name,
                Gender = _context.Gender.SingleOrDefault(a => a.Id == tmp.GenderId).Type,
                Zodiac = _context.Zodiac.SingleOrDefault(a => a.Id == tmp.ZodiacId).Name,
                Description = tmp.Description,
                Email = _context.Users.SingleOrDefault(a => a.Id == i).Email,
                Cities = GetCities
            };

            return Ok(model);
        }
        [HttpPost("setprofile")]

        public IActionResult ChangeUserProfile([FromBody]UserProfileModel model)
        {
            //var i = User.Claims.ToList()[0].Value.ToString();
            var i = "fe623d77-2603-4787-99f6-e13337cc4083";
            var tmp = _context.UserProfile.SingleOrDefault(a => a.User.Id == i);
            tmp.NickName = model.NickName;
            tmp.CityId = _context.City.SingleOrDefault(a => a.Name == model.City).Id;
            tmp.Description = model.Description;
            _context.Users.Where(a => a.Id == tmp.Id).SingleOrDefault().Email = model.Email;
            _context.Users.Where(a => a.Id == tmp.Id).SingleOrDefault().NormalizedEmail = model.Email.ToUpper();
            _context.SaveChanges();
            return Ok();
        }

    }
}