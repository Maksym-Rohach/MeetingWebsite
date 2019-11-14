using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MeetingWebsite.Services
{

    public interface IJWTTokenService
    {
        string CreateToken(DbUser user);
        string CreateRefreshToken(DbUser user);
    }

    public class JWTTokenService : IJWTTokenService
    {
        private readonly EFDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<DbUser> _userManager;


        public JWTTokenService(EFDbContext context,
        IConfiguration configuration,
            UserManager<DbUser> userManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }     

        public string CreateToken(DbUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            var claims = new List<Claim>();

            var result_admin = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (result_admin != null)
            {
                string name = "АДМIН";

                claims = new List<Claim>()
                {
                     new Claim("id", result_admin.Id.ToString()),
                     new Claim("name", name),
                     new Claim("image", "default-image.jpg"),
                };

                foreach (var role in roles)
                {
                    claims.Add(new Claim("roles", role));
                }
            }

            var result_client = _context.UserProfile.FirstOrDefault(u => u.Id == user.Id);
            if (result_client != null)
            {
                string name = result_client.NickName;
                   
                string image = result_client.Avatar;
                if (image == null)
                    image = _configuration.GetValue<string>("DefaultImage");
                claims = new List<Claim>()
                {
                     new Claim("id", result_client.Id.ToString()),
                     new Claim("name", name),
                     new Claim("image", image)
                };
                foreach (var role in roles)
                {
                    claims.Add(new Claim("roles", role));
                }
            }          

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MeetingWebsite jklhkljhkl fgfkjgj"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                claims: claims,
                expires: DateTime.Now.AddDays(1));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public string CreateRefreshToken(DbUser user)
        {
            var _refreshToken = _context.RefreshToken
               .SingleOrDefault(m => m.Id == user.Id);
            if (_refreshToken == null)
            {
                RefreshToken t = new RefreshToken
                {
                    Id = user.Id,
                    Token = Guid.NewGuid().ToString()
                };
                _context.RefreshToken.Add(t);
                _context.SaveChanges();
                _refreshToken = t;
            }
            else
            {
                _refreshToken.Token = Guid.NewGuid().ToString();
                _context.RefreshToken.Update(_refreshToken);
                _context.SaveChanges();
            }
            return _refreshToken.Token;
        }
    }
}
