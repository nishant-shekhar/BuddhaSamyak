import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const lastMonthData = [120, 200, 150, 170];
  const thisWeekData = [40, 60, 50, 70, 90];
  const todayData = [10, 25, 30, 15];

  const lastMonthChart = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'People who visited',
        data: lastMonthData,
        backgroundColor: '#60a5fa',
        barThickness: 30,
        borderRadius: 2,
      },
    ],
  };

  const thisWeekChart = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'People who visited',
        data: thisWeekData,
        backgroundColor: '#34d399',
        barThickness: 30,
        borderRadius: 2,
      },
    ],
  };

  const todayChart = {
    labels: ['9AM', '12PM', '3PM', '6PM'],
    datasets: [
      {
        label: 'People who visited',
        data: todayData,
        backgroundColor: '#f87171',
        barThickness: 30,
        borderRadius: 2,
      },
    ],
  };

  const averageChart = {
    labels: ['Last Month', 'This Week', 'Today'],
    datasets: [
      {
        label: 'Average Visitors',
        data: [
          lastMonthData.reduce((a, b) => a + b, 0) / lastMonthData.length,
          thisWeekData.reduce((a, b) => a + b, 0) / thisWeekData.length,
          todayData.reduce((a, b) => a + b, 0) / todayData.length,
        ],
        backgroundColor: ['#60a5fa', '#34d399', '#f87171'],
        barThickness: 40,
        borderRadius: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 250,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'black',
        },
      },
    },
  };

  return (
    <div className="p-6 text-black bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-4">Dashboard</h1>
      <p className="text-center mt-2 text-gray-700">
        This is the admin dashboard where you can manage various aspects of the application.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 ml-10 mr-10">
        {/* Last Month Card */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Last Month</h2>
          <p>Total Visitors: {lastMonthData.reduce((a, b) => a + b, 0)}</p>
          <p className="text-sm mt-1">
            Peak Week: Week {lastMonthData.indexOf(Math.max(...lastMonthData)) + 1} ({Math.max(...lastMonthData)}) <br />
            Low Week: Week {lastMonthData.indexOf(Math.min(...lastMonthData)) + 1} ({Math.min(...lastMonthData)})
          </p>
        </div>

        {/* This Week Card */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">This Week</h2>
          <p>Total Visitors: {thisWeekData.reduce((a, b) => a + b, 0)}</p>
          <p className="text-sm mt-1">
            Peak Day: {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][thisWeekData.indexOf(Math.max(...thisWeekData))]} ({Math.max(...thisWeekData)}) <br />
            Low Day: {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][thisWeekData.indexOf(Math.min(...thisWeekData))]} ({Math.min(...thisWeekData)})
          </p>
        </div>

        {/* Today Card */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Today</h2>
          <p>Total Visitors: {todayData.reduce((a, b) => a + b, 0)}</p>
          <p className="text-sm mt-1">
            Peak Hour: {['9AM', '12PM', '3PM', '6PM'][todayData.indexOf(Math.max(...todayData))]} ({Math.max(...todayData)}) <br />
            Low Hour: {['9AM', '12PM', '3PM', '6PM'][todayData.indexOf(Math.min(...todayData))]} ({Math.min(...todayData)})
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-wrap justify-start gap-6 mt-12 ml-10 mb-2">
        <div className="w-[300px] h-[250px] bg-white rounded-xl shadow p-4 border border-gray-200">
          <h2 className="text-lg font-bold mb-2 text-center">Last Month</h2>
          <Bar data={lastMonthChart} options={chartOptions} />
        </div>

        <div className="w-[300px] h-[250px] bg-white rounded-xl shadow p-4 border border-gray-200">
          <h2 className="text-lg font-bold mb-2 text-center">This Week</h2>
          <Bar data={thisWeekChart} options={chartOptions} />
        </div>

        <div className="w-[300px] h-[250px] bg-white rounded-xl shadow p-4 border border-gray-200">
          <h2 className="text-lg font-bold mb-2 text-center">Today</h2>
          <Bar data={todayChart} options={chartOptions} />
        </div>

        <div className="w-[300px] h-[250px] bg-white rounded-xl shadow p-4 border border-gray-200 mt-6">
          <h2 className="text-lg font-bold mb-2 text-center">Average Visitors</h2>
          <Bar data={averageChart} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
