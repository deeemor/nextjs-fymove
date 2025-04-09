"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, ChevronRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Recovery Patient',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200',
    quote: 'The personalized care and innovative approach at FyMove transformed my recovery journey. The teams dedication and support made all the difference.',
    rating: 5,
    achievement: '100% Recovery',
    duration: '3 months'
  },
  {
    name: 'Michael Chen',
    role: 'Sports Injury Patient',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200',
    quote: 'As a professional athlete, I needed specialized care that understood my goals. FyMove provided exactly that, helping me return to peak performance.',
    rating: 5,
    achievement: 'Back to Pro Sports',
    duration: '4 months'
  },
  {
    name: 'Emma Wilson',
    role: 'Rehabilitation Patient',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200',
    quote: 'The combination of traditional therapy and cutting-edge technology made my rehabilitation both effective and engaging. I\'m grateful for their expertise.',
    rating: 5,
    achievement: 'Full Mobility',
    duration: '6 months'
  }
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
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
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Success Stories</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our Patients
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Say About Us
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real stories from real patients who have experienced the transformative 
            power of our rehabilitation programs.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200" />
              
              <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-600/20 dark:text-blue-400/20" />
                  <p className="text-gray-600 dark:text-gray-300 italic pl-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Achievement</p>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">
                        {testimonial.achievement}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Duration</p>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">
                        {testimonial.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 opacity-10"
            >
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">
              Start Your Success Story Today
            </h2>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto relative z-10">
              Join our community of successful recoveries and experience the 
              difference of personalized rehabilitation care.
            </p>
            
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 group"
            >
              Begin Your Journey
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}