import { useMemo, useState } from "react";
import { Card } from "./components/Card";
import { Layout } from "./components/Layout";
import { months } from "./components/constants/months";
import { data } from "./components/constants/dummy";
import { getExpensesByMonth } from "./utils/getExpensesByMonth";
import { SummaryText } from "./components/expenses/SummaryText";
import useMutate from "./hooks/useMutate";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthlyIncome = 3550;
  const targetSavingsInPercent = 80;

  const monthlyBreakdowns = useMemo(
    () =>
      Object.keys(months).map((m) => {
        const expensesByMonth = getExpensesByMonth(data, +m);
        const remainingInMonth = monthlyIncome - expensesByMonth.totalCost;
        const funMoneyInPercent = (100 - targetSavingsInPercent) / 100;
        const funMoney =
          remainingInMonth * funMoneyInPercent > 400
            ? 400
            : remainingInMonth * 0.2;
        const targetSavings = remainingInMonth - funMoney;

        return {
          ...expensesByMonth,
          funMoney,
          targetSavings,
        };
      }),
    []
  );

  function handlePreviousMonth() {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      const currentMonth = newDate.getMonth();
      newDate.setMonth(currentMonth === 0 ? 11 : currentMonth - 1);

      return newDate;
    });
  }

  function handleNextMonth() {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      const currentMonth = newDate.getMonth();
      newDate.setMonth(currentMonth === 11 ? 0 : currentMonth + 1);

      return newDate;
    });
  }

  const { mutate: add } = useMutate({ endpoint: "transaction" });

  async function handleAddTranaction() {
    const body = JSON.stringify({
      name: "Test",
      amount: 100,
      category: 1,
      date: "2021-09-01",
      frequency: 1,
      frequencyUnit: 1,
    });

    try {
      await add({ body });
    } catch (error) {
      console.error(error);
    }
  }

  const { mutate: register } = useMutate({ endpoint: "register" });

  async function handleRegister() {
    const body = JSON.stringify({
      email: "test@test.com",
      password: "String1!",
    });

    try {
      await register({ body });
    } catch (error) {
      console.error(error);
    }
  }

  const { mutate: login } = useMutate({ endpoint: "login?useCookies=true" });

  async function handleLogin() {
    const body = JSON.stringify({
      email: "test@test.com",
      password: "String1!",
    });

    try {
      await login({ body });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleAddTranaction}>Add</button>

      <main>
        <div className="flex justify-center">
          <div className="flex gap-2 justify-between min-w-[320px]">
            <button
              className="p-2 rounded-lg bg-green-400 text-white text-sm"
              onClick={handlePreviousMonth}
            >
              {"<"}
            </button>
            <h1 className="font-bold text-2xl w-fit">{`${months[currentDate.getMonth()]}, ${currentDate.getFullYear()}`}</h1>
            <button
              className="p-2 rounded-lg bg-green-400 text-white text-sm"
              onClick={handleNextMonth}
            >
              {">"}
            </button>
          </div>
        </div>

        <div className="my-4 flex flex-wrap gap-4">
          <div className="w-full flex gap-4">
            <Card title="Summary">
              <SummaryText label="Income" value={monthlyIncome} />
              <SummaryText
                label="Expenses"
                value={monthlyBreakdowns[currentDate.getMonth()].totalCost}
              />
              <SummaryText
                label="Savings"
                value={monthlyBreakdowns[currentDate.getMonth()].targetSavings}
              />
              <SummaryText
                label="Fun"
                value={monthlyBreakdowns[currentDate.getMonth()].funMoney}
              />
            </Card>

            <Card title="Expenses">
              <p>Pie chart showing expenses in categories</p>
            </Card>
          </div>
          <div className="w-full md:max-w-[calc(50%-8px)] flex gap-4">
            <Card title="Upcoming expenses">
              <p>
                Bar chart showing expenses for previous, current and next two
                months
              </p>
            </Card>
          </div>
          <div className="w-full md:max-w-[calc(50%-8px)] flex gap-4">
            <Card title="Portfolio">
              <p>Pie chart showing current breakdown of portfolio</p>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default App;
