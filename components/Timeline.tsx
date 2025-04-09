"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Award, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Target, 
  Shield,
  Star,
  Users,
  BookOpen,
  Trophy,
  Download,
  Share2
} from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: "calendar" | "award" | "zap" | "check" | "clock" | "target" | "shield" | "star" | "users" | "book" | "trophy";
  color?: "blue" | "green" | "purple" | "orange" | "pink" | "indigo" | "teal" | "amber";
  stats?: {
    label: string;
    value: string;
  }[];
  milestones?: string[];
}

export default function Timeline() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events: TimelineEvent[] = [
    {
      id: "assessment",
      date: "Day 1",
      title: "Initial Assessment",
      description: "Comprehensive evaluation of your condition and goals by our expert rehabilitation specialists.",
      icon: "calendar",
      color: "blue",
      stats: [
        { label: "Duration", value: "60 mins" },
        { label: "Specialists", value: "2" }
      ],
      milestones: [
        "Complete medical history review",
        "Physical assessment",
        "Goal setting session"
      ]
    },
    {
      id: "planning",
      date: "Day 2-3",
      title: "Strategic Planning",
      description: "Development of your personalized rehabilitation roadmap based on assessment results.",
      icon: "target",
      color: "purple",
      stats: [
        { label: "Plan Duration", value: "12 weeks" },
        { label: "Exercises", value: "15+" }
      ],
      milestones: [
        "Custom exercise program",
        "Progress tracking setup",
        "Equipment requirements"
      ]
    },
    {
      id: "onboarding",
      date: "Week 1",
      title: "Platform Onboarding",
      description: "Get familiar with our digital tools and start your guided rehabilitation journey.",
      icon: "shield",
      color: "teal",
      stats: [
        { label: "Training", value: "3 sessions" },
        { label: "Support", value: "24/7" }
      ],
      milestones: [
        "App navigation training",
        "Device setup assistance",
        "Emergency contact setup"
      ]
    },
    {
      id: "therapy",
      date: "Weeks 2-6",
      title: "Active Rehabilitation",
      description: "Guided therapy sessions with real-time tracking and expert supervision.",
      icon: "zap",
      color: "amber",
      stats: [
        { label: "Sessions", value: "18" },
        { label: "Progress", value: "45%" }
      ],
      milestones: [
        "Strength training",
        "Flexibility exercises",
        "Balance improvement"
      ]
    },
    {
      id: "monitoring",
      date: "Ongoing",
      title: "Progress Monitoring",
      description: "Continuous assessment and adjustment of your program for optimal results.",
      icon: "star",
      color: "pink",
      stats: [
        { label: "Check-ins", value: "Weekly" },
        { label: "Reports", value: "Monthly" }
      ],
      milestones: [
        "Performance analytics",
        "Goal achievement tracking",
        "Program adjustments"
      ]
    },
    {
      id: "completion",
      date: "Final Phase",
      title: "Goal Achievement",
      description: "Celebration of your progress and preparation for maintained wellness.",
      icon: "trophy",
      color: "green",
      stats: [
        { label: "Goals Met", value: "100%" },
        { label: "Duration", value: "90 days" }
      ],
      milestones: [
        "Final assessment",
        "Long-term plan",
        "Success celebration"
      ]
    }
  ];

  const getIcon = (iconName: string, className: string) => {
    const icons = {
      calendar: Calendar,
      award: Award,
      zap: Zap,
      check: CheckCircle,
      clock: Clock,
      target: Target,
      shield: Shield,
      star: Star,
      users: Users,
      book: BookOpen,
      trophy: Trophy
    };
    
    const IconComponent = icons[iconName as keyof typeof icons] || Calendar;
    return <IconComponent className={className} />;
  };

  const getColorClass = (color: string = "blue", isBackground: boolean = false) => {
    const colors = {
      blue: ["bg-blue-100 dark:bg-blue-900/30", "text-blue-600 dark:text-blue-400"],
      green: ["bg-green-100 dark:bg-green-900/30", "text-green-600 dark:text-green-400"],
      purple: ["bg-purple-100 dark:bg-purple-900/30", "text-purple-600 dark:text-purple-400"],
      orange: ["bg-orange-100 dark:bg-orange-900/30", "text-orange-600 dark:text-orange-400"],
      pink: ["bg-pink-100 dark:bg-pink-900/30", "text-pink-600 dark:text-pink-400"],
      indigo: ["bg-indigo-100 dark:bg-indigo-900/30", "text-indigo-600 dark:text-indigo-400"],
      teal: ["bg-teal-100 dark:bg-teal-900/30", "text-teal-600 dark:text-teal-400"],
      amber: ["bg-amber-100 dark:bg-amber-900/30", "text-amber-600 dark:text-amber-400"]
    };
    
    return colors[color as keyof typeof colors]?.[isBackground ? 0 : 1] || colors.blue[isBackground ? 0 : 1];
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/30 dark:bg-purple-900/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium inline-flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Your Recovery Journey
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            Path to Recovery
          </h1>
          
          <div className="h-1 w-20 bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-6"></div>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Track your rehabilitation progress with our comprehensive timeline and expert guidance at every step.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShare(true)}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Timeline
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </motion.button>
          </div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto" ref={ref}>
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 dark:from-blue-900/50 dark:via-purple-900/50 dark:to-pink-900/50 transform md:-translate-x-1/2"></div>

          {/* Timeline events */}
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative mb-12 md:mb-24 ${
                index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"
              } w-full md:w-1/2 pl-12 md:pl-0`}
              onMouseEnter={() => setActiveEvent(event.id)}
              onMouseLeave={() => setActiveEvent(null)}
            >
              {/* Timeline dot */}
              <motion.div 
                className={`absolute left-0 md:left-auto ${
                  index % 2 === 0 ? "md:right-0 md:-mr-3.5" : "md:left-0 md:-ml-3.5"
                } top-1.5 w-7 h-7 rounded-full border-4 border-white dark:border-gray-800 z-10 ${
                  activeEvent === event.id 
                    ? getColorClass(event.color, true)
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
                animate={{
                  scale: activeEvent === event.id ? 1.2 : 1,
                  transition: { duration: 0.2 }
                }}
              />

              {/* Content */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg ${
                  activeEvent === event.id ? `ring-2 ${getColorClass(event.color).replace('text-', 'ring-')}` : ""
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl ${getColorClass(event.color, true)}`}>
                    {getIcon(event.icon, `w-6 h-6 ${getColorClass(event.color)}`)}
                  </div>
                  <span className={`ml-3 text-sm font-semibold ${getColorClass(event.color)}`}>
                    {event.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {event.description}
                </p>

                {/* Stats */}
                {event.stats && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {event.stats.map((stat, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Milestones */}
                {activeEvent === event.id && event.milestones && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Milestones:</h4>
                    <ul className="space-y-2">
                      {event.milestones.map((milestone, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {milestone}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                {activeEvent === event.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <motion.a
                      href="#learn-more"
                      className={`inline-flex items-center font-medium ${getColorClass(event.color)} hover:underline`}
                      whileHover={{ x: 5 }}
                    >
                      Learn more <ArrowRight className="ml-1 w-4 h-4" />
                    </motion.a>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/login"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Begin Your Journey</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShare(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Share Your Timeline
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Users className="w-4 h-4" />
                  Share with Team
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Timeline
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}