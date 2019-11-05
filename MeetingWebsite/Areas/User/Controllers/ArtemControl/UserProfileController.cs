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
            var i = User.Claims.ToList()[0].Value.ToString();
            //var i = "6907f4f1-2b5c-4331-af10-7b2b1c0ff830";
            var tmp = _context.UserProfile.SingleOrDefault(a => a.Id == i);
            var birthDate = tmp.DateOfBirth;
            int age = DateTime.Now.Year - birthDate.Year;
            UserProfileModel model = new UserProfileModel()
            {
                NickName = tmp.NickName,
                Age = (birthDate > DateTime.Now.AddYears(-age)) ? age-- : age,
                City = _context.City.Where(a => a.Id == tmp.CityId).SingleOrDefault().Name,
                Gender = _context.Gender.Where(a => a.Id == tmp.GenderId).SingleOrDefault().Type,
                Zodiac = _context.Zodiac.Where(a => a.Id == tmp.ZodiacId).SingleOrDefault().Name,
                Description = tmp.Description,
                Email = _context.Users.SingleOrDefault(a => a.Id == i).Email
            };

            return Ok(model);
        }
        [HttpPost("setprofile")]

        public void SetUserProfile([FromBody]UserProfileModel model)
        {
            var i = User.Claims.ToList()[0].Value.ToString();
            //var i = "6907f4f1-2b5c-4331-af10-7b2b1c0ff830";
            var tmp = _context.UserProfile.Where(a => a.User.Id == i).SingleOrDefault();
            if(model.NickName!="")
                tmp.NickName = model.NickName;
            if (model.City != "")
                tmp.CityId = _context.City.Where(a=> a.Name == model.City).SingleOrDefault().Id;
            if (model.Description != "")
                tmp.Description = model.Description;
            if (model.Email != "")
                tmp.User.Email = model.Email;
            
            _context.SaveChanges();
        }

    }
}