import { useMemo, useState } from "react";
import { Expense } from "../types/expense";
import { MonthlyOutgoings } from "./expenses/MonthlyOutgoings";
import { getExpensesByMonth } from "../utils/getExpensesByMonth";
import { roundCost } from "../utils/roundCost";
import { months } from "./constants/months";
import { ExpensesByMonthBarChart } from "./expenses/ExpensesByMonthBarChart";

const data: Array<Expense> = [
  {
    id: "d48ee716-52a1-4b0f-b78e-6d5ebf414a53",
    name: "Mortgage",
    type: "BILLS",
    cost: 399.42,
    frequency: "MONTHLY",
  },
  {
    id: "a3c68a81-7d1e-45c4-9b35-8d2b4d7d68e9",
    name: "Energy",
    type: "BILLS",
    cost: 158.84,
    frequency: "MONTHLY",
  },
  {
    id: "b2f13287-9515-4e29-9db9-53080b4d59ec",
    name: "Water",
    type: "BILLS",
    cost: 57,
    frequency: "MONTHLY",
  },
  {
    id: "4d22b647-14e5-47b4-b8c4-0f4c5d95e8a3",
    name: "Council tax",
    type: "BILLS",
    cost: 167,
    frequency: "MONTHLY",
  },
  {
    id: "e8e1d87a-623f-40a3-bbd7-82a00f7c1a4e",
    name: "Broadband",
    type: "BILLS",
    cost: 55,
    frequency: "MONTHLY",
  },
  {
    id: "9db7cb79-72fc-426d-b37b-8a1e63f26b43",
    name: "Mobile",
    type: "BILLS",
    cost: 26.14,
    frequency: "MONTHLY",
  },
  {
    id: "8cd20e0c-4515-4914-9507-0b5c19e7c109",
    name: "Playstation",
    type: "SUBSCRIPTION",
    cost: 10.99,
    frequency: "MONTHLY",
  },
  {
    id: "bc2f38f1-9368-4f8c-9622-d12b0889bade",
    name: "iCloud",
    type: "SUBSCRIPTION",
    cost: 2.99,
    frequency: "MONTHLY",
  },
  {
    id: "764e3ae5-2f4a-41e5-81ef-f8c45e3475d5",
    name: "Meds",
    type: "HEALTH",
    cost: 10,
    frequency: "MONTHLY",
  },
  {
    id: "764e3ae5-2f4a-41e5-81ef-f8c45e3475d8",
    name: "Haircut",
    type: "HEALTH",
    cost: 15,
    frequency: "MONTHLY",
  },
  {
    id: "764e3ae5-2f4a-41e5-81ef-f8c45e3475d3",
    name: "Gym",
    type: "HEALTH",
    cost: 54,
    frequency: "MONTHLY",
  },
  {
    id: "8fc4be13-f8e4-44cf-bac3-f9ee31f352c0",
    name: "Cats",
    type: "PETS",
    cost: 25,
    frequency: "MONTHLY",
  },
  {
    id: "92947d90-3a11-42a9-ae76-242d1b14dc76",
    name: "Fuel/train",
    type: "TRAVEL",
    cost: 250,
    frequency: "MONTHLY",
  },
  {
    id: "c9254fa9-1c6b-4a19-b0b3-899e54042d8a",
    name: "Estate charges",
    type: "BILLS",
    cost: 234.99,
    frequency: "ANNUAL",
    monthTaken: 0,
  },
  {
    id: "c3b34e61-4794-4ee0-8247-36fc35ccf12e",
    name: "Garage fee",
    type: "BILLS",
    cost: 40,
    frequency: "ANNUAL",
    monthTaken: 11,
  },
  {
    id: "a3dcbf0b-7265-4922-aee0-408dece27217",
    name: "Brown bin",
    type: "BILLS",
    cost: 62,
    frequency: "ANNUAL",
    monthTaken: 3,
  },
  {
    id: "ee1d7022-ba8a-4d8b-b454-9f0e61cc5876",
    name: "Home insurance",
    type: "BILLS",
    cost: 300,
    frequency: "ANNUAL",
    monthTaken: 0,
  },
  {
    id: "e1aef3f9-8373-4965-9e9b-2e0e1ac18fe9",
    name: "Car insurance",
    type: "MOTORING",
    cost: 600,
    frequency: "ANNUAL",
    monthTaken: 4,
  },
  {
    id: "3fa90b1b-64a6-43c2-97d1-4337c69abae8",
    name: "Car service",
    type: "MOTORING",
    cost: 400,
    frequency: "ANNUAL",
    monthTaken: 10,
  },
  {
    id: "a7914f22-8360-4a07-88d8-c7a7f52adbbf",
    name: "Other car maintenance",
    type: "MOTORING",
    cost: 50,
    frequency: "MONTHLY",
  },
  {
    id: "8ab431a1-2068-4634-9536-53d7fe7f3e9c",
    name: "Boiler",
    type: "BILLS",
    cost: 85,
    frequency: "ANNUAL",
    monthTaken: 7,
  },
  {
    id: "0c60b5f3-7ac3-47c7-a7a1-94cf5ed1f3d7",
    name: "Road tax",
    type: "MOTORING",
    cost: 240,
    frequency: "ANNUAL",
    monthTaken: 10,
  },
  {
    id: "e6782cd3-9fc4-4940-8d15-f5b7387f80ed",
    name: "MOT",
    type: "MOTORING",
    cost: 50,
    frequency: "ANNUAL",
    monthTaken: 10,
  },
];

const data2: Array<Expense> = [
  {
    id: "d48ee716-52a1-4b0f-b78e-6d5ebf414a53",
    name: "Electricity",
    type: "BILLS",
    cost: 89.99,
    frequency: "MONTHLY",
  },
  {
    id: "a3c68a81-7d1e-45c4-9b35-8d2b4d7d68e9",
    name: "Gas",
    type: "BILLS",
    cost: 75.25,
    frequency: "MONTHLY",
  },
  {
    id: "b2f13287-9515-4e29-9db9-53080b4d59ec",
    name: "Internet",
    type: "BILLS",
    cost: 49.99,
    frequency: "MONTHLY",
  },
  {
    id: "4d22b647-14e5-47b4-b8c4-0f4c5d95e8a3",
    name: "Phone",
    type: "BILLS",
    cost: 45,
    frequency: "MONTHLY",
  },
  {
    id: "e8e1d87a-623f-40a3-bbd7-82a00f7c1a4e",
    name: "Netflix",
    type: "SUBSCRIPTION",
    cost: 12.99,
    frequency: "MONTHLY",
  },
  {
    id: "9db7cb79-72fc-426d-b37b-8a1e63f26b43",
    name: "Spotify",
    type: "SUBSCRIPTION",
    cost: 9.99,
    frequency: "MONTHLY",
  },
  {
    id: "8cd20e0c-4515-4914-9507-0b5c19e7c109",
    name: "Gym",
    type: "HEALTH",
    cost: 30,
    frequency: "MONTHLY",
  },
  {
    id: "bc2f38f1-9368-4f8c-9622-d12b0889bade",
    name: "Vet",
    type: "HEALTH",
    cost: 150,
    frequency: "ANNUAL",
    monthTaken: 6,
  },
  {
    id: "764e3ae5-2f4a-41e5-81ef-f8c45e3475d5",
    name: "Dog food",
    type: "PETS",
    cost: 40,
    frequency: "MONTHLY",
  },
  {
    id: "92947d90-3a11-42a9-ae76-242d1b14dc76",
    name: "Train pass",
    type: "TRAVEL",
    cost: 120,
    frequency: "MONTHLY",
  },
  {
    id: "c9254fa9-1c6b-4a19-b0b3-899e54042d8a",
    name: "Estate charges",
    type: "BILLS",
    cost: 234.99,
    frequency: "ANNUAL",
    monthTaken: 0,
  },
  {
    id: "c3b34e61-4794-4ee0-8247-36fc35ccf12e",
    name: "Garage fee",
    type: "BILLS",
    cost: 40,
    frequency: "ANNUAL",
    monthTaken: 11,
  },
  {
    id: "a3dcbf0b-7265-4922-aee0-408dece27217",
    name: "Brown bin",
    type: "BILLS",
    cost: 62,
    frequency: "ANNUAL",
    monthTaken: 3,
  },
  {
    id: "ee1d7022-ba8a-4d8b-b454-9f0e61cc5876",
    name: "Home insurance",
    type: "BILLS",
    cost: 300,
    frequency: "ANNUAL",
    monthTaken: 0,
  },
  {
    id: "e1aef3f9-8373-4965-9e9b-2e0e1ac18fe9",
    name: "Car insurance",
    type: "MOTORING",
    cost: 600,
    frequency: "ANNUAL",
    monthTaken: 4,
  },
  {
    id: "3fa90b1b-64a6-43c2-97d1-4337c69abae8",
    name: "Car service",
    type: "MOTORING",
    cost: 400,
    frequency: "ANNUAL",
    monthTaken: 10,
  },
  {
    id: "a7914f22-8360-4a07-88d8-c7a7f52adbbf",
    name: "Other car maintenance",
    type: "MOTORING",
    cost: 50,
    frequency: "MONTHLY",
  },
];

export function Expenses() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const monthlyIncome = 3660;
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

  function previousMonth() {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  }

  function nextMonth() {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  }

  return (
    <div>
      <h1 className="font-bold text-4xl">Breakdown</h1>

      <div className="flex gap-2 my-2">
        <button
          className="rounded-lg bg-slate-500 cursor-pointer text-white px-4 py-2"
          onClick={previousMonth}
        >
          Previous
        </button>
        <button
          className="rounded-lg bg-slate-500 cursor-pointer text-white px-4 py-2"
          onClick={() => setCurrentMonth(new Date().getMonth())}
        >
          Current month
        </button>
        <button
          className="rounded-lg bg-slate-500 cursor-pointer text-white px-4 py-2"
          onClick={nextMonth}
        >
          Next
        </button>
      </div>

      <div className="flex flex-row">
        <div className="basis-6/12">
          <MonthlyOutgoings
            expenses={monthlyBreakdowns[currentMonth]}
            month={currentMonth}
          />

          <p>
            Target savings:{" "}
            {roundCost(monthlyBreakdowns[currentMonth].targetSavings)}
          </p>
          <p>
            Fun money: {roundCost(monthlyBreakdowns[currentMonth].funMoney)}
          </p>
        </div>

        <div className="basis-6/12">
          <ExpensesByMonthBarChart expensesByMonth={monthlyBreakdowns} />
        </div>
      </div>
    </div>
  );
}
