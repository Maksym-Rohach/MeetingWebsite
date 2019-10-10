using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.DAL.Entities
{
    public class SeederDB
    {

        public static void SeedRoles(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager)
        {
            var count = roleManager.Roles.Count();

            if (count <= 0)
            {
                var roleName = "Admin";

                var result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;

                roleName = "User";
                result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
            }
        }

        public static void SeedProfiles(UserManager<DbUser> userManager, EFDbContext context)
        {         

        }

        public static void SeedZodiacs(UserManager<DbUser> userManager, EFDbContext context)
        {
            string[] zodiacs = {"Овен", "Телець", "Близнята", "Рак", "Лев", "Діва", "Терези", "Скорпіон", "Стрілець",
                "Козоріг", "Водолій", "Риби" };

            var count = context.Zodiac.Count();

            if (count == 0)
            {
                foreach (var item in zodiacs)
                {
                    context.Add(new Zodiac
                    {
                        Name = item
                    });
                }

                context.SaveChanges();
            }

        }

        public static void SeedCities(UserManager<DbUser> userManager, EFDbContext context)
        {
            string[] cities = {"Вінниця‎", "Дніпро", "Донецьк", "Житомир", "Запоріжжя", "Івано-Франківськ", "Київ",
                               "Кропивницький", "Луганськ", "Луцьк", "Львів", "Миколаїв", "Одеса", "Полтава", "Рівне",
                               "Суми", "Тернопіль", "Ужгород", "Харків", "Херсон", "Хмельницький", "Черкаси",
                               "Чернівці", "Чернігів"};

            var count = context.City.Count();

            if(count==0)
            {
                foreach (var item in cities)
                {
                    context.Add(new City
                    {
                        Name = item
                    });
                    context.SaveChanges();
                }             
            }           
        }

        public static void SeedGenders(UserManager<DbUser> userManager, EFDbContext context)
        {
            var count = context.Gender.Count();
            if(count==0)
            {
                var gender1 = new Gender()
                {                 
                    Type = "Man"
                };
                var gender2 = new Gender()
                {                
                    Type = "Woman"
                };
                context.Gender.AddRange(new List<Gender>
                {
                    gender1,
                    gender2
                });
            }
            context.SaveChanges();
        }

        public static void SeedData(IServiceProvider services, IHostingEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFDbContext>();
                //var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();
                SeederDB.SeedRoles(manager, managerRole);                
                SeederDB.SeedGenders(manager, context);
                SeederDB.SeedCities(manager, context);
                SeederDB.SeedZodiacs(manager, context);
                SeederDB.SeedProfiles(manager, context);
            }
        }
    }
}
