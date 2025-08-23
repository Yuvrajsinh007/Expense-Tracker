import { useState } from "react";

const FilterBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    minAmount: "",
    maxAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      startDate: "",
      endDate: "",
      category: "",
      minAmount: "",
      maxAmount: "",
    });
    onFilter({});
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Filter Expenses
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Date Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg shadow px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg shadow px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg shadow px-3 py-2 cursor-pointer focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Amount Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="minAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Amount
            </label>
            <input
              id="minAmount"
              type="number"
              name="minAmount"
              value={filters.minAmount}
              onChange={handleChange}
              placeholder="0"
              className="block w-full border border-gray-300 rounded-lg shadow px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="maxAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Amount
            </label>
            <input
              id="maxAmount"
              type="number"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={handleChange}
              placeholder="1000"
              className="block w-full border border-gray-300 rounded-lg shadow px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow transition cursor-pointer"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2 px-4 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg shadow hover:bg-gray-50 transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
