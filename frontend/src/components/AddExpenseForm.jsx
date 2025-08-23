import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AddExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.post("/api/expenses", form, config);
      onAdd(res.data);
      setForm({ title: "", amount: "", category: "", date: "", note: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Add New Expense
      </h3>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Expense title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow cursor-pointer focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Note (Optional)
          </label>
          <input
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Additional details"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
