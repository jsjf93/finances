using Finances.Api.Features.Dtos;
using Finances.Data;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Finances.Api.Features.Transactions;

public record GetTransactionsQuery : IRequest<IEnumerable<TransactionDto>>;

[ApiController]
[Route("transaction")]
[Authorize]
public class GetTransactionsController(ISender sender) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransactionDto>>> Get()
    {
        return Ok(await sender.Send(new GetTransactionsQuery()));
    }
}

public class GetTransactionsQueryHandler(
    IHttpContextAccessor httpContextAccessor,
    ApplicationDbContext context
) : IRequestHandler<GetTransactionsQuery, IEnumerable<TransactionDto>>
{
    public async Task<IEnumerable<TransactionDto>> Handle(
        GetTransactionsQuery request,
        CancellationToken cancellationToken
    )
    {
        var email = httpContextAccessor.HttpContext?.User.Identity?.Name;

        var transactions = await context
            .Transactions.Include(e => e.User)
            .Where(e => e.User.Email == email)
            .ToListAsync(cancellationToken);

        return transactions.Select(e => new TransactionDto(
            e.Id,
            e.Name,
            e.Amount,
            e.StartingDate,
            e.Frequency,
            e.FrequencyUnit,
            e.Category
        ));
    }
}
