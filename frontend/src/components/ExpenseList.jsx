import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ExpenseList = ({ expenses, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState('');
  const { user } = useAuth();

  const startEdit = (expense) => {
    setEditingId(expense._id);
    setEditForm({ ...expense });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(`/api/expenses/${editingId}`, editForm, config);
      setEditingId(null);
      onUpdate();
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update expense');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        await axios.delete(`/api/expenses/${id}`, config);
        onUpdate();
        setError('');
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete expense');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No expenses</h3>
        <p className="mt-1 text-sm text-gray-500">
          Add your first expense to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200">
        Expense History
      </h3>

      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Title', 'Amount', 'Category', 'Date', 'Note', 'Actions'].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((exp) => (
              <tr key={exp._id}>
                {/* Title */}
                <td className="px-6 py-4">
                  {editingId === exp._id ? (
                    <input
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                      name="title"
                      value={editForm.title}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="font-medium text-gray-900">
                      {exp.title}
                    </span>
                  )}
                </td>

                {/* Amount */}
                <td className="px-6 py-4">
                  {editingId === exp._id ? (
                    <input
                      type="number"
                      name="amount"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                      value={editForm.amount}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="text-gray-900">₹{exp.amount}</span>
                  )}
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  {editingId === exp._id ? (
                    <select
                      name="category"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                      value={editForm.category}
                      onChange={handleChange}
                    >
                      {[
                        'Food',
                        'Travel',
                        'Shopping',
                        'Utilities',
                        'Entertainment',
                        'Health',
                        'Other',
                      ].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {exp.category}
                    </span>
                  )}
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <span className="text-gray-900">{formatDate(exp.date)}</span>
                </td>

                {/* Note */}
                <td className="px-6 py-4">
                  {editingId === exp._id ? (
                    <input
                      name="note"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                      value={editForm.note}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="text-gray-500">{exp.note}</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  {editingId === exp._id ? (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-medium shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-xs font-medium shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium shadow hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                        onClick={() => startEdit(exp)}
                      >
                        Edit
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-md text-xs font-medium shadow hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                        onClick={() => handleDelete(exp._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
