"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUp, Award, Calendar, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

const mockData = [
  { day: 'Day 1', pain: 8, mobility: 2, strength: 1 },
  { day: 'Day 7', pain: 7, mobility: 3, strength: 2 },
  { day: 'Day 14', pain: 6, mobility: 4, strength: 3 },
  { day: 'Day 21', pain: 5, mobility: 5, strength: 4 },
  { day: 'Day 28', pain: 4, mobility: 6, strength: 5 },
  { day: 'Day 35', pain: 3, mobility: 7, strength: 6 },
  { day: 'Day 42', pain: 2, mobility: 8, strength: 7 },
];

const milestones = [
  { 
    id: 1, 
    title: 'Initial Assessment', 
    date: 'Day 1', 
    description: 'Complete baseline measurements and set rehabilitation goals',
    completed: true,
    icon: <Calendar className="w-5 h-5" />
  },
  { 
    id: 2, 
    title: 'Pain Reduction', 
    date: 'Day 14', 
    description: 'Reduce pain levels by 25% through targeted exercises',
    completed: true,
    icon: <TrendingUp className="w-5 h-5" />
  },
  { 
    id: 3, 
    title: 'Mobility Improvement', 
    date: 'Day 28', 
    description: 'Increase range of motion by 40% compared to baseline',
    completed: true,
    icon: <ArrowUp className="w-5 h-5" />
  },
  { 
    id: 4, 
    title: 'Strength Building', 
    date: 'Day 42', 
    description: 'Achieve 70% of normal strength in affected area',
    completed: false,
    icon: <Award className="w-5 h-5" />
  },
];

export default function ProgressTracker() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeMilestone, setActiveMilestone] = useState(milestones[2]);

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

  const nextMilestone = () => {
    const currentIndex = milestones.findIndex(m => m.id === activeMilestone.id);
    const nextIndex = (currentIndex + 1) % milestones.length;
    setActiveMilestone(milestones[nextIndex]);
  };

  const prevMilestone = () => {
    const currentIndex = milestones.findIndex(m => m.id === activeMilestone.id);
    const prevIndex = currentIndex === 0 ? milestones.length - 1 : currentIndex - 1;
    setActiveMilestone(milestones[prevIndex]);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Track Your Journey
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
            Rehabilitation Progress Tracker
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Monitor your rehabilitation journey with our comprehensive tracking tools.
            Visualize improvements, celebrate milestones, and stay motivated.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'metrics'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Detailed Metrics
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'milestones'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Milestones
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <motion.div
                variants={itemVariants}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pain Level</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">2/10</span>
                      <span className="text-green-500 text-sm flex items-center">
                        -75% <ArrowUp className="w-3 h-3 ml-1 transform rotate-180" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Down from 8/10 at start
                    </p>
                    <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobility</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">8/10</span>
                      <span className="text-green-500 text-sm flex items-center">
                        +300% <ArrowUp className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Up from 2/10 at start
                    </p>
                    <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Strength</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">7/10</span>
                      <span className="text-green-500 text-sm flex items-center">
                        +600% <ArrowUp className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Up from 1/10 at start
                    </p>
                    <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progress Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mockData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="day" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#F9FAFB'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="pain" 
                          stroke="#EF4444" 
                          strokeWidth={2}
                          name="Pain Level"
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mobility" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          name="Mobility"
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="strength" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          name="Strength"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                variants={itemVariants}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pain Reduction</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={mockData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="day" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: 'none',
                              borderRadius: '0.5rem',
                              color: '#F9FAFB'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="pain" 
                            stroke="#EF4444" 
                            strokeWidth={2}
                            name="Pain Level"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mobility Improvement</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={mockData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="day" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: 'none',
                              borderRadius: '0.5rem',
                              color: '#F9FAFB'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="mobility" 
                            stroke="#3B82F6" 
                            strokeWidth={2}
                            name="Mobility"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Strength Building</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={mockData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="day" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: 'none',
                              borderRadius: '0.5rem',
                              color: '#F9FAFB'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="strength" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            name="Strength"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Comparison</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="day" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: 'none',
                              borderRadius: '0.5rem',
                              color: '#F9FAFB'
                            }} 
                          />
                          <Bar dataKey="pain" name="Pain Level" fill="#EF4444" />
                          <Bar dataKey="mobility" name="Mobility" fill="#3B82F6" />
                          <Bar dataKey="strength" name="Strength" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'milestones' && (
              <motion.div
                variants={itemVariants}
                className="space-y-8"
              >
                <div className="relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <button 
                      onClick={prevMilestone}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                  
                  <div className="mx-12">
                    <motion.div
                      key={activeMilestone.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${
                          activeMilestone.completed 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}>
                          {activeMilestone.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {activeMilestone.title}
                            </h3>
                            {activeMilestone.completed && (
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                                Completed
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {activeMilestone.date}
                          </p>
                          <p className="mt-4 text-gray-700 dark:text-gray-300">
                            {activeMilestone.description}
                          </p>
                          
                          {activeMilestone.completed ? (
                            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                              <p className="text-green-700 dark:text-green-400 font-medium">
                                Milestone achieved! Your rehabilitation is progressing well.
                              </p>
                            </div>
                          ) : (
                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                              <p className="text-blue-700 dark:text-blue-400 font-medium">
                                Keep going! You're making great progress toward this milestone.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <button 
                      onClick={nextMilestone}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
                
                <div className="relative pt-8">
                  <div className="absolute h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  {milestones.map((milestone, index) => (
                    <div 
                      key={milestone.id}
                      className="absolute"
                      style={{ left: `${(index / (milestones.length - 1)) * 100}%` }}
                    >
                      <button
                        onClick={() => setActiveMilestone(milestone)}
                        className={`w-5 h-5 rounded-full -mt-2 transition-all ${
                          activeMilestone.id === milestone.id
                            ? 'ring-4 ring-blue-200 dark:ring-blue-900/50'
                            : ''
                        } ${
                          milestone.completed
                            ? 'bg-green-500'
                            : 'bg-blue-500'
                        }`}
                      ></button>
                      <p className={`absolute -ml-10 mt-4 w-20 text-center text-xs ${
                        activeMilestone.id === milestone.id
                          ? 'font-medium text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {milestone.date}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to start tracking your own rehabilitation progress?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
            Create Your Account
          </button>
        </motion.div>
      </div>
    </section>
  );
}