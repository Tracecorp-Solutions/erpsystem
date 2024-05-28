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
using System.Net.Mail;
using Core.DTOs;
using Microsoft.Extensions.Configuration;
using System.Net;
using Microsoft.AspNetCore.Http;

namespace Services.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly EmailService emailService;
        public UserRepository(ApplicationDbContext context, IPasswordHasher<User> passwordHasher, EmailService emailService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            this.emailService = emailService;
        }

        public async Task<bool> CreateUserAsync(RegisterDto registerDto)
        {
            var user = new User
            {
                FullName = registerDto.FullName,
                Email = registerDto.Email,
                Active = false,
                Verified = false
            };


            //generate one-time password
            var password = Guid.NewGuid().ToString().Substring(0, 8);
            user.PasswordHash = _passwordHasher.HashPassword(user, password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            await LogActionAsync(user.Email, "User created");
            //send password to user email
            await emailService.SendEmailAsync(user.Email, "Account Created", $"Your account has been created. Your OTP is {password}");
            return true;
        }

        public async Task VerifyOtpAsync(OTPDto oTPDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == oTPDto.Email);
            if (user == null)
                throw new ArgumentException("Invalid Email Address");

            if (_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, oTPDto.OTP) == PasswordVerificationResult.Failed)
                throw new ArgumentException("Invalid OTP");

            user.Verified = true;
            await _context.SaveChangesAsync();
            await LogActionAsync(user.Email, "User verified");
        }
        public async Task<string> AuthenticateUserAsync(LoginDTo loginDTo)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == loginDTo.Username);
            if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDTo.Password) == PasswordVerificationResult.Failed)
                throw new ArgumentException("Invalid Login Credentials"); 
            
            //generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("2387jkasdasd8232knsodjas9d023j23oadasodPASD23O2LASDP2O3KLKASMDPO23E2MASDIOWSDFSDFSDSDLKFSDKLFSDNFNASDIO2");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new System.Security.Claims.Claim[]
                {
                    new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);  
            await LogActionAsync(user.Email, "User authenticated");
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

        public async Task ChangePasswordAsync(ChangePwdDto changePwdDto) 
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == changePwdDto.Username);

            if (user == null || changePwdDto.NewPassord != changePwdDto.RepeatPassword)
                throw new ArgumentException("Invalid User or password do not match");

            if (!user.Verified)
                throw new ArgumentException("User has not been verified");

            user.PasswordHash = _passwordHasher.HashPassword(user, changePwdDto.RepeatPassword);
            await _context.SaveChangesAsync();
            await LogActionAsync(user.Email, "User Password updated");
        }

        public async Task ResetPasswordAsync(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
                throw new ArgumentException("Invalid Email Address");

            if (!user.Verified)
                throw new ArgumentException("User has not been verified");

            var password = Guid.NewGuid().ToString().Substring(0, 8);
            user.PasswordHash = _passwordHasher.HashPassword(user, password);
            await _context.SaveChangesAsync();
            await LogActionAsync(user.Email, "User password reset");
            await emailService.SendEmailAsync(user.Email, "Password Reset", $"Your password has been reset. Your new password is {password}");
        }

        public async Task<UserDTO> GetUserDetailsByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
                throw new ArgumentException("Invalid Email Address");

            return new UserDTO
            {
                Id = user.Id,
                Username = user.Email,
                FullName = user.FullName,
                Email = user.Email
            };
        }

        public async Task UpdateUserDetails(IFormFile file, UserDTO userDTO)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == userDTO.Email);
            if (user == null)
                throw new ArgumentException("Invalid Email Address");

            string filepath = null;
            if (file != null) 
            {
                //check whether directory exists
                if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "uploads")))
                {
                    Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "uploads"));
                }

                filepath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", userDTO.ProfilePic);

                //check if profile pic is uploaded
                if (userDTO.ProfilePic != null)
                {

                    if (!File.Exists(filepath))
                    {
                        //create a new file
                        using (var stream = new FileStream(filepath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                    }
                }
            }
            
            user.FullName = userDTO.FullName;
            user.Email = userDTO.Email;
            user.Title = userDTO.Title;
            user.PhoneNumber = userDTO.PhoneNumber;
            user.DateOfBirth = userDTO.DateOfBirth;
            user.ProfilePic = filepath;
            user.Gender = userDTO.Gender;
            await _context.SaveChangesAsync();
            await LogActionAsync(user.Email, "User details updated");
        }

    }
}
