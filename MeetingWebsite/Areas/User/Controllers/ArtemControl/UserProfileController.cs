using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MeetingWebsite.DAL.Entities;
using System.Linq.Expressions;
using MeetingWebsite.Areas.User.ViewModels;
using MeetingWebsite.Areas.User.ViewModels.ArtemModels;

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
        
        [HttpPost("getprofile")]
        public IActionResult GetUserProfile(GetUserProfileModel model)
        {
            var tmp = _context.UserProfile.Where(a => a.User.Email == model.Email).SingleOrDefault();
            //if (tmp == null)
            //{
            //    return new UserProfileModel { Description = _context.UserProfile.Count().ToString() };
            //}
            var birthDate = tmp.DateOfBirth;
            int age = DateTime.Now.Year - birthDate.Year;
            return Ok(
                new UserProfileModel()
                {
                    NickName = tmp.NickName,
                    Age = (birthDate > DateTime.Now.AddYears(-age)) ? age-- : age,
                    City = tmp.City.Name,
                    Gender = tmp.Gender.Type,
                    Zodiac = tmp.Zodiac.Name,
                    Description = tmp.Description
                }
                );
        }
        [HttpPost("setprofile")]

        public void SetUserProfile(string Id, UserProfileModel model)
        {
            var tmp = _context.UserProfile.Where(a => a.User.Id == Id).SingleOrDefault();
            tmp.NickName = model.NickName;
            tmp.City = _context.City.Where(a=> a.Name == model.City).SingleOrDefault();
            tmp.Gender = _context.Gender.Where(a => a.Type == model.Gender).SingleOrDefault();
            tmp.Zodiac = _context.Zodiac.Where(a => a.Name == model.Zodiac).SingleOrDefault();
            tmp.Description = model.Description;
        }

    }
}