import { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Chart = ({ expenses }) => {
  const [chartType, setChartType] = useState('bar');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      // Process data for charts
      const categoryTotals = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        acc[category] = (acc[category] || 0) + Number(amount);
        return acc;
      }, {});

      const categories = Object.keys(categoryTotals);
      const amounts = Object.values(categoryTotals);

      // Generate dynamic colors
      const backgroundColors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(199, 199, 199, 0.7)',
      ];

      setChartData({
        labels: categories,
        datasets: [
          {
            label: 'Expense Amount',
            data: amounts,
            backgroundColor: backgroundColors.slice(0, categories.length),
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
          },
        ],
      });
    } else {
      setChartData(null);
    }
  }, [expenses]);

  if (!chartData) {
    return (
      <div className="bg-white shadow rounded-lg p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500 text-center">No data available for chart</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              chartType === 'bar'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setChartType('bar')}
          >
            Bar
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              chartType === 'pie'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setChartType('pie')}
          >
            Pie
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 md:h-96">
        {chartType === 'bar' ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    font: {
                      family: "'Inter', 'system-ui', sans-serif",
                      size: 12,
                    },
                  },
                },
                title: {
                  display: true,
                  text: 'Expenses by Category',
                  font: {
                    family: "'Inter', 'system-ui', sans-serif",
                    size: 14,
                    weight: 'bold',
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: {
                      family: "'Inter', 'system-ui', sans-serif",
                    },
                  },
                },
                x: {
                  ticks: {
                    font: {
                      family: "'Inter', 'system-ui', sans-serif",
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    font: {
                      family: "'Inter', 'system-ui', sans-serif",
                      size: 12,
                    },
                  },
                },
                title: {
                  display: true,
                  text: 'Expenses by Category',
                  font: {
                    family: "'Inter', 'system-ui', sans-serif",
                    size: 14,
                    weight: 'bold',
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chart;