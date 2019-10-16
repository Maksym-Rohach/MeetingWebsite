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
using System.Globalization;

namespace MeetingWebsite.Areas.Account.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly IConfiguration _configuration;
        //private readonly IEmailSender _emailSender;
        //private readonly IFileService _fileService;
        private readonly IJWTTokenService _tokenService;

        public AccountController(EFDbContext context,
           UserManager<DbUser> userManager,
           SignInManager<DbUser> signInManager,
           IConfiguration configuration,
           //IFileService fileService,
           IJWTTokenService tokenService)
          // IEmailSender emailSender)
          
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
            _configuration = configuration;
            //_emailSender = emailSender;
            //_fileService = fileService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if(user == null)
            {
                return BadRequest(new { invalid = "Користувача із вказаними обліковими даними не знайдено" });
            }

            var result =  _signInManager
                .PasswordSignInAsync(user, model.Password, false, false).Result;

            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Користувача із вказаними обліковими даними не знайдено" });
            }

            // var block = _context.UserAccessLocks.FirstOrDefault(u => u.Id == user.Id);
            //if (block != null)
            //{
            //    return BadRequest(new { invalid = "Нажаль Вас Заблоковано" });
            //}

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(
               new
               {
                   token = _tokenService.CreateToken(user),
                   refToken = _tokenService.CreateRefreshToken(user)
               });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {


            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user != null)
            {
                return BadRequest(new { invalid = "Електронна адреса вже використовується" });

             
            }

            var str = "";



            DateTime model_date = DateTime.Parse(model.DateOfBirth);
            if (model_date.Month>=2 && model_date.Day >=21)         //дописать по числам
            {   str = "Овен";
            }
            else if (model_date.Month <= 3 && model_date.Day <= 20)         
            {
                str = "Овен";
            }
           else if (model_date.Month >= 3 && model_date.Day >= 21)         
            {
                str = "Телець";
            }
            else if (model_date.Month <= 4 && model_date.Day <= 21)
            {
                str = "Телець";
            }
            else if (model_date.Month >= 4 && model_date.Day >= 22)         
            {
                str = "Близнята";
            }
            else if (model_date.Month <= 5 && model_date.Day <= 21)
            {
                str = "Близнята";
            }
            else if (model_date.Month >= 5 && model_date.Day >= 22)
            {
                str = "Рак";
            }
            else if (model_date.Month <= 6 && model_date.Day <= 22)
            {
                str = "Рак";
            }
            else if (model_date.Month >= 6 && model_date.Day >= 23)
            {
                str = "Лев";
            }
            else if (model_date.Month <= 7 && model_date.Day <= 23)
            {
                str = "Лев";
            }
            else if (model_date.Month >= 7 && model_date.Day >= 24)
            {
                str = "Діва";
            }
            else if (model_date.Month <= 8 && model_date.Day <= 22)
            {
                str = "Діва";
            }
            else if (model_date.Month >= 8 && model_date.Day >= 23)
            {
                str = "Терези";
            }
            else if (model_date.Month <= 9 && model_date.Day <= 23)
            {
                str = "Терези";
            }
            else if (model_date.Month >= 9 && model_date.Day >= 24)
            {
                str = "Скорпіон";
            }
            else if (model_date.Month <= 10 && model_date.Day <= 22)
            {
                str = "Скорпіон";
            }
            else if (model_date.Month >= 10 && model_date.Day >= 23)
            {
                str = "Стрілець";
            }
            else if (model_date.Month <= 11 && model_date.Day <= 21)
            {
                str = "Стрілець";
            }
            else if (model_date.Month >= 11 && model_date.Day >= 22)
            {
                str = "Козоріг";
            }
            else if (model_date.Month <= 0 && model_date.Day <= 20)
            {
                str = "Козоріг";
            }
            else if (model_date.Month >= 0 && model_date.Day >= 21)
            {
                str = "Водолій";
            }
            else if (model_date.Month <= 1 && model_date.Day <= 20)
            {
                str = "Водолій";
            }
            else if (model_date.Month >= 1 && model_date.Day >= 21)
            {
                str = "Риби";
            }
            else if (model_date.Month <= 2 && model_date.Day <= 20)
            {
                str = "Риби";
            }







            var zodiacid = _context.Zodiac.FirstOrDefault(z => z.Name == str);


            var newuser = new UserProfile()
            {
                DateOfRegister = DateTime.Now,
                NickName = model.NickName,
                //DateOfBirth =Convert.ToDateTime(model.DateOfBirth),
                DateOfBirth = DateTime.ParseExact(model.DateOfBirth, "dd.MM.yyyy", CultureInfo.InvariantCulture),
                //User=new DbUser(),
                //ZodiacId=zodiacid,
                //CityId=

            };

            var gender = new Gender()
            {
                Type = model.Gender,

            };


             user = new DbUser()
            {

                UserName = model.Email,
                Email = model.Email,
                //User = model.User,
            };




            var roleName = "User";

            var result = _userManager.CreateAsync(user, model.Password).Result;
            result = _userManager.AddToRoleAsync(user, roleName).Result;

          



            if (!result.Succeeded)
            {
                var errors = CustomValidator.GetErrorsByIdentityResult(result);
                return BadRequest(errors);
            }



            await _signInManager.SignInAsync(user, isPersistent: false);




            return Ok(
               new
               {
                   token = _tokenService.CreateToken(user),
                   refToken = _tokenService.CreateRefreshToken(user)
               });


            //создать юзера  




            var result2 = _signInManager
                .PasswordSignInAsync(user, model.Password, false, false).Result;

            if (!result2.Succeeded)
            {
                return BadRequest(new { invalid = "Користувача із вказаними обліковими даними не знайдено" });
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(
                 new
                 {
                     token = _tokenService.CreateToken(user),
                     refToken = _tokenService.CreateRefreshToken(user)
                 }
                );


        }

        [HttpPost("refresh/{refreshToken}")]
        public IActionResult RefreshToken([FromRoute]string refreshToken)
        {

            var _refreshToken = _context.RefreshToken
                .Include(u => u.User)
                .SingleOrDefault(m => m.Token == refreshToken);

            if (_refreshToken == null)
            {
                return NotFound("Refresh token not found");
            }

            _refreshToken.Token = Guid.NewGuid().ToString();
            _context.RefreshToken.Update(_refreshToken);
            _context.SaveChanges();

            return Ok(
            new
            {
                token = _tokenService.CreateToken(_refreshToken.User),
                refToken = _refreshToken.Token
            });
        }
    }
}