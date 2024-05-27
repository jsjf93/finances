import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ExpensesByMonth } from "../../utils/getExpensesByMonth";

type Props = {
  expensesByMonth: ExpensesByMonth[];
};

export function ExpensesByMonthBarChart({ expensesByMonth }: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"} maxHeight={500}>
      <BarChart data={expensesByMonth}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="totalCost" />
      </BarChart>
    </ResponsiveContainer>
  );
}
