"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users2, Building2, Award, Lightbulb } from "lucide-react";

function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const stats = [
    {
      icon: <Users2 className="w-8 h-8" />,
      count: "85",
      label: "Expert Therapists",
      description: "Certified professionals dedicated to your recovery"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      count: "18",
      label: "Recovery Centers",
      description: "Modern facilities with advanced equipment"
    },
    {
      icon: <Award className="w-8 h-8" />,
      count: "150+",
      label: "Success Stories",
      description: "Lives transformed through our care"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      count: "12",
      label: "Research Papers",
      description: "Contributing to rehabilitation science"
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y }}
      >
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2  rounded-full text-sm font-medium  bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400              mb-4"
          >
            Our Impact
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Making a <span className="  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Difference</span>
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-blue-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ delay: 0.3 }}
          />
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our commitment to excellence has helped thousands of patients recover and return to their normal lives
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                
                <motion.div
                  className="text-4xl font-bold mb-3 text-gray-900 dark:text-white"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {stat.count}
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {stat.label}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {stat.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Stats;