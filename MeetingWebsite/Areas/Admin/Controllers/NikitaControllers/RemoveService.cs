using MeetingWebsite.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Areas.Admin.Controllers.NikitaControllers
{
    public static class RemoveService
    {
        static public void RemoveVip(EFDbContext _context)
        {
            var query = _context.VipUsers.Select(a => a).Where(a => a.DateForValid < DateTime.Now).AsQueryable();
            foreach (var item in query)
            {
                _context.VipUsers.Remove(item);
            }
            _context.SaveChanges();
        }
    }
}
