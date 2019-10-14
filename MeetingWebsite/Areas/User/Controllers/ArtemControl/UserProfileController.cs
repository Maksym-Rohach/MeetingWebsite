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
        public IActionResult GetUserProfile([FromBody]GetUserProfileModel model)
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
                    City = _context.City.Where(a=>a.Id == tmp.CityId).SingleOrDefault().Name,
                    Gender = _context.Gender.Where(a => a.Id == tmp.GenderId).SingleOrDefault().Type,
                    Zodiac = _context.Zodiac.Where(a => a.Id == tmp.ZodiacId).SingleOrDefault().Name,
                    Description = tmp.Description
                }
                );
        }
        [HttpPost("setprofile")]

        public void SetUserProfile([FromBody]UserProfileModel model)
        {
            var tmp = _context.UserProfile.Where(a => a.User.Id == model.Id).SingleOrDefault();
            tmp.NickName = model.NickName;
            tmp.CityId = _context.City.Where(a=> a.Name == model.City).SingleOrDefault().Id;
            tmp.GenderId = _context.Gender.Where(a => a.Type == model.Gender).SingleOrDefault().Id;
            tmp.Description = model.Description;
            _context.SaveChanges();
        }

    }
}