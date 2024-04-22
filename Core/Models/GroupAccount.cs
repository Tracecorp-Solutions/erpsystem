namespace Core.Models
{
    public class GroupAccount
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Behaviour { get; set; }

        public ICollection<Account> Accounts { get; set; } = new List<Account>();
    }
}
