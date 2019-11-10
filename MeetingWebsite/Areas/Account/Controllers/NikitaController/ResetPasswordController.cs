using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Account.ViewModels.NikitaModels;
using MeetingWebsite.DAL.Entities;
using MeetingWebsite.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MeetingWebsite.Areas.Account.Controllers.NikitaController
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ResetPasswordController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly UserManager<DbUser> _userManager;

        public ResetPasswordController(UserManager<DbUser> userManager,SignInManager<DbUser> signInManager, EFDbContext context)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
        }



        [HttpPost("reset-pass")]
        public async Task<IActionResult> ChangePassword([FromBody] ResetPasswordFilters filter)
        {
            ResetPasswordModels resetPassModels = new ResetPasswordModels();

            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var user = _context.Users.FirstOrDefault(u => u.Email == filter.Email);
            if (user == null)
            {
                return BadRequest(new { invalid = "Користувача із вказаними обліковими даними не знайдено" });
            }

            var result1 = _signInManager
               .PasswordSignInAsync(user, filter.OldPass, false, false).Result;

            if (!result1.Succeeded)
            {
                return BadRequest(new { invalid = "Користувача із вказаним паролем не знайдено" });
            }

            var result = _signInManager
                .PasswordSignInAsync(user, filter.OldPass, false, false).Result;
            if (result.Succeeded)
            {
             var pass_res=  _userManager.ChangePasswordAsync(user, filter.OldPass, filter.NewPass).Result;
                if (pass_res.Succeeded)
                {
                    resetPassModels.Ok = true;
                    return Ok(resetPassModels);
                }
                else
                {
                    var errors = CustomValidator.GetErrorsByIdentityResult(pass_res);
                    return BadRequest(errors);
                }
            }
            return Ok(resetPassModels);
        }
    }
}