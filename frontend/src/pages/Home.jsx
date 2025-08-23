import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import FilterBar from '../components/FilterBar';
import Chart from '../components/Chart';
import Summary from '../components/Summary';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();

  const fetchExpenses = async (filters = {}) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: filters,
      };
      const res = await axios.get('/api/expenses', config);
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    if (user) fetchExpenses();
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome, <span className="text-primary">{user?.name || 'User'}</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Track, visualize, and manage your expenses effortlessly
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">➕ Add Expense</h2>
              <AddExpenseForm onAdd={(exp) => setExpenses([exp, ...expenses])} />
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">📊 Summary</h2>
              <Summary expenses={expenses} />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              whileHover={{ scale: 1.01 }}
            >
              <FilterBar onFilter={fetchExpenses} />
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">📈 Expense Trends</h2>
              <Chart expenses={expenses} />
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">📝 Expense History</h2>
              <ExpenseList expenses={expenses} onUpdate={fetchExpenses} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
