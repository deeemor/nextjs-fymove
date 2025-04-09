"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Dumbbell, 
  Heart, 
  MessageSquare, 
  TrendingUp, 
  Users,
  ChevronRight,
  AlertCircle,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function PatientDashboardPreview() {
  const [activeExerciseFilter, setActiveExerciseFilter] = useState('today');

  // Sample data for the dashboard
  const progressStats = [
    { 
      title: "Completion Rate", 
      value: "92%", 
      change: "+5%", 
      trend: "up",
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
    { 
      title: "Pain Level", 
      value: "2/10", 
      change: "-1", 
      trend: "down",
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30"
    },
    { 
      title: "Mobility Score", 
      value: "78%", 
      change: "+12%", 
      trend: "up",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    { 
      title: "Strength Index", 
      value: "65%", 
      change: "+8%", 
      trend: "up",
      icon: <Dumbbell className="w-5 h-5" />,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    }
  ];

  const todaysExercises = [
    {
      id: 1,
      title: "Seated Knee Extension",
      duration: "5 min",
      completed: true,
      time: "9:30 AM"
    },
    {
      id: 2,
      title: "Hamstring Stretch",
      duration: "3 min",
      completed: true,
      time: "9:40 AM"
    },
    {
      id: 3,
      title: "Ankle Alphabet",
      duration: "4 min",
      completed: false,
      time: "4:00 PM"
    },
    {
      id: 4,
      title: "Wall Slides for Shoulder",
      duration: "6 min",
      completed: false,
      time: "4:15 PM"
    }
  ];

  const recentMessages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      message: "Your progress looks great! Let's discuss adjusting your exercise routine in our next session.",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      sender: "Physical Therapist Mike",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      message: "I've added some new shoulder exercises to your program. Check them out when you have time.",
      time: "Yesterday",
      unread: false
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "7-Day Streak",
      description: "Completed exercises for 7 consecutive days",
      icon: <Award className="w-5 h-5" />,
      date: "Today"
    },
    {
      id: 2,
      title: "Pain Reduction",
      description: "Reduced pain level from 5/10 to 2/10",
      icon: <TrendingUp className="w-5 h-5" />,
      date: "3 days ago"
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

  return (
    <div className="p-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {progressStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
              <div className={`flex items-center ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                <span className="text-sm font-medium">{stat.change}</span>
                {stat.trend === 'up' ? 
                  <ArrowUpRight className="w-4 h-4 ml-1" /> : 
                  <ArrowDownRight className="w-4 h-4 ml-1" />
                }
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Exercises */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Exercises</h2>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button 
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeExerciseFilter === 'today' 
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setActiveExerciseFilter('today')}
                >
                  Today
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeExerciseFilter === 'week' 
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setActiveExerciseFilter('week')}
                >
                  This Week
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeExerciseFilter === 'all' 
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setActiveExerciseFilter('all')}
                >
                  All
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                <span>2 of 4 completed</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>18 minutes total</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {todaysExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                variants={itemVariants}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    exercise.completed 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {exercise.completed ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{exercise.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{exercise.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{exercise.time}</span>
                    </div>
                  </div>
                </div>
                <button className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  exercise.completed 
                    ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}>
                  {exercise.completed ? 'Completed' : 'Start'}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
            <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline flex items-center justify-center mx-auto">
              View all exercises <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Messages */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Messages</h2>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                View all
              </button>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentMessages.map((message) => (
                <div 
                  key={message.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                    message.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex">
                    <img 
                      src={message.avatar} 
                      alt={message.sender} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 dark:text-white">{message.sender}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Send Message
              </button>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Achievements</h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mr-3">
                      {achievement.icon}
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
              <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline flex items-center justify-center mx-auto">
                View all achievements <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>

          {/* Upcoming Appointment */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-md overflow-hidden text-white p-6"
          >
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 mr-2" />
              <h2 className="text-lg font-semibold">Next Appointment</h2>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Knee Rehabilitation</h3>
              <p className="opacity-90">with Dr. Sarah Johnson</p>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 opacity-75" />
                <span>Today, 3:00 PM</span>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Video Call</span>
            </div>
            <button className="w-full bg-white text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Join Session
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}