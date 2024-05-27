using Finances.Api.Features.Dtos;
using Finances.Data;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Finances.Api.Features.Transactions;

public record GetTransactionQuery(Guid Id) : IRequest<TransactionDto>;

[ApiController]
[Route("transaction/{id}")]
[Authorize]
public class GetTransactionController(ISender sender) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<TransactionDto>> Get([FromRoute] Guid id)
    {
        return Ok(await sender.Send(new GetTransactionQuery(id)));
    }
}

public class GetTransactionQueryHandler(
    IHttpContextAccessor httpContextAccessor,
    ApplicationDbContext context
) : IRequestHandler<GetTransactionQuery, TransactionDto>
{
    public async Task<TransactionDto> Handle(
        GetTransactionQuery request,
        CancellationToken cancellationToken
    )
    {
        var email = httpContextAccessor.HttpContext?.User.Identity?.Name;

        var transaction = await context
            .Transactions.Include(e => e.User)
            .Where(e => e.User.Email == email)
            .SingleAsync(e => e.Id == request.Id, cancellationToken);

        return new TransactionDto(
            transaction.Id,
            transaction.Name,
            transaction.Amount,
            transaction.StartingDate,
            transaction.Frequency,
            transaction.FrequencyUnit,
            transaction.Category
        );
    }
}
