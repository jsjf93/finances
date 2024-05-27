using Finances.Api.Domain.Enums;
using Finances.Data;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Finances.Api.Features.Transactions;

public record UpdateTransactionCommand(
    Guid Id,
    string Name,
    decimal Amount,
    DateOnly Date,
    int Frequency,
    FrequencyUnit FrequencyUnit
) : IRequest<Unit>;

[ApiController]
[Route("transaction")]
[Authorize]
public class UpdateExpenseController(ISender sender) : ControllerBase
{
    [HttpPut]
    public async Task<ActionResult> Update([FromBody] UpdateTransactionCommand command)
    {
        await sender.Send(command);

        return NoContent();
    }
}

public class UpdateTransactionCommandHandler(
    IHttpContextAccessor httpContextAccessor,
    ApplicationDbContext context
) : IRequestHandler<UpdateTransactionCommand, Unit>
{
    public async Task<Unit> Handle(
        UpdateTransactionCommand request,
        CancellationToken cancellationToken
    )
    {
        var email = httpContextAccessor.HttpContext?.User.Identity?.Name;

        var transaction = await context
            .Transactions.Include(e => e.User)
            .Where(e => e.User.Email == email)
            .SingleAsync(e => e.Id == request.Id, cancellationToken);

        transaction.Update(
            request.Name,
            request.Amount,
            request.Date,
            request.Frequency,
            request.FrequencyUnit
        );

        context.Transactions.Update(transaction);

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
