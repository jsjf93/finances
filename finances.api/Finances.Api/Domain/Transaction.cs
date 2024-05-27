using System.ComponentModel.DataAnnotations.Schema;
using Finances.Api.Domain.Base;
using Finances.Api.Domain.Enums;

namespace Finances.Api.Domain;

public class Transaction : Entity
{
    protected Transaction() { }

    public Transaction(
        string name,
        decimal amount,
        DateOnly date,
        int frequency,
        FrequencyUnit frequencyUnit,
        TransactionCategory category,
        string userId
    )
    {
        Name = name;
        Amount = amount;
        StartingDate = date;
        Frequency = frequency;
        FrequencyUnit = frequencyUnit;
        UserId = userId;
    }

    public string Name { get; private set; } = string.Empty;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Amount { get; private set; }
    public DateOnly StartingDate { get; private set; }
    public int Frequency { get; private set; }
    public FrequencyUnit FrequencyUnit { get; private set; }
    public TransactionCategory Category { get; private set; }

    public string UserId { get; set; } = default!;
    public User User { get; set; } = default!;

    public void Update(
        string name,
        decimal amount,
        DateOnly date,
        int frequency,
        FrequencyUnit frequencyUnit
    )
    {
        Name = name;
        Amount = amount;
        StartingDate = date;
        Frequency = frequency;
        FrequencyUnit = frequencyUnit;
    }
}
