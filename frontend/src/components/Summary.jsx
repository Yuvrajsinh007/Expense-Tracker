import { useEffect, useState } from "react";

const Summary = ({ expenses }) => {
  const [summary, setSummary] = useState({
    totalAmount: 0,
    expenseCount: 0,
    highestCategory: "",
    highestAmount: 0,
    averageAmount: 0,
    dailyAverage: 0,
    weeklyAverage: 0,
    monthlyAverage: 0,
  });

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      // Total expenses
      const totalAmount = expenses.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0
      );

      // Category totals
      const categoryTotals = {};
      expenses.forEach((exp) => {
        categoryTotals[exp.category] =
          (categoryTotals[exp.category] || 0) + parseFloat(exp.amount);
      });

      // Highest spending category
      let highestCategory = "";
      let highestAmount = 0;
      Object.entries(categoryTotals).forEach(([category, amount]) => {
        if (amount > highestAmount) {
          highestAmount = amount;
          highestCategory = category;
        }
      });

      // Average per transaction
      const averageAmount = totalAmount / expenses.length;

      // ---- TIME RANGE CALC ----
      const dates = expenses.map((exp) => new Date(exp.date));
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));

      // Total days covered (at least 1)
      const totalDays =
        Math.max(
          1,
          Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1
        );

      // Averages
      const dailyAverage = totalAmount / totalDays;
      const weeklyAverage = totalAmount / (totalDays / 7);
      const monthlyAverage = totalAmount / (totalDays / 30);

      setSummary({
        totalAmount,
        expenseCount: expenses.length,
        highestCategory,
        highestAmount,
        averageAmount,
        dailyAverage,
        weeklyAverage,
        monthlyAverage,
      });
    } else {
      setSummary({
        totalAmount: 0,
        expenseCount: 0,
        highestCategory: "",
        highestAmount: 0,
        averageAmount: 0,
        dailyAverage: 0,
        weeklyAverage: 0,
        monthlyAverage: 0,
      });
    }
  }, [expenses]);

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Expense Summary
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-xl font-bold text-gray-900">
            ₹{summary.totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-500">Transactions</p>
          <p className="text-xl font-bold text-gray-900">
            {summary.expenseCount}
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-500">Top Category</p>
          <p className="text-lg font-semibold text-gray-900">
            {summary.highestCategory || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            ₹{summary.highestAmount.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-500">Avg per Transaction</p>
          <p className="text-xl font-bold text-gray-900">
            ₹{summary.averageAmount.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-pink-50 rounded-lg">
          <p className="text-sm text-gray-500">Daily Avg</p>
          <p className="text-xl font-bold text-gray-900">
            ₹{summary.dailyAverage.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-gray-500">Weekly Avg</p>
          <p className="text-xl font-bold text-gray-900">
            ₹{summary.weeklyAverage.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-gray-500">Monthly Avg</p>
          <p className="text-xl font-bold text-gray-900">
            ₹{summary.monthlyAverage.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
