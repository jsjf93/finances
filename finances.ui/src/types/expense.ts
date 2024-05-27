export type Expense = {
  id: string;
  name: string;
  cost: number;
  type: string;
  frequency: Frequency;
  monthTaken?: number;
};

export type Frequency = "MONTHLY" | "ANNUAL";
