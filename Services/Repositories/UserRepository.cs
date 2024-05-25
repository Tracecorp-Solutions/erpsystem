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
            await SendEmailAsync(user.Email, "Account Created", $"Your account has been created. Your OTP is {password}");
            return true;
        }
        public async Task<string> AuthenticateUserAsync(LoginDTo loginDTo)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == loginDTo.Username);
            if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDTo.Password) == PasswordVerificationResult.Failed)
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

        private async Task SendEmailAsync(string email, string subject, string message)
        {
            var mailMessage = new MailMessage();
            mailMessage.To.Add(email);
            mailMessage.Subject = subject;
            mailMessage.Body = message;
            mailMessage.IsBodyHtml = true;
            mailMessage.From = new MailAddress("traceerp@tracecorpsolutions.com");
            using (var client = new SmtpClient("mail.@tracecorpsolutions.com"))//("smtp.gmail.com"))
            {
                client.Port = 465;//587;
                client.Credentials = new System.Net.NetworkCredential("traceerp@tracecorpsolutions.com", "TraceCorpInnovate");
                //client.EnableSsl = true;
                await client.SendMailAsync(mailMessage);
            }

            //using (MimeMessage emailMessage = new MimeMessage())
            //{
            //    MailboxAddress emailFrom = new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail);
            //    emailMessage.From.Add(emailFrom);
            //    MailboxAddress emailTo = new MailboxAddress(mailData.EmailToName, mailData.EmailToId);
            //    emailMessage.To.Add(emailTo);

            //    // you can add the CCs and BCCs here.
            //    //emailMessage.Cc.Add(new MailboxAddress("Cc Receiver", "cc@example.com"));
            //    //emailMessage.Bcc.Add(new MailboxAddress("Bcc Receiver", "bcc@example.com"));

            //    emailMessage.Subject = mailData.EmailSubject;

            //    BodyBuilder emailBodyBuilder = new BodyBuilder();
            //    emailBodyBuilder.TextBody = mailData.EmailBody;

            //    emailMessage.Body = emailBodyBuilder.ToMessageBody();
            //    //this is the SmtpClient from the Mailkit.Net.Smtp namespace, not the System.Net.Mail one
            //    using (SmtpClient mailClient = new SmtpClient())
            //    {
            //        await mailClient.ConnectAsync(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            //        await mailClient.AuthenticateAsync(_mailSettings.UserName, _mailSettings.Password);
            //        await mailClient.SendAsync(emailMessage);
            //        await mailClient.DisconnectAsync(true);
            //    }
            //}
        }
    }
}
