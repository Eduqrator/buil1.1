import React from 'react';
import { BarChart, Users, BookOpen, TrendingUp } from 'lucide-react';

export const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Courses',
      value: '1,234',
      change: '+12%',
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    },
    {
      title: 'Active Users',
      value: '45.2k',
      change: '+8%',
      icon: <Users className="h-6 w-6 text-green-600" />,
    },
    {
      title: 'Course Views',
      value: '89.1k',
      change: '+24%',
      icon: <BarChart className="h-6 w-6 text-purple-600" />,
    },
    {
      title: 'Engagement Rate',
      value: '12.5%',
      change: '+2.3%',
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-600">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
          {/* Add activity feed component here */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Popular Courses</h2>
          {/* Add popular courses list component here */}
        </div>
      </div>
    </div>
  );
};