"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Activity, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingScreen from './LodingScreen';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: "Secure Platform",
    description: "Enterprise-grade security for your health data"
  },
  {
    icon: <Activity className="w-6 h-6 text-blue-600" />,
    title: "Fast Recovery",
    description: "Accelerated healing through proven methods"
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Expert Support",
    description: "24/7 access to healthcare professionals"
  }
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <div className="relative min-h-screen overflow-hidden">
            <LoadingScreen  />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100/30 to-pink-100/30 dark:from-indigo-900/20 dark:to-pink-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
        />
      </motion.div>

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center"
          style={{ y, opacity }}
        >
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 mb-8"
            >
              <Activity className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Transform Your Recovery Journey</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-gray-900 dark:text-white">
                Revolutionizing
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r  from-blue-600 to-purple-600">
                Physical Therapy
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience personalized rehabilitation programs designed to help you recover faster and stronger than ever before.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
                asChild
              >
                <motion.a 
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </motion.a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="group"
                asChild
              >
                <motion.a 
                  href="/whyus"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="relative"
            style={{ scale }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-[4/3] shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/images/f4.jpg"
                alt="Physical Therapy"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Success Rate</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">98%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative group"
            >
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-shadow">
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}