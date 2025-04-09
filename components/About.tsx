"use client";

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  Users, 
  Target, 
  Trophy,
  Clock,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const achievements = [
  {
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    title: "Best Rehabilitation Center",
    year: "2023",
    description: "Recognized for excellence in patient care and recovery outcomes"
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    title: "Innovation Award",
    year: "2022",
    description: "Pioneering advanced rehabilitation technologies"
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Patient Choice Award",
    year: "2023",
    description: "Voted #1 by patients for exceptional care quality"
  }
];

const milestones = [
  { year: "2010", event: "Founded with a vision of revolutionary care" },
  { year: "2015", event: "Expanded to 10 locations nationwide" },
  { year: "2018", event: "Launched AI-powered recovery tracking" },
  { year: "2020", event: "Introduced virtual rehabilitation platform" },
  { year: "2023", event: "Reached 100,000 successful recoveries" }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const teamMembers = [
    {
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=400",
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer"
    },
    {
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=400",
      name: "Dr. James Wilson",
      role: "Head of Rehabilitation"
    },
    {
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&h=400",
      name: "Dr. Maria Rodriguez",
      role: "Research Director"
    }
  ];

  return (
    <section 
      ref={ref}
      id="about" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute w-[500px] h-[500px] -top-48 -right-24 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute w-[400px] h-[400px] top-1/2 -left-48 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 "
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Discover Our Story</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pioneering the Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Physical Rehabilitation
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're not just treating patients; we're revolutionizing recovery through innovation, 
            compassion, and cutting-edge technology.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative mb-32"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? 'justify-end' : 'flex-row-reverse justify-end'
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {milestone.year}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{milestone.event}</p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-4 h-4 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-600 relative z-10"
              />
              
              <div className="w-1/2" />
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6"
              >
                {achievement.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {achievement.title}
              </h3>
              
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                {achievement.year}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}