"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Cpu, Activity, Brain, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

interface TechFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  color: string;
}

export default function TechShowcase() {
  const [activeFeature, setActiveFeature] = useState<string>("mobile");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features: TechFeature[] = [
    {
      id: "mobile",
      title: "Mobile Application",
      description: "Track your rehabilitation progress on the go with our intuitive mobile application. Set reminders, follow exercise routines, and stay connected with your healthcare providers.",
      icon: <Smartphone className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      color: "blue"
    },
    // {
    //   id: "ai",
    //   title: "AI-Powered Analysis",
    //   description: "Our artificial intelligence engine analyzes your movement patterns to provide personalized recommendations and optimize your rehabilitation journey.",
    //   icon: <Cpu className="w-6 h-6" />,
    //   image: "https://images.unsplash.com/photo-1581092921461-7031e4bfb83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    //   color: "purple"
    // },
    {
      id: "sensors",
      title: "Smart Sensors",
      description: "Wearable sensors capture precise movement data to ensure proper exercise execution and track your rehabilitation progress with clinical accuracy.",
      icon: <Activity className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      color: "green"
    },
    {
      id: "vr",
      title: "Virtual Reality Therapy",
      description: "Immersive virtual reality environments make rehabilitation exercises engaging and effective, improving patient motivation and adherence to treatment plans.",
      icon: <Brain className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      color: "orange"
    }
  ];

  const getColorClass = (color: string, element: "bg" | "text" | "border") => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-500"
      },
      purple: {
        bg: "bg-purple-500",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-500"
      },
      green: {
        bg: "bg-green-500",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-500"
      },
      orange: {
        bg: "bg-orange-500",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-500"
      }
    };

    return colorMap[color as keyof typeof colorMap][element];
  };

  const currentFeature = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section id="technology" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Cutting-Edge Technology
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
            Innovative Rehabilitation Technology
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the advanced technologies that power our rehabilitation platform and accelerate your recovery.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Feature Image */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={currentFeature.image}
                alt={currentFeature.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={`inline-flex items-center justify-center p-2 rounded-full ${getColorClass(currentFeature.color, "bg")} text-white mb-3`}>
                    {currentFeature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentFeature.title}</h3>
                  <p className="text-white/80">{currentFeature.description}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Selection */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Our Technology Suite
            </h3>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                >
                  <motion.button
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      activeFeature === feature.id
                        ? `${getColorClass(feature.color, "border")} bg-gray-50 dark:bg-gray-800/50`
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setActiveFeature(feature.id)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${
                        activeFeature === feature.id
                          ? getColorClass(feature.color, "bg")
                          : "bg-gray-100 dark:bg-gray-700"
                      } ${
                        activeFeature === feature.id ? "text-white" : getColorClass(feature.color, "text")
                      } mr-4`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        {activeFeature === feature.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-gray-600 dark:text-gray-300 mt-2"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </div>
                      <div className="ml-auto">
                        <ArrowRight className={`w-5 h-5 ${
                          activeFeature === feature.id
                            ? getColorClass(feature.color, "text")
                            : "text-gray-400"
                        }`} />
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>

            
          </motion.div>
        </div>
      </div>
    </section>
  );
}