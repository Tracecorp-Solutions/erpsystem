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
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;
using System.ComponentModel.DataAnnotations;

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
            //attach token to user
            user.Token = tokenHandler.WriteToken(token);
            await _context.SaveChangesAsync();
            
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
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDTO.Email);
            if (user == null)
                throw new ArgumentException("Invalid Email Address");

            string uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (file != null)
            {
                // Check whether directory exists and create if it doesn't
                if (!Directory.Exists(uploadsDirectory))
                {
                    Directory.CreateDirectory(uploadsDirectory);
                }

                string filename = Guid.NewGuid() + Path.GetExtension(file.FileName);
                string filepath = Path.Combine(uploadsDirectory, filename);

                using (var stream = new FileStream(filepath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                user.ProfilePic = filepath;
            }

            if (!string.IsNullOrEmpty(userDTO.OrganizationName))
            {
                user.OrganisationId = await SaveAndReturnOrganisationIdAsync(userDTO.OrganizationName, userDTO.CountryOfOperation);
            }

            user.FullName = userDTO.FullName;
            user.Email = userDTO.Email;
            user.Title = userDTO.Title;
            user.PhoneNumber = userDTO.PhoneNumber;
            user.DateOfBirth = userDTO.DateOfBirth;
            user.Gender = userDTO.Gender;

            await _context.SaveChangesAsync();
            await LogActionAsync(user.Email, "User details updated");
        }

        private async Task<int> SaveAndReturnOrganisationIdAsync(string organisationName, string countryOfOperation)
        {
            var organisation = await _context.Organisations
                .FirstOrDefaultAsync(o => o.Name == organisationName && o.CountryOfOperation == countryOfOperation);

            if (organisation == null)
            {
                organisation = new Organisation
                {
                    Name = organisationName,
                    CountryOfOperation = countryOfOperation
                };
                _context.Organisations.Add(organisation);
                await _context.SaveChangesAsync();
            }

            return organisation.Id;
        }

        public async Task InviteUsers(InviteUserDto invitedUsersdto)
        {
            if (invitedUsersdto == null || !invitedUsersdto.Emails.Any())
                throw new ArgumentException("No users to invite");

            // Validate emails
            var invalidEmails = invitedUsersdto.Emails.Where(user => !new EmailAddressAttribute().IsValid(user)).ToList();
            if (invalidEmails.Any())
                throw new ArgumentException($"Invalid Email Addresses: {string.Join(", ", invalidEmails.Select(user => user))}");

            var organisationId = invitedUsersdto.OrganisationId;
            var roleId = invitedUsersdto.RoleId;

            // Check whether the organisation and role exist
            var organisationTask = _context.Organisations.FirstOrDefaultAsync(o => o.Id == organisationId);
            var roleTask = _context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);

            await Task.WhenAll(organisationTask, roleTask);
            var organisation = organisationTask.Result;
            var role = roleTask.Result;

            if (organisation == null)
                throw new ArgumentException("Organisation does not exist");

            if (role == null)
                throw new ArgumentException("Role does not exist");

            // Send invitation emails and save invited users
            List<InvitedUsers> invitedUsers = new List<InvitedUsers>(); 
            foreach (var email in invitedUsersdto.Emails)
            {
                await emailService.SendEmailAsync(email, "Invitation to join",
                    $"You have been invited to join {organisation.Name} under the role of {role.Name}");
                //map invited users
                var inviteduser = invitedUsersdto.Emails.Select(email => new InvitedUsers
                {
                    Email = email,
                    OrganisationId = organisationId,
                    RoleId = roleId,
                    Registered = false
                });

                invitedUsers.AddRange(inviteduser);
            }
            _context.InvitedUsers.AddRange(invitedUsers);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<InvitedUserLists>> GetInvitedUsersByOrganisationId(int organisationId) 
        {
            // get invited users by organisation id and group them by RoleId
            var invitedUsers = await _context.InvitedUsers
                .Where(i => i.OrganisationId == organisationId)
                .Include(i => i.Role)
                .GroupBy(i => i.RoleId)
                .ToListAsync();

            if (invitedUsers.Count == 0)
                throw new ArgumentException("No invited users found");

            // map users with group name inform of list
            return invitedUsers.Select(group => new InvitedUserLists
            {
                Role = group.First().Role.Name,
                Emails = group.Select(i => i.Email).ToList()
            });

        }

        public async Task<User> GetUserByTokenAsync(string token) 
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Token == token);
            if (user == null)
                throw new ArgumentException("Invalid Token");
            return user;
        }



    }
}
