"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, XCircle } from "lucide-react";
import { sendSubForm } from "@/lib/api";
import { toast, Toaster } from 'react-hot-toast';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await sendSubForm({ email });
      toast.success('Message sent successfully!');
      setStatus('success');
      setEmail('');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-600 to-purple-600 ">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-full p-3"
            >
              <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-white">
            Stay Updated with Rehabilitation Insights
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest rehabilitation techniques, technology updates, and expert advice delivered directly to your inbox.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative flex-grow">
              <input
                type="email"  
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-blue-500/30 backdrop-blur-sm text-white placeholder-blue-200 border border-blue-400/30"
                disabled={status === "loading" || status === "success"}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
            </div>
            <motion.button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "loading" || status === "success"}
            >
              {status === "idle" && (
                <>
                  Subscribe <Send className="ml-2 w-4 h-4" />
                </>
              )}
              {status === "loading" && (
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              )}
              {status === "success" && (
                <>
                  Subscribed <CheckCircle className="ml-2 w-4 h-4" />
                </>
              )}
              {status === "error" && (
                <>
                  Try Again <XCircle className="ml-2 w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-blue-100"
            >
              Thank you for subscribing! Check your email to confirm your subscription.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-200"
            >
              Please enter a valid email address.
            </motion.p>
          )}

          <p className="text-blue-200 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}