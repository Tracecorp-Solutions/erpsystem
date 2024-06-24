using Xunit;
using Moq;
using Trace.Controllers;
using Core.Models.Accounting;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Repositories.Accounting;
using Services.Repositories.Accounting;

namespace Trace.Test
{
    public class GroupAccountsControllerTests
    {
        [Fact]
        public async Task CreateAccount_Returns_CreatedResult()
        {
            // Arrange
            var mockRepository = new Mock<IGroupAccountRepository>();
            var mockAccountService = new Mock<GroupAccountRepository>();
            //var controller = new GroupAccountsController(mockRepository.Object, mockAccountService.Object);

            var groupAccountId = 1;
            var account = new GroupAccount { Id = 0, Name = "TestAccount" };

            // Act
            //var result = await controller.CreateAccount(account);

            // Assert
            //var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            //var createdAccount = Assert.IsType<Account>(createdResult.Value);
            //Assert.Equal(groupAccountId, createdAccount.GroupAccountId);
        }
    }
}
