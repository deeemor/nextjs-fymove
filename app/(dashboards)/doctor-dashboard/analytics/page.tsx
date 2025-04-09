'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const analyticsData = {
  patientGrowth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Patients',
        data: [30, 45, 57, 70, 82, 90],
        fill: false,
        borderColor: 'rgba(37, 99, 235, 1)',
        tension: 0.4,
      }
    ]
  },
  treatmentSuccess: {
    labels: ['Completed', 'Ongoing', 'Scheduled', 'Cancelled'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }
    ]
  }
};

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">Monitor your practice performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Revenue",
            value: "$24,500",
            trend: "up",
            change: "12%",
            icon: <TrendingUp className="w-5 h-5 text-white" />
          },
          {
            title: "New Patients",
            value: "145",
            trend: "up",
            change: "8%",
            icon: <Users className="w-5 h-5 text-white" />
          },
          {
            title: "Treatment Success",
            value: "92%",
            trend: "up",
            change: "3%",
            icon: <Activity className="w-5 h-5 text-white" />
          },
          {
            title: "Patient Satisfaction",
            value: "4.8/5",
            trend: "down",
            change: "1%",
            icon: <BarChart3 className="w-5 h-5 text-white" />
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-white/70">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-green-300" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-300" />
              )}
              <span className={`ml-2 text-sm ${
                stat.trend === 'up' ? 'text-green-300' : 'text-red-300'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Patient Growth</h2>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <div className="h-80">
            <Line
              data={analyticsData.patientGrowth}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    type: 'linear' as const
                  },
                  x: {
                    type: 'category' as const
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Treatment Overview</h2>
          </div>
          <div className="h-80">
            <Bar
              data={analyticsData.treatmentSuccess}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    type: 'linear' as const
                  },
                  x: {
                    type: 'category' as const
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}