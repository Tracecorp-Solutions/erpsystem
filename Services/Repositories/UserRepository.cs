using Core.Models;
using Core.Repositories;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace Services.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        public UserRepository(ApplicationDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<bool> CreateUserAsync(UserDTO userdto, string password)
        {
            var user = new User
            {
                Username = userdto.Username,
                FullName = userdto.FullName,
                OrganizationName = userdto.OrganizationName,
                Email = userdto.Email
            };
            user.PasswordHash = _passwordHasher.HashPassword(user, password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            await LogActionAsync(user.Username, "User created");
            return true;
        }
        public async Task<string> AuthenticateUserAsync(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password) == PasswordVerificationResult.Failed)
                throw new ArgumentException("Invalid Login Credentials"); 
            
            //generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("supersecret");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new System.Security.Claims.Claim[]
                {
                    new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);  
            await LogActionAsync(user.Username, "User authenticated");
            return tokenHandler.WriteToken(token);
        }

        

        public async Task LogActionAsync(string username, string action)
        {
            var audit = new AuditTrail
            {
                Action = action,
                Username = username,
                Timestamp = DateTime.Now
            };
           _context.AuditTrails.Add(audit);
            await _context.SaveChangesAsync();
        }
    }
}
