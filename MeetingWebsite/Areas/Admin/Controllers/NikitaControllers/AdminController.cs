using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.Account.ViewModels;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeetingWebsite.Areas.Admin.Controllers.NikitaControllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly EFDbContext _context;

        public AdminController(EFDbContext context)
        {
            _context = context;
        }

        [HttpPost("users")]
        public ActionResult GetUserTable([FromBody] UserTableFilters filter)//полуробоче перевірити!!!!
        {
            int count_users = 5,minus=0;

            if (filter.CurrentPage==1)
            {
                minus = count_users;
            }
            var users = _context.UserProfile.Select(a => a).Where(a => a.DateOfRegister.Year == filter.Year && a.DateOfRegister.Month == filter.Month).Skip(filter.CurrentPage * count_users - minus).Take(count_users).AsQueryable();

            if (filter.NickName!="")
            {
                users = users.Select(a => a).Where(a => a.NickName.Contains(filter.NickName));
            }
            UserTableModels userTableModels = new UserTableModels();
            userTableModels.Users = new List<UserTableModel>();

            userTableModels.TotalCount = _context.UserProfile.Select(a => a).Where(a => a.DateOfRegister.Year == filter.Year && a.DateOfRegister.Month == filter.Month).AsQueryable().Count();
            foreach (var item in users)
            {
                var temp = _context.UserAccessLocks.Select(a => a).Where(a => item.Id == a.Id).AsQueryable();
                if (temp.Count()!=0)//проверка чи є бан
                {
                    userTableModels.TotalCount--;
                    continue;
                }

                UserTableModel userTableModel = new UserTableModel();
                userTableModel.Id = item.Id;
                userTableModel.Nickname = item.NickName;
                userTableModel.Registrdate = item.DateOfBirth.ToString("dd.MM.yyyy");
                string city = _context.City.FirstOrDefault(a => a.Id == item.CityId).Name;
                userTableModel.City = city;
                userTableModel.Status = "Не забанений";
                userTableModels.Users.Add(userTableModel);
           }
           return Ok(userTableModels);
        }
        [HttpPost("ban-list")]
        public ActionResult GetBanTable([FromBody] UserTableFilters filter)
        {
            int count_users = 5,minus = 0;

            if (filter.CurrentPage == 1)
            {
                minus = count_users;
            }

            var bans = _context.UserAccessLocks
                .Select(a=>a)
                .Where(a=>a.LockDate.Year==filter.Year&&a.LockDate.Month==filter.Month)
                .Skip(filter.CurrentPage * count_users - minus)
                .Take(count_users)
                .AsQueryable();

            if (filter.NickName != "")
            {
                bans = bans
                    .Select(a => a)
                    .Where(a => _context.UserProfile.FirstOrDefault(b => b.Id == a.Id).NickName.Contains(filter.NickName));
            }

            BanTableModels banTableModels = new BanTableModels();
            banTableModels.Bans = new List<BanTableModel>();
            banTableModels.TotalCount = _context.UserAccessLocks.Select(a => a).Where(a => a.LockDate.Year == filter.Year && a.LockDate.Month == filter.Month).AsQueryable().Count();

            foreach (var item in bans)
            {
                BanTableModel banTableModel = new BanTableModel();
                banTableModel.Id = item.Id;
                banTableModel.Nickname = _context.UserProfile.FirstOrDefault(a => a.Id == item.Id).NickName;
                banTableModel.Bandate = item.LockDate.ToString("dd.MM.yyyy");
                banTableModel.Description = item.Reason;
                banTableModel.Status = "Забанений";
                banTableModels.Bans.Add(banTableModel);
            }
            return Ok(banTableModels);
        }

        [HttpPost("banuser")]
        public ActionResult BanUser([FromBody] BanUserModel filter)
        {
            if (filter.Id==null)
            {
                return Ok();
            }
            UserAccessLock userAccessLock = new UserAccessLock();
            userAccessLock.Id = filter.Id;
            userAccessLock.Reason = filter.Description;
            userAccessLock.LockDate = DateTime.Now;
            _context.UserAccessLocks.Add(userAccessLock);
            _context.SaveChanges();
            return Ok(userAccessLock);
        }

        [HttpPost("unbanuser")]
        public ActionResult UnBanUser([FromBody] UnBanUserModel filter)
        {
            var temp = _context.UserAccessLocks.Remove(_context.UserAccessLocks.Select(a => a).FirstOrDefault(a => a.Id == filter.Id));
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("shedule-register")]
        public ActionResult GetRegistrationShedule([FromBody] RegistrySheduleFilters filter)
        {
            var data = _context.UserProfile.AsQueryable();
            List<int> monthes = new List<int>();
            for (int i = 0; i < 12; i++)
            {
                monthes.Add(data.Select(a => a).Where(a => a.DateOfBirth.Month == i&& a.DateOfBirth.Year==filter.Year).Count());
            }
            return Ok(monthes);
        }

    }
}