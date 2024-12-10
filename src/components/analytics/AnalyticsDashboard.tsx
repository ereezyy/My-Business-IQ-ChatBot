import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { useAnalyticsStore } from '../../store/analyticsStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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

export function AnalyticsDashboard() {
  const { chatAnalytics, businessAnalytics } = useAnalyticsStore();

  const messageData = {
    labels: Object.keys(chatAnalytics.messagesByHour).map(
      (hour) => `${hour}:00`
    ),
    datasets: [
      {
        label: 'Messages by Hour',
        data: Object.values(chatAnalytics.messagesByHour),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const appointmentData = {
    labels: Object.keys(businessAnalytics.appointmentsByDay),
    datasets: [
      {
        label: 'Appointments by Day',
        data: Object.values(businessAnalytics.appointmentsByDay),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Chat Analytics</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Total Conversations</p>
            <p className="text-2xl font-bold">{chatAnalytics.totalConversations}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Response Time</p>
            <p className="text-2xl font-bold">{chatAnalytics.averageResponseTime}s</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Satisfaction Rate</p>
            <p className="text-2xl font-bold">{chatAnalytics.satisfactionRate}%</p>
          </div>
          <div className="h-64">
            <Line data={messageData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Business Analytics</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Total Appointments</p>
            <p className="text-2xl font-bold">{businessAnalytics.totalAppointments}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-2xl font-bold">${businessAnalytics.revenue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Customer Satisfaction</p>
            <p className="text-2xl font-bold">{businessAnalytics.customerSatisfaction}%</p>
          </div>
          <div className="h-64">
            <Bar data={appointmentData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}