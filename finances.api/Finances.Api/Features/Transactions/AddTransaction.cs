using Finances.Api.Domain.Enums;
using Finances.Data;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Transaction = Finances.Api.Domain.Transaction;

namespace Finances.Api.Features.Transactions;

public record AddTransactionCommand(
    string Name,
    decimal Amount,
    DateOnly Date,
    int Frequency,
    FrequencyUnit FrequencyUnit,
    TransactionCategory Category
) : IRequest<Guid>;

[ApiController]
[Route("transaction")]
[Authorize]
public class AddTransactionController(ISender sender) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> Create([FromBody] AddTransactionCommand command)
    {
        return await sender.Send(command);
    }
}

public class AddTransactionCommandHandler(
    IHttpContextAccessor httpContextAccessor,
    ApplicationDbContext context
) : IRequestHandler<AddTransactionCommand, Guid>
{
    public async Task<Guid> Handle(
        AddTransactionCommand request,
        CancellationToken cancellationToken
    )
    {
        var email = httpContextAccessor.HttpContext?.User.Identity?.Name;
        var user = await context
            .Users.Include(u => u.Transactions)
            .SingleAsync(u => u.Email == email, cancellationToken);

        var transaction = new Transaction(
            request.Name,
            request.Amount,
            request.Date,
            request.Frequency,
            request.FrequencyUnit,
            request.Category,
            user.Id
        );

        await context.Transactions.AddAsync(transaction);

        await context.SaveChangesAsync(cancellationToken);

        return transaction.Id;
    }
}
