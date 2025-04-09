"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin,
  Stethoscope,
  Award,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Doctors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const doctors = [
    {
      name: 'Dr. Sarah Wilson',
      specialty: 'Physical Therapy Specialist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&h=1000',
      description: 'Expert in advanced rehabilitation techniques and motion analysis.',
      achievements: ['15+ Years Experience', '200+ Research Papers', 'Innovation Award 2023'],
      social: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Dr. John Carter',
      specialty: 'Sports Rehabilitation',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&h=1000',
      description: 'Specialized in athletic recovery and performance optimization.',
      achievements: ['Olympic Team Doctor', 'Sports Medicine Pioneer', 'Best Practice Award'],
      social: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Dr. Emily Parker',
      specialty: 'Neurological Rehabilitation',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&h=1000',
      description: 'Focused on innovative brain injury recovery techniques.',
      achievements: ['PhD in Neuroscience', 'Research Excellence', 'Patient Choice Award'],
      social: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Digital Health Expert',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&h=1000',
      description: 'Pioneer in AI-powered rehabilitation programs.',
      achievements: ['Tech Innovator 2023', 'Digital Health Leader', 'ML Research Lead'],
      social: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    }
  ];

  const stats = [
    { icon: <Stethoscope className="w-6 h-6" />, value: '15+', label: 'Years of Excellence' },
    { icon: <Award className="w-6 h-6" />, value: '50+', label: 'Awards Won' },
    { icon: <GraduationCap className="w-6 h-6" />, value: '1000+', label: 'Patients Treated' },
  ];

  return (
    <section 
      ref={ref}
      id="doctors" 
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
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Meet Our Experts</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            World-Class Team of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Medical Specialists
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our team combines decades of experience with cutting-edge innovation to deliver 
            the best possible care for our patients.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-center gap-4"
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200" />
              
              <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-6"
                  >
                    <div className="flex gap-4">
                      {Object.entries(doctor.social).map(([platform, link]) => (
                        <motion.a
                          key={platform}
                          href={link}
                          whileHover={{ scale: 1.2 }}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                          {platform === 'facebook' && <Facebook className="w-5 h-5" />}
                          {platform === 'instagram' && <Instagram className="w-5 h-5" />}
                          {platform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-3">{doctor.specialty}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {doctor.description}
                  </p>
                  <div className="space-y-2">
                    {doctor.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}