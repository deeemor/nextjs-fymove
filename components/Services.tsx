"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Activity, Dumbbell, HeartPulse, Stethoscope, Users, ArrowRight, Trophy, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  {
    icon: <Trophy className="w-5 h-5" />,
    value: "98%",
    label: "Success Rate"
  },
  {
    icon: <Star className="w-5 h-5" />,
    value: "4.9/5",
    label: "Patient Rating"
  },
  {
    icon: <Clock className="w-5 h-5" />,
    value: "15+",
    label: "Years Experience"
  }
];

const services = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Neurological Rehabilitation",
    description: "Advanced therapy programs for stroke recovery, brain injury, and neurological conditions.",
    features: ["Brain Injury Recovery", "Stroke Rehabilitation", "Neural Plasticity Training"]
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Performance Recovery",
    description: "Personalized rehabilitation plans using AI-driven analytics and progress tracking.",
    features: ["Real-time Progress Tracking", "AI-Powered Analysis", "Custom Exercise Plans"]
  },
  {
    icon: <Dumbbell className="w-8 h-8" />,
    title: "Sports Medicine",
    description: "Specialized treatment for athletes with motion analysis and strength training.",
    features: ["Motion Analysis", "Strength Training", "Injury Prevention"]
  },
  {
    icon: <HeartPulse className="w-8 h-8" />,
    title: "Cardiac Rehabilitation",
    description: "Comprehensive programs for heart health and post-cardiac surgery recovery.",
    features: ["Heart Health Monitoring", "Post-Surgery Care", "Lifestyle Coaching"]
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "Clinical Excellence",
    description: "Evidence-based treatments delivered by expert healthcare professionals.",
    features: ["Expert Consultation", "Treatment Planning", "Progress Evaluation"]
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Group Therapy",
    description: "Supportive group sessions fostering motivation and shared recovery experiences.",
    features: ["Peer Support", "Shared Learning", "Community Building"]
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id='services'
      ref={ref}
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
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md mb-6"
          >
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Our Services</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Comprehensive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Care Solutions
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of rehabilitation with our innovative healthcare solutions
            powered by cutting-edge technology and expert care.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 mx-auto mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400"
              >
                {stat.icon}
              </motion.div>
              <div className="text-xl font-bold text-gray-900 dark:text-white text-center">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200" />
              
              <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8 h-full">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6"
                >
                  {service.icon}
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                      <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant="outline"
                  className="w-full group border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}