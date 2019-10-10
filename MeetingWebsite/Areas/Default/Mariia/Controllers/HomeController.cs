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


namespace MeetingWebsite.Areas.Default.Mariia.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]

    public class HomeController : ControllerBase
    {
        private readonly EFDbContext _context;
        //private readonly UserManager<DbUser> _userManager;
        //private readonly SignInManager<DbUser> _signInManager;
        //private readonly IConfiguration _configuration;
        //private readonly IEmailSender _emailSender;
        //private readonly IFileService _fileService;
        //private readonly IJWTTokenService _tokenService;

        public HomeController(EFDbContext context)
        {
            _context = context;
        }

        //        [HttpPost("render")]
        //        public ActionResult<HomeRandomModel> HomeRandomModel { get => homeRandomModel; set => homeRandomModel = value; 
        //{}
    }
}