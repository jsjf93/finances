import { months } from "../components/constants/months";
import { Expense } from "../types/expense";

export type ExpensesByMonth = {
  name: string;
  expenses: Array<{ id: string; name: string; cost: number; type: string }>;
  totalCost: number;
};

export function getExpensesByMonth(data: Array<Expense>, month: number) {
  const expensesByMonth = data.reduce(
    (acc, cur) => {
      if (
        (cur.frequency === "ANNUAL" && cur.monthTaken === month) ||
        cur.frequency === "MONTHLY"
      ) {
        return {
          name: months[month].slice(0, 3),
          expenses: [
            ...acc.expenses,
            { id: cur.name, name: cur.name, cost: cur.cost, type: cur.type },
          ],
          totalCost: acc.totalCost + cur.cost,
        };
      }

      return acc;
    },
    {
      name: "",
      expenses: [],
      totalCost: 0,
    } as ExpensesByMonth
  );

  return expensesByMonth;
}
