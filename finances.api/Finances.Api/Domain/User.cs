using Microsoft.AspNetCore.Identity;

namespace Finances.Api.Domain;

public class User : IdentityUser
{
    public User() { }

    public ICollection<Transaction> Transactions { get; set; } = [];
}
