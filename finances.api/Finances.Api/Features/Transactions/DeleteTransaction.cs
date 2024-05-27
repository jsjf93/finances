using Finances.Data;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Finances.Api.Features.Transactions;

public record DeleteTransactionCommand(Guid Id) : IRequest<Unit>;

[ApiController]
[Route("transaction")]
[Authorize]
public class DeleteTransactionController(ISender sender) : ControllerBase
{
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] Guid id)
    {
        await sender.Send(new DeleteTransactionCommand(id));

        return NoContent();
    }
}

public class DeleteTransactionCommandHandler(
    IHttpContextAccessor httpContextAccessor,
    ApplicationDbContext context
) : IRequestHandler<DeleteTransactionCommand, Unit>
{
    public async Task<Unit> Handle(
        DeleteTransactionCommand request,
        CancellationToken cancellationToken
    )
    {
        var email = httpContextAccessor.HttpContext?.User.Identity?.Name;

        var transaction = await context
            .Transactions.Include(e => e.User)
            .Where(e => e.User.Email == email)
            .SingleAsync(e => e.Id == request.Id, cancellationToken);

        context.Transactions.Remove(transaction);

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
