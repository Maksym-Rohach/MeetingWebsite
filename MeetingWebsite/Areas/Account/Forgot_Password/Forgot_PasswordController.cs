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

namespace MeetingWebsite.Areas.Account.Forgot_Password
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class Forgot_PasswordController : ControllerBase
    {

        private readonly EFDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly IConfiguration _configuration;
        //private readonly IEmailSender _emailSender;
        //private readonly IFileService _fileService;
        private readonly IJWTTokenService _tokenService;

        public Forgot_PasswordController(EFDbContext context,
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


        [HttpPost("forgot_password")]
        public async Task<IActionResult>Forgot_Password([FromBody]Forgot_PasswordViewModel model)
        {



            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return BadRequest(new { invalid = "Користувача із вказаними обліковими даними не знайдено" });
            }

            //var result = _signInManager
            //    .PasswordSignInAsync(user, model.Password, false, false).Result;

            //if (!result.Succeeded)
            //{
            //    return BadRequest(new { invalid = "Користувача із вказаними обліковими даними не знайдено" });
            //}

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


    }
}