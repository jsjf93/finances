using Finances.Api.Domain.Enums;

namespace Finances.Api.Features.Dtos;

public record TransactionDto(
    Guid Id,
    string Name,
    decimal Amount,
    DateOnly StartingDate,
    int Frequency,
    FrequencyUnit FrequencyUnit,
    TransactionCategory Category
);
