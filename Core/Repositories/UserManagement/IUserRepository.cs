using Core.DTOs.UserManagement;
using Core.Models.UserManagement;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories.UserManagement
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

        Task<IEnumerable<User>> GetUsersByRoleName(string rolename);

        Task AssignUserRole(AssignUserRoleDto assignUser);

        // get all users
        Task<IEnumerable<User>> GetAllUsers();

        Task<User> GetUserById(int userId);
    }
}
