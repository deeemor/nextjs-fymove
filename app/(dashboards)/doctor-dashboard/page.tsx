'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users, Calendar, Clock, Activity, FileText, MessageSquare, 
  BarChart3, Settings, Filter, Search, PlusCircle, ArrowUpRight, 
  ArrowDownRight, ChevronDown, Bell, Menu, LogOut, X, Eye, EyeOff
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { AddPatientForm } from '@/components/add-patient-form';
import { getCurrentUser, logout, type AuthResponse } from '@/lib/auth';
import { toast } from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  progress: number;
  nextAppointment: string;
  status: string;
  email: string;
  phone?: string;
  role: string;
}

export default function DoctorDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [totalPatients, setTotalPatients] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isAddingPatient, setIsAddingPatient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'doctor') {
      router.push('/');
      return;
    }

    setIsLoading(false);
  }, [router]);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Session expired. Please log in again.");
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/patients', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.statusText}`);
      }

      const data = await response.json();
      setPatients(data);
      setTotalPatients(data.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching patients');
      toast.error('Failed to load patients');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

const handleAddPatient = async (patientData: { name: string; email: string; password: string }) => {
  setIsAddingPatient(true);
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Session expired. Please log in again.');
      router.push('/login');
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/patients', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...patientData,
        role: 'patient'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add patient');
    }

    const newPatient = await response.json();
    setPatients(prev => [...prev, newPatient]);
    setTotalPatients(prev => prev + 1);
    setIsAddPatientOpen(false);
    
    toast.success(`Patient ${newPatient.name} added successfully!`);
    return newPatient;
  } catch (error) {
    console.error('Error adding patient:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to add patient');
    throw error;
  } finally {
    setIsAddingPatient(false);
  }
};

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const sidebarItems = [
    { icon: Users, label: 'Dashboard', active: true, href: '/doctor-dashboard' },
    { icon: Users, label: 'Patients', href: '/doctor-dashboard/patients' },
    { icon: Calendar, label: 'Appointments', href: '/doctor-dashboard/appointments' },
    { icon: FileText, label: 'Reports', href: '/doctor-dashboard/reports' },
    { icon: MessageSquare, label: 'Messages', href: '/doctor-dashboard/messages' },
    { icon: BarChart3, label: 'Analytics', href: '/doctor-dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/doctor-dashboard/settings' },
  ];

  const statsCards = [
    {
      title: "Total Patients",
      value: patients.length.toString(),
      trend: "up",
      change: ((patients.length - 10) / 10 * 100).toFixed(0) + "%",
      icon: <Users className="w-5 h-5 text-white" />
    },
    {
      title: "Today's Appointments",
      value: "32",
      trend: "up",
      change: "5%",
      icon: <Calendar className="w-5 h-5 text-white" />
    },
    {
      title: "Recovery Rate",
      value: "92%",
      trend: "up",
      change: "3%",
      icon: <Activity className="w-5 h-5 text-white" />
    },
    {
      title: "Pending Reports",
      value: "12",
      trend: "down",
      change: "10%",
      icon: <Clock className="w-5 h-5 text-white" />
    }
  ];

  const patientStatusData = {
    labels: ['Active', 'New', 'On Hold', 'Completed'],
    datasets: [{
      data: [65, 20, 10, 5],
      backgroundColor: [
        'rgba(37, 99, 235, 0.8)',
        'rgba(74, 222, 128, 0.8)',
        'rgba(250, 204, 21, 0.8)',
        'rgba(248, 113, 113, 0.8)'
      ],
      borderColor: [
        'rgba(37, 99, 235, 1)',
        'rgba(74, 222, 128, 1)',
        'rgba(250, 204, 21, 1)',
        'rgba(248, 113, 113, 1)'
      ],
      borderWidth: 1,
    }],
  };

  const patientProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Recovery Progress',
        data: [30, 45, 57, 70, 82, 90],
        fill: false,
        borderColor: 'rgba(37, 99, 235, 0.8)',
        tension: 0.4,
      },
      {
        label: 'New Patients',
        data: [10, 15, 12, 18, 20, 25],
        fill: false,
        borderColor: 'rgba(147, 51, 234, 0.8)',
        tension: 0.4,
      }
    ],
  };

  const recentAppointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      time: "09:00 AM",
      type: "Check-up",
      status: "Scheduled"
    },
    {
      id: 2,
      patientName: "Michael Brown",
      time: "10:30 AM",
      type: "Follow-up",
      status: "In Progress"
    },
    {
      id: 3,
      patientName: "Emily Davis",
      time: "02:00 PM",
      type: "Consultation",
      status: "Completed"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: -280 } : { x: 0 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-40 h-screen w-70 bg-gradient-to-br from-blue-600 to-purple-600"
        style={{ width: '280px' }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">MedDash</span>
            </div>
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center px-4 py-3 text-white/90 rounded-lg hover:bg-white/10 transition-colors ${
                  item.active ? 'bg-white/20 text-white' : ''
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  item.active ? 'text-white' : 'text-white/70'
                }`} />
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`${isSidebarOpen && !isMobile ? 'lg:ml-[280px]' : ''} transition-all duration-300`}>
        {/* Top Navigation */}
        <nav className="bg-white border-b sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="ml-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-500 hover:text-gray-700"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                      <span className="font-medium">DR</span>
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
                      <a
                        href="/doctor-dashboard/edit-profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </a>
                      <a
                        href="/doctor-dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Patient Status</h3>
              <div className="h-64">
                <Doughnut data={patientStatusData} />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recovery Progress</h3>
              <div className="h-64">
                <Line
                  data={patientProgressData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Appointments</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patientName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{appointment.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recent Patients</h2>
                <button
                  onClick={() => setIsAddPatientOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
                  disabled={isAddingPatient}
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  {isAddingPatient ? 'Adding...' : 'Add Patient'}
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Visit
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {patients.map((patient) => (
                      <tr key={patient._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                              <span className="font-medium">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {patient.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {patient.age} years
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            patient.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {patient.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full"
                              style={{ width: `${patient.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{patient.progress}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {patient.nextAppointment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Patient Modal */}
      <AddPatientForm
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onSubmit={handleAddPatient}
        isLoading={isAddingPatient}
      />
    </div>
  );
}