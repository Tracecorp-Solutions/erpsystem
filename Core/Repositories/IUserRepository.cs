﻿using Core.DTOs;
using Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IUserRepository
    {
        Task<bool> CreateUserAsync(RegisterDto registerDto);
        Task<string> AuthenticateUserAsync(LoginDTo dTo);
        Task LogActionAsync(string username, string action);

        Task VerifyOtpAsync(OTPDto oTPDto);

        Task ChangePasswordAsync(ChangePwdDto changePwdDto);

        Task ResetPasswordAsync(string email);

        Task<UserDTO> GetUserDetailsByEmail(string email);

        Task UpdateUserDetails(IFormFile file, UserDTO userDTO);

        Task InviteUsers(InviteUserDto invitedUsersdto);

        Task<IEnumerable<InvitedUserLists>> GetInvitedUsersByOrganisationId(int organisationId);

        Task<User> GetUserByTokenAsync(string token);
    }
}
