import { ExpensesByMonth } from "../../utils/getExpensesByMonth";
import { months } from "../constants/months";

type Props = {
  expenses: ExpensesByMonth;
  month: number;
};

export function MonthlyOutgoings({ expenses, month }: Props) {
  return (
    <div>
      <h2>
        Outgoing in <b>{months[month]}</b>
      </h2>

      <div className="border rounded-lg overflow-hidden border-slate-200 w-full my-4">
        <table className="table-fixed w-full bg-slate-100">
          <thead>
            <tr>
              <th className="border-b font-medium px-4 py-1 text-slate-700 text-left">
                Name
              </th>
              <th className="border-b font-medium px-4 py-1 text-slate-700 text-left">
                Type
              </th>
              <th className="border-b font-medium px-4 py-1 text-slate-700 text-left">
                Cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {expenses.expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border-b border-slate-100 p-1 px-4 text-slate-500">
                  {expense.name}
                </td>
                <td className="border-b border-slate-100 p-1 px-4 text-slate-500">
                  {expense.type}
                </td>
                <td className="border-b border-slate-100 p-1 px-4 text-slate-500">
                  {expense.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="font-bold">
        Total: {parseFloat(String(expenses.totalCost)).toFixed(2)}
      </span>
    </div>
  );
}
