'use client';

import { useState, useRef } from 'react';
import { Calendar, Mail, Phone, User, MessageSquare, Building2, UserRound, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

function Appointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: '',
    department: '',
    doctor: '',
    message: ''
  });
  
  const appointmentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(appointmentRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('loading');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          datetime: '',
          department: '',
          doctor: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const departments = [
    "Physical Therapy",
    "Occupational Therapy",
    "Sports Medicine",
    "Rehabilitation",
    "Neurological Rehabilitation",
    "Pediatric Rehabilitation"
  ];

  const doctors = [
    { name: "Dr. Sarah Wilson", department: "Physical Therapy" },
    { name: "Dr. John Carter", department: "Sports Medicine" },
    { name: "Dr. Emily Brown", department: "Occupational Therapy" },
    { name: "Dr. Michael Chen", department: "Rehabilitation" },
    { name: "Dr. Lisa Rodriguez", department: "Neurological Rehabilitation" },
    { name: "Dr. David Kim", department: "Pediatric Rehabilitation" }
  ];

  const filteredDoctors = formData.department 
    ? doctors.filter(doctor => doctor.department === formData.department)
    : doctors;

  return (
    <section id="appointment" ref={appointmentRef} className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800" />
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full opacity-70" />
        <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-indigo-50 dark:bg-indigo-900/10 rounded-tr-full opacity-70" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium inline-flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Book Your Session
          </span>
          
          <h2 className="text-4xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">
            Make an Appointment
          </h2>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Schedule your consultation with our expert medical professionals. We're here to help you on your journey to recovery.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-3">
              {/* Left sidebar with info */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Working Hours</h4>
                      <p className="text-blue-100 text-sm mt-1">Monday - Friday: 8am - 8pm</p>
                      <p className="text-blue-100 text-sm">Saturday: 9am - 5pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-blue-100 text-sm mt-1">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-blue-100 text-sm mt-1">appointments@fymove.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h4 className="font-medium mb-3">Follow Us</h4>
                  <div className="flex space-x-3">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                      <a 
                        key={social}
                        href={`#${social}`}
                        className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <span className="sr-only">{social}</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Form */}
              <div className="md:col-span-2 p-8">
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Appointment Scheduled!</h3>
                      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
                        Your appointment request has been sent successfully. We'll contact you shortly to confirm the details.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        A confirmation email has been sent to {formData.email}
                      </p>
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-6">
                        <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
                      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
                        There was an error submitting your appointment request. Please try again or contact us directly.
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
                            Your Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
                              placeholder="John Doe"
                            />
                            <User className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
                              placeholder="john@example.com"
                            />
                            <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
                            Phone Number
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
                              placeholder="+1 (555) 123-4567"
                            />
                            <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
                            Preferred Date & Time
                          </label>
                          <div className="relative">
                            <input
                              type="datetime-local"
                              name="datetime"
                              value={formData.datetime}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
                            />
                            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
                            Department
                          </label>
                          <div className="relative">
                            <select
                              name="department"
                              value={formData.department}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10 appearance-none"
                            >
                              <option value="">Select Department</option>
                              {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                              ))}
                            </select>
                            <Building2 className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
                            Doctor
                          </label>
                          <div className="relative">
                            <select
                              name="doctor"
                              value={formData.doctor}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10 appearance-none"
                            >
                              <option value="">Select Doctor</option>
                              {filteredDoctors.map((doctor) => (
                                <option key={doctor.name} value={doctor.name}>{doctor.name}</option>
                              ))}
                            </select>
                            <UserRound className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
                          Additional Message
                        </label>
                        <div className="relative">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10 min-h-[120px]"
                            placeholder="Any specific concerns or requirements..."
                          ></textarea>
                          <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-4" />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                          <span className={isSubmitting ? "opacity-0" : "opacity-100"}>
                            Make an Appointment
                          </span>
                          {isSubmitting && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Appointment;