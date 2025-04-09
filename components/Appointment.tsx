'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, Mail, Phone, User, MessageSquare, Building2, UserRound, Clock, CheckCircle, XCircle, Loader2, Star, Calendar as CalendarIcon, ChevronRight, BrainCog, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { format, addDays, isAfter, isBefore, setHours, setMinutes } from 'date-fns';
import { sendAppointmentForm } from '@/lib/api';
import { toast } from 'react-hot-toast';

function Appointment() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: '',
    department: '',
    doctor: '',
    message: '',
    symptoms: [] as string[],
    preferredTime: 'morning'
  });
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  
  const appointmentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(appointmentRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (formData.department && formData.doctor) {
      const generateTimeSlots = () => {
        const slots = [];
        const startDate = new Date();
        for (let i = 1; i <= 5; i++) {
          const date = addDays(startDate, i);
          const morningSlot = setMinutes(setHours(date, 9), 0);
          const afternoonSlot = setMinutes(setHours(date, 14), 0);
          if (isAfter(morningSlot, new Date())) {
            slots.push(format(morningSlot, "yyyy-MM-dd'T'HH:mm"));
          }
          if (isAfter(afternoonSlot, new Date())) {
            slots.push(format(afternoonSlot, "yyyy-MM-dd'T'HH:mm"));
          }
        }
        return slots;
      };

      setAvailableSlots(generateTimeSlots());
    }
  }, [formData.department, formData.doctor]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !selectedTimeSlot || !formData.department || !formData.doctor) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('loading');
  
    try {
      const submissionData = {
        ...formData,
        datetime: selectedTimeSlot,
      };

      console.log('Submitting appointment data:', submissionData);

      await sendAppointmentForm(submissionData);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        datetime: '',
        department: '',
        doctor: '',
        message: '',
        symptoms: [],
        preferredTime: 'morning'
      });
      setSelectedTimeSlot('');
      
      setSubmitStatus('success');
      toast.success('Appointment booked successfully!');
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      toast.error(error instanceof Error ? error.message : 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeSlotSelection = (slot: string) => {
    setSelectedTimeSlot(slot);
    setFormData(prev => ({ ...prev, datetime: slot }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const departments = [
    {
      name: "Physical Therapy",
      description: "Expert rehabilitation for injuries and chronic conditions",
      icon: "🦿"
    },
    {
      name: "Sports Medicine",
      description: "Specialized care for athletes and active individuals",
      icon: "⚽"
    },
    {
      name: "Neurological Rehabilitation",
      description: "Advanced treatment for neurological conditions",
      icon: "🧠"
    },
    {
      name: "Pediatric Care",
      description: "Specialized treatment for children",
      icon: "👶"
    },
    {
      name: "Orthopedic Rehabilitation",
      description: "Treatment for bone and joint conditions",
      icon: "🦴"
    },
    {
      name: "Cardiac Rehabilitation",
      description: "Heart health and recovery programs",
      icon: "❤️"
    }
  ];

  const doctors = [
    {
      name: "Dr. Sarah Wilson",
      department: "Physical Therapy",
      specialization: "Sports Injuries",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Dr. John Carter",
      department: "Sports Medicine",
      specialization: "Performance Enhancement",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Dr. Emily Brown",
      department: "Neurological Rehabilitation",
      specialization: "Stroke Recovery",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Dr. Michael Chen",
      department: "Orthopedic Rehabilitation",
      specialization: "Joint Replacement",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Dr. Lisa Rodriguez",
      department: "Pediatric Care",
      specialization: "Development Therapy",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  const filteredDoctors = formData.department 
    ? doctors.filter(doctor => doctor.department === formData.department)
    : doctors;

  const progressSteps = [
    { number: 1, title: "Department" },
    { number: 2, title: "Doctor" },
    { number: 3, title: "Details" },
    { number: 4, title: "Confirmation" }
  ];

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {progressSteps.map((progressStep, index) => (
          <div key={progressStep.number} className="flex items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full
              ${step >= progressStep.number 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500 dark:bg-gray-700'}
              transition-colors duration-200
            `}>
              {step > progressStep.number ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                progressStep.number
              )}
            </div>
            <span className="ml-2 text-sm font-medium hidden sm:block">
              {progressStep.title}
            </span>
            {index < progressSteps.length - 1 && (
              <div className={`
                h-1 w-12 sm:w-24 mx-2
                ${step > progressStep.number ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
                transition-colors duration-200
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDepartmentSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {departments.map((dept) => (
        <motion.div
          key={dept.name}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            p-6 rounded-xl cursor-pointer transition-all
            ${formData.department === dept.name
              ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
              : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800'}
            shadow-sm hover:shadow-md
          `}
          onClick={() => {
            setFormData(prev => ({ ...prev, department: dept.name }));
            setTimeout(() => setStep(2), 300);
          }}
        >
          <div className="flex items-start space-x-4">
            <div className="text-4xl">{dept.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {dept.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {dept.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderDoctorSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {filteredDoctors.map((doctor) => (
        <motion.div
          key={doctor.name}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            p-6 rounded-xl cursor-pointer transition-all
            ${formData.doctor === doctor.name
              ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
              : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800'}
            shadow-sm hover:shadow-md
          `}
          onClick={() => {
            setFormData(prev => ({ ...prev, doctor: doctor.name }));
            setTimeout(() => setStep(3), 300);
          }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {doctor.specialization}
              </p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  {doctor.rating}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderPersonalDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
            Your Name *
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
            Email Address *
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
            Phone Number *
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
            Preferred Time Slots *
          </label>
          <div className="grid grid-cols-2 gap-4">
            {availableSlots.map((slot) => (
              <motion.button
                key={slot}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTimeSlotSelection(slot)}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-all
                  ${selectedTimeSlot === slot
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
                `}
              >
                {format(new Date(slot), 'MMM d, h:mm a')}
              </motion.button>
            ))}
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

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <motion.button
          type="button"
          onClick={() => setStep(4)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );

  const renderConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Appointment Summary
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-900 dark:text-white">{formData.name}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Building2 className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
              <p className="font-medium text-gray-900 dark:text-white">{formData.department}</p>
            </div>
          </div>
          <div className="flex items-center">
            <UserRound className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Doctor</p>
              <p className="font-medium text-gray-900 dark:text-white">{formData.doctor}</p>
            </div>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Appointment Time</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedTimeSlot ? format(new Date(selectedTimeSlot), 'MMMM d, yyyy h:mm a') : 'Not selected'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Confirm Appointment'
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderSuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Appointment Scheduled Successfully!
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
        We've sent a confirmation email to {formData.email} with all the details.
        Our team will contact you shortly.
      </p>
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              datetime: '',
              department: '',
              doctor: '',
              message: '',
              symptoms: [],
              preferredTime: 'morning'
            });
            setStep(1);
            setSubmitStatus('idle');
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:bg-blue-400 transition-colors"
        >
          Book Another Appointment
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <section ref={appointmentRef} className="py-20 min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            {submitStatus !== 'success' && renderProgressBar()}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  renderSuccessMessage()
                ) : (
                  <div>
                    {step === 1 && renderDepartmentSelection()}
                    {step === 2 && renderDoctorSelection()}
                    {step === 3 && renderPersonalDetails()}
                    {step === 4 && renderConfirmation()}
                  </div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Appointment;