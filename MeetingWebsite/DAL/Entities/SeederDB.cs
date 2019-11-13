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

                roleName = "Vip";
                result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;

            }
        }

        public static void GetRandomUserProfile(int num, UserManager<DbUser> userManager, EFDbContext context)
        {
            Random rnd = new Random();
            UserProfile up = new UserProfile();
            List<string> nicknames = new List<string> { "Машенька", "Катенька", "Оличка", "Оленка", "Валюша", "Никитка", "Вася", "Петя", "Уругвайская", "Ровенский", "Ровенская", "Любимка", "Карвари", "Мастер", "Господин", "ОРТЕМІЙ", "РОСТИСЛАВ", "Макс" };
            string email = "helloworld" + context.UserProfile.Count() + "@gmail.com";
            DateTime DateOfBirth = DateTime.Now.AddMonths(-num);
            int genderid = num % 2 == 0 ? 1 : 2;
            int cityid = rnd.Next(1, 21);
            int zodiacid = 5;
            string avatar = "";
            string roleName = "User";

            DbUser user = new DbUser() { Email = email, UserName = email, PhoneNumber = "+22(222)222-22-22" };

            up.Avatar = avatar;
            up.CityId = cityid;
            up.DateOfBirth = DateOfBirth;
            up.DateOfRegister = DateTime.Now;
            up.GenderId = genderid;
            up.NickName = nicknames[rnd.Next(0, 18)]+num;//18
            up.ZodiacId = zodiacid;
            up.User = user;
            up.Status = "Тестовий статус маленька дівчинка/хлопчик шкукає кохання";
            var result = userManager.CreateAsync(up.User, "Qwerty1-").Result;
            context.UserProfile.Add(up);
            context.SaveChanges();
            result = userManager.AddToRoleAsync(up.User, roleName).Result;
        }

        public static void SeedProfiles(UserManager<DbUser> userManager, EFDbContext context)
        {
            for (int i = 0; i < 12; i++)
            {
                GetRandomUserProfile(i, userManager, context);
            }


            if (userManager.FindByEmailAsync("kunderenko2@gmail.com").Result == null)
            {
                string email = "kunderenko2@gmail.com";
                string roleName = "Admin";

                var adminProfile = new AdminProfile
                {
                    Name = "Альоша",
                    // DateOfBirth = DateTime.Now,

                    User = new DbUser
                    {
                        Email = email,
                        UserName = email,
                        PhoneNumber = "+38(099)456-43-34"
                    }
                };

                var result = userManager.CreateAsync(adminProfile.User, "Qwerty1-").Result;
                context.AdminProfiles.Add(adminProfile);
                context.SaveChanges();
                result = userManager.AddToRoleAsync(adminProfile.User, roleName).Result;
            };
            // Адмін-юзер
            if (userManager.FindByEmailAsync("kaida.nikita@gmail.com").Result == null)
            {
                string email = "kaida.nikita@gmail.com";
                string roleName = "Admin";

                var adminProfile = new AdminProfile
                {
                    Name = "Нікіта",
                    // DateOfBirth = DateTime.Now,

                    User = new DbUser
                    {
                        Email = email,
                        UserName = email,
                        PhoneNumber = "+38(099)888-77-66"
                    }
                };

                

                    var result = userManager.CreateAsync(adminProfile.User, "Qwerty1+").Result;
                context.AdminProfiles.Add(adminProfile);
                context.SaveChanges();
                result = userManager.AddToRoleAsync(adminProfile.User, roleName).Result;
            };   // Адмін-юзер



            if (userManager.FindByEmailAsync("supernikd@gmail.com").Result == null)
            {
                string email = "supernikd@gmail.com";
                string roleName = "Admin";

                var adminProfile = new AdminProfile
                {
                    Name = "Nikd",
                    // DateOfBirth = DateTime.Now,

                    User = new DbUser
                    {
                        Email = email,
                        UserName = email,
                        PhoneNumber = "+38(097)233-08-77"
                    }
                };

                var result = userManager.CreateAsync(adminProfile.User, "Kaida007-").Result;
                context.AdminProfiles.Add(adminProfile);
                context.SaveChanges();
                result = userManager.AddToRoleAsync(adminProfile.User, roleName).Result;
            };

            if (userManager.FindByEmailAsync("masha@gmail.com").Result == null)
            {
                string email = "masha@gmail.com";
                string roleName = "User";

                var userProfile = new UserProfile
                {
                    NickName = "Маша",
                    DateOfBirth = DateTime.Now,
                    GenderId = 2,
                    CityId = 18,
                    ZodiacId = 7,
                    Avatar = "",
                    User = new DbUser
                    {
                        Email = email,
                        UserName = email,
                        PhoneNumber = "+33(333)333-33-33"
                    }
                };

                var result = userManager.CreateAsync(userProfile.User, "Qwerty1-").Result;
                context.UserProfile.Add(userProfile);
                context.SaveChanges();
                result = userManager.AddToRoleAsync(userProfile.User, roleName).Result;
            };
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

            if (count == 0)
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
            if (count == 0)
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




