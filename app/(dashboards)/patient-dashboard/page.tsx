"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Footer from "@/components/Footer";
import CommunityForum from "@/components/CommunityForum";
import ExerciseLibrary from "@/components/ExerciseLibrary";
import ProgressTracker from "@/components/ProgressTracker";
import PatientDashboardPreview from "@/components/PatientDashboardPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  Activity, 
  Bell, 
  Settings, 
  HelpCircle, 
  Calendar, 
  MessageSquare,
  ChevronRight,
  Clock,
  CheckCircle2,
  LogOut,
  User,
  ChevronDown,
  Shield,
  Mail
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { getCurrentUser, logout, type AuthResponse } from '@/lib/auth';

function PatientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reminder',
      message: 'Your knee rehabilitation session is scheduled for today at 3:00 PM',
      time: '1 hour ago',
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      message: 'Congratulations! You\'ve completed 7 consecutive days of exercises',
      time: '3 hours ago',
      read: true
    },
    {
      id: 3,
      type: 'message',
      message: 'Dr. Sarah Johnson replied to your question about shoulder exercises',
      time: 'Yesterday',
      read: false
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        router.push('/');
        return;
      }
      setUser(currentUser);
      setIsLoading(false);
    };

    checkUser();
  }, [router]);

  // User menu items
  const userMenuItems = [
    { icon: <User size={16} />, label: 'Profile', action: () => router.push('/profile') },
    { icon: <Settings size={16} />, label: 'Settings', action: () => router.push('/settings') },
    { icon: <Shield size={16} />, label: 'Privacy', action: () => router.push('/privacy') },
    { icon: <Mail size={16} />, label: 'Messages', action: () => router.push('/messages') },
    { icon: <HelpCircle size={16} />, label: 'Help', action: () => router.push('/help') },
    { icon: <LogOut size={16} />, label: 'Logout', action: () => handleLogout(), className: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' }
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications-menu')) {
        setShowNotifications(false);
      }
      if (!target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Quick actions for the dashboard
  const quickActions = [
    { 
      icon: <Calendar className="w-5 h-5" />, 
      label: "Schedule Session", 
      color: "bg-blue-600 hover:bg-blue-700" 
    },
    { 
      icon: <MessageSquare className="w-5 h-5" />, 
      label: "Message Doctor", 
      color: "bg-green-600 hover:bg-green-700" 
    },
    { 
      icon: <Activity className="w-5 h-5" />, 
      label: "Log Progress", 
      color: "bg-purple-600 hover:bg-purple-700" 
    },
    { 
      icon: <HelpCircle className="w-5 h-5" />, 
      label: "Get Help", 
      color: "bg-orange-600 hover:bg-orange-700" 
    }
  ];

  // Upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      title: "Knee Rehabilitation",
      doctor: "Dr. Sarah Johnson",
      time: "Today, 3:00 PM",
      type: "Video Call",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Progress Review",
      doctor: "Dr. Michael Chen",
      time: "Tomorrow, 10:00 AM",
      type: "In-person",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Exercise Adjustment",
      doctor: "Dr. Emily Brown",
      time: "Yesterday, 2:30 PM",
      type: "Video Call",
      status: "completed"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <section className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Welcome back, <span className="text-blue-600">{user.name}</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-4 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ThemeToggle />
              
              {/* Notifications Button */}
              <div className="relative notifications-menu">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={menuVariants}
                      className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        <button 
                          onClick={markAllNotificationsAsRead}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start">
                              <div className={`mt-1 mr-3 p-2 rounded-full flex-shrink-0 ${
                                notification.type === 'reminder' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' :
                                notification.type === 'achievement' ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' :
                                'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'
                              }`}>
                                {notification.type === 'reminder' ? <Clock className="w-5 h-5" /> :
                                 notification.type === 'achievement' ? <CheckCircle2 className="w-5 h-5" /> :
                                 <MessageSquare className="w-5 h-5" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium hidden md:block">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={menuVariants}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <div className="py-2">
                        {userMenuItems.map((item, index) => (
                          <button
                            key={item.label}
                            onClick={item.action}
                            className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${item.className || 'text-gray-700 dark:text-gray-300'}`}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`${action.color} text-white rounded-xl p-4 flex flex-col items-center justify-center shadow-md h-24`}
              >
                <div className="mb-2">{action.icon}</div>
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Upcoming Sessions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Sessions</h2>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  variants={itemVariants}
                  className={`p-4 flex items-center justify-between ${
                    index !== upcomingSessions.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      session.status === 'upcoming' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 
                      'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {session.status === 'upcoming' ? 
                        <Calendar className="w-6 h-6" /> : 
                        <CheckCircle2 className="w-6 h-6" />
                      }
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{session.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{session.doctor}</span>
                        <span className="mx-2">•</span>
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.type === 'Video Call' ? 
                      'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 
                      'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {session.type}
                    </span>
                    {session.status === 'upcoming' && (
                      <button className="ml-4 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Join
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Dashboard Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <Tabs 
              defaultValue="dashboard" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <TabsList className="flex w-full overflow-x-auto">
                  <TabsTrigger 
                    value="dashboard" 
                    className="flex items-center gap-2 py-4 px-6"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="exercises" 
                    className="flex items-center gap-2 py-4 px-6"
                  >
                    <Dumbbell className="w-5 h-5" />
                    <span>Exercise Library</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="community" 
                    className="flex items-center gap-2 py-4 px-6"
                  >
                    <Users className="w-5 h-5" />
                    <span>Community Forum</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="progress" 
                    className="flex items-center gap-2 py-4 px-6"
                  >
                    <Activity className="w-5 h-5" />
                    <span>Progress Tracker</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="dashboard" className="p-0">
                <PatientDashboardPreview />
              </TabsContent>
              
              <TabsContent value="exercises" className="p-0">
                <ExerciseLibrary />
              </TabsContent>
              
              <TabsContent value="community" className="p-0">
                <CommunityForum />
              </TabsContent>
              
              <TabsContent value="progress" className="p-0">
                <ProgressTracker />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

export default PatientDashboard;