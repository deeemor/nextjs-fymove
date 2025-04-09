"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";

interface SuccessStory {
  id: string;
  name: string;
  age: number;
  condition: string;
  quote: string;
  image: string;
  rating: number;
  duration: string;
  improvement: string;
}

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const stories: SuccessStory[] = [
    {
      id: "story1",
      name: "Michael Johnson",
      age: 42,
      condition: "ACL Reconstruction",
      quote: "After my knee surgery, I was worried I'd never play basketball again. FyMove's personalized program and real-time feedback helped me recover faster than I expected. I'm back on the court and feeling stronger than ever!",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 5,
      duration: "4 months",
      improvement: "95% mobility restored"
    },
    {
      id: "story2",
      name: "Sarah Williams",
      age: 35,
      condition: "Rotator Cuff Injury",
      quote: "As a professional swimmer, my shoulder injury was devastating. The FyMove team created a rehabilitation program that was challenging yet achievable. The mobile app kept me accountable, and the smart sensors ensured I was performing exercises correctly.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
      rating: 5,
      duration: "6 months",
      improvement: "Full range of motion"
    },
    {
      id: "story3",
      name: "David Chen",
      age: 58,
      condition: "Stroke Recovery",
      quote: "After my stroke, I struggled with basic movements. The FyMove virtual reality therapy made rehabilitation engaging and less frustrating. The progress tracking gave me hope as I could see improvements day by day. I've regained independence I thought was lost forever.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4,
      duration: "12 months",
      improvement: "80% function restored"
    }
  ];

  const nextStory = () => {
    setActiveIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const prevStory = () => {
    setActiveIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  return (
      <section id="successStories" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Patient Stories
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
            Success Stories
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real patients, real results. Discover how FyMove has transformed rehabilitation journeys.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={stories[activeIndex].image}
                    alt={stories[activeIndex].name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent"></div>
                </div>

                <div className="p-8 md:p-12 relative">
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-100 dark:text-blue-900/30" />
                  
                  <div className="mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < stories[activeIndex].rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-8 relative z-10">
                    "{stories[activeIndex].quote}"
                  </blockquote>

                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {stories[activeIndex].name}, {stories[activeIndex].age}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        {stories[activeIndex].condition}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 space-y-1">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium mr-2">Recovery Time:</span>
                        {stories[activeIndex].duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium mr-2">Result:</span>
                        {stories[activeIndex].improvement}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevStory}
              className="bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextStory}
              className="bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Start Your Success Story
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}