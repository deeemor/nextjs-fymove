"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";

interface ComparisonFeature {
  name: string;
  traditional: boolean | "partial";
  fymove: boolean | "partial";
  tooltip?: string;
}

export default function FeatureComparison() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features: ComparisonFeature[] = [
    {
      name: "Real-time progress tracking",
      traditional: false,
      fymove: true,
      tooltip: "FyMove provides instant feedback on your rehabilitation progress"
    },
    {
      name: "Personalized exercise programs",
      traditional: "partial",
      fymove: true,
      tooltip: "Traditional methods offer some personalization, but FyMove adapts in real-time based on your performance"
    },
    {
      name: "Remote monitoring capabilities",
      traditional: false,
      fymove: true,
      tooltip: "Monitor your progress from anywhere with our mobile app"
    },
    {
      name: "AI-powered recommendations",
      traditional: false,
      fymove: true,
      tooltip: "Our AI analyzes your movement patterns to suggest optimal exercises"
    },
    {
      name: "Expert professional guidance",
      traditional: true,
      fymove: true,
      tooltip: "Both approaches include professional supervision"
    },
    {
      name: "Detailed analytics dashboard",
      traditional: false,
      fymove: true,
      tooltip: "Visualize your recovery journey with comprehensive data insights"
    },
    {
      name: "Gamified exercise experience",
      traditional: false,
      fymove: true,
      tooltip: "Make rehabilitation fun with interactive exercise games"
    },
    {
      name: "Accessible from home",
      traditional: "partial",
      fymove: true,
      tooltip: "Traditional rehabilitation often requires in-person visits"
    }
  ];

  const renderStatusIcon = (status: boolean | "partial") => {
    if (status === true) {
      return <Check className="w-5 h-5 text-green-500" />;
    } else if (status === "partial") {
      return <Check className="w-5 h-5 text-yellow-500" />;
    } else {
      return <X className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
            FyMove vs. Traditional Rehabilitation
          </h2>
          <div className="h-1 w-20 bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how our innovative approach compares to traditional rehabilitation methods.
          </p>
        </motion.div>

        <motion.div    
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 bg-gray-100 dark:bg-gray-700 p-4">
            <div className="col-span-1 text-left font-semibold text-gray-700 dark:text-gray-300">
              Features
            </div>
            <div className="text-center font-semibold text-gray-700 dark:text-gray-300">
              Traditional
            </div>
            <div className="text-center font-semibold text-blue-600 dark:text-blue-400">
              FyMove
            </div>
          </div>

          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`grid grid-cols-3 p-4 items-center ${
                index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50"
              }`}
              onMouseEnter={() => feature.tooltip && setHoveredFeature(feature.name)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="col-span-1 text-left text-gray-800 dark:text-gray-200 relative">
                {feature.name}
                {feature.tooltip && (
                  <button className="ml-1 inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                )}
                
                {/* Tooltip */}
                {feature.tooltip && hoveredFeature === feature.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 top-6 z-10 w-64 rounded-md bg-gray-900 dark:bg-gray-700 p-2 text-xs text-white shadow-lg"
                  >
                    {feature.tooltip}
                    <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700"></div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex justify-center">
                {renderStatusIcon(feature.traditional)}
              </div>
              
              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {renderStatusIcon(feature.fymove)}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="/#pricing"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Experience the Difference
          </a>
        </motion.div>
      </div>
    </section>
  );
}