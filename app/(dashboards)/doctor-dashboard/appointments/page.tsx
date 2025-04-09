'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface Appointment {
  id: number;
  patientName: string;
  patientAvatar: string;
  time: string;
  duration: string;
  type: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

const appointments: Appointment[] = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    patientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    time: "09:00 AM",
    duration: "30 mins",
    type: "Check-up",
    status: "scheduled"
  },
  {
    id: 2,
    patientName: "Michael Brown",
    patientAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    time: "10:30 AM",
    duration: "45 mins",
    type: "Follow-up",
    status: "in-progress"
  },
  {
    id: 3,
    patientName: "Emily Davis",
    patientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    time: "02:00 PM",
    duration: "1 hour",
    type: "Consultation",
    status: "completed"
  }
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM"
];

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <p className="mt-2 text-gray-600">Manage your schedule and appointments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar and Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Schedule</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedDate.toLocaleDateString('en-US', { 
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {timeSlots.map((time, index) => {
                  const appointment = appointments.find(apt => apt.time === time);
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        appointment ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Clock className={`w-5 h-5 ${appointment ? 'text-blue-600' : 'text-gray-400'}`} />
                          <span className="font-medium text-gray-900">{time}</span>
                        </div>
                        {appointment ? (
                          <div className="flex items-center space-x-4">
                            <img
                              src={appointment.patientAvatar}
                              alt={appointment.patientName}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{appointment.patientName}</p>
                              <p className="text-sm text-gray-500">{appointment.type}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                        ) : (
                          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                            <Plus className="w-4 h-4" />
                            <span className="text-sm font-medium">Add Appointment</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Upcoming</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={appointment.patientAvatar}
                        alt={appointment.patientName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                          <span>•</span>
                          <span>{appointment.duration}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}