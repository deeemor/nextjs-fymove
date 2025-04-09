"use client";

import { useState, useRef } from 'react';
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const faqRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(faqRef, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: 'What is FyMove and how does it work?',
      answer: 'FyMove is a comprehensive rehabilitation platform that combines expert guidance with smart technology. It works by providing personalized exercise programs, progress tracking, and professional support throughout your recovery journey.'
    },
    {
      question: 'How long does a typical rehabilitation program last?',
      answer: 'The duration of rehabilitation varies depending on your specific condition and goals. Programs typically range from 6-12 weeks, but can be adjusted based on your progress and needs.'
    },
    {
      question: 'Do I need special equipment for the exercises?',
      answer: 'Most exercises can be performed with minimal or no equipment. When equipment is needed, we provide alternatives or recommendations for affordable options.'
    },
    {
      question: 'How often should I perform the exercises?',
      answer: 'Exercise frequency depends on your personalized program. Typically, we recommend 3-5 sessions per week, but this can vary based on your condition and progress.'
    },
    {
      question: 'Can I use FyMove alongside traditional physical therapy?',
      answer: 'Yes, FyMove is designed to complement traditional physical therapy. Many users combine both approaches for optimal results.'
    },
    {
      question: 'Is my medical data secure on the platform?',
      answer: 'Absolutely. We take data security very seriously. All your medical information is encrypted and stored securely following HIPAA guidelines and international data protection standards.'
    },
    {
      question: 'Can I access FyMove on multiple devices?',
      answer: 'Yes, FyMove is accessible across devices. You can use it on your smartphone, tablet, or computer, and your progress will sync automatically.'
    }
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

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

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />
      </div>
      
      <motion.div 
        ref={faqRef}
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <span className="px-4 py-2 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium inline-flex items-center">
            <HelpCircle className="w-4 h-4 mr-2" />
            Got Questions?
          </span>
          
          <h2 className="text-4xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our rehabilitation services
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div 
          className="max-w-3xl mx-auto mb-10"
          variants={itemVariants}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-md"
            />
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto space-y-4"
          variants={containerVariants}
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.button
                  className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 shadow-md' 
                      : 'bg-white dark:bg-gray-800 shadow hover:shadow-md'
                  }`}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-3 text-gradient from-blue-600 to-purple-600" />
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ml-4 p-1 rounded-full ${
                      activeIndex === index 
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <ChevronDown className={`w-5 h-5 ${
                      activeIndex === index 
                        ? 'text-gradient from-blue-600 to-purple-600' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`} />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-white dark:bg-gray-800 shadow-inner rounded-b-lg mt-1 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-10"
              variants={itemVariants}
            >
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No matching questions found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try a different search term or browse all questions above</p>
            </motion.div>
          )}
        </motion.div>
        
        {/* Additional help section */}
        <motion.div 
          className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-blue-100">Our support team is here to help you with any questions you might have.</p>
            </div>
            <motion.a
              href="/contact"
              className="px-6 py-3 text-blue-600 bg-white text-gradient from-blue-600 to-purple-600 rounded-full font-medium shadow-lg hover:shadow-blue-500/30 transition-all whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default FAQ;