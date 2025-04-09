'use client';

import { useState } from 'react';
import { Heart, Brain, Activity, Baby, Eye, Calendar, Star, ChevronRight, Search, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Departments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const departments = [
    {
      id: 'cardiology',
      icon: <Heart className="w-6 h-6" />,
      title: 'Advanced Cardiac Care',
      shortDesc: 'State-of-the-art cardiac rehabilitation',
      description: 'Utilizing cutting-edge cardiac monitoring and AI-driven rehabilitation protocols to provide personalized heart care and recovery programs.',
      features: [
        {
          title: 'Smart Heart Monitoring',
          desc: '24/7 real-time cardiac activity tracking'
        },
        {
          title: 'AI-Powered Analysis',
          desc: 'Predictive health insights and recommendations'
        },
        {
          title: 'Remote Care Platform',
          desc: 'Virtual consultations and monitoring'
        },
        {
          title: 'Lifestyle Integration',
          desc: 'Personalized nutrition and exercise plans'
        }
      ],
      stats: {
        success: '95%',
        patients: '1,200+',
        specialists: 8,
        rating: 4.9
      },
      imageUrl: 'images/department/herz.jpg',
      availability: 'Immediate',
      certification: 'Gold Standard'
    },
    {
      id: 'neurology',
      icon: <Brain className="w-6 h-6" />,
      title: 'Cognitive Rehabilitation',
      shortDesc: 'Revolutionary brain recovery techniques',
      description: 'Pioneering neurological rehabilitation through VR technology and cognitive enhancement protocols for optimal brain recovery and function.',
      features: [
        {
          title: 'VR Therapy Suite',
          desc: 'Immersive cognitive training environments'
        },
        {
          title: 'Neural Tracking',
          desc: 'Advanced brain activity monitoring'
        },
        {
          title: 'Adaptive Programs',
          desc: 'Personalized cognitive exercises'
        },
        {
          title: 'Progress Mapping',
          desc: 'Detailed recovery visualization'
        }
      ],
      stats: {
        success: '92%',
        patients: '800+',
        specialists: 6,
        rating: 4.8
      },
      imageUrl: 'images/department/d6.jpg',
      availability: '24 Hours',
      certification: 'Platinum Level'
    },
    {
      id: 'sports',
      icon: <Activity className="w-6 h-6" />,
      title: 'Elite Sports Medicine',
      shortDesc: 'Professional athlete recovery programs',
      description: 'Advanced sports rehabilitation combining motion capture technology, biomechanical analysis, and personalized recovery protocols.',
      features: [
        {
          title: '3D Movement Analysis',
          desc: 'High-precision motion tracking'
        },
        {
          title: 'Performance Labs',
          desc: 'State-of-the-art testing facilities'
        },
        {
          title: 'Recovery Tech',
          desc: 'Advanced rehabilitation equipment'
        },
        {
          title: 'Sport-Specific Plans',
          desc: 'Customized training protocols'
        }
      ],
      stats: {
        success: '94%',
        patients: '2,000+',
        specialists: 10,
        rating: 4.9
      },
      imageUrl: 'images/t3.jpg',
      availability: 'Flexible',
      certification: 'Elite Status'
    },
    {
      id: 'pediatrics',
      icon: <Baby className="w-6 h-6" />,
      title: 'Child Development Center',
      shortDesc: 'Specialized pediatric care programs',
      description: 'Child-focused rehabilitation using gamification and interactive therapy techniques for engaging and effective recovery journeys.',
      features: [
        {
          title: 'Play Therapy',
          desc: 'Interactive rehabilitation games'
        },
        {
          title: 'Development Tracking',
          desc: 'Comprehensive progress monitoring'
        },
        {
          title: 'Family Integration',
          desc: 'Parent-involved therapy sessions'
        },
        {
          title: 'Smart Adaptations',
          desc: 'AI-adjusted difficulty levels'
        }
      ],
      stats: {
        success: '96%',
        patients: '1,500+',
        specialists: 12,
        rating: 4.9
      },
      imageUrl: 'images/department/kinder.jpg',
      availability: '7 Days',
      certification: 'Family Choice'
    },
    {
      id: 'vision',
      icon: <Eye className="w-6 h-6" />,
      title: 'Vision Excellence Center',
      shortDesc: 'Cutting-edge visual rehabilitation',
      description: 'Revolutionary vision therapy utilizing advanced eye-tracking technology and neural adaptation techniques for optimal visual recovery.',
      features: [
        {
          title: 'Neural Adaptation',
          desc: 'Brain-vision coordination training'
        },
        {
          title: 'Digital Assessment',
          desc: 'Precision visual analysis'
        },
        {
          title: 'VR Integration',
          desc: 'Immersive vision exercises'
        },
        {
          title: 'Progress Tracking',
          desc: 'Detailed improvement metrics'
        }
      ],
      stats: {
        success: '91%',
        patients: '900+',
        specialists: 7,
        rating: 4.8
      },
      imageUrl: 'images/department/augen.jpg',
      availability: 'Scheduled',
      certification: 'Excellence Award'
    }
  ];

  const [activeDepartment, setActiveDepartment] = useState(departments[0]);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const filteredDepartments = departments.filter(dept =>
    dept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="departments" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-medium shadow-lg">
              World-Class Medical Departments
            </span>
          </motion.div>
          
          <h2 className="text-5xl font-bold mt-6 mb-4 text-gray-900 dark:text-white leading-tight">
            Specialized Care <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Departments</span>
          </h2>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Experience healthcare excellence through our specialized departments, 
            where cutting-edge technology meets compassionate care for optimal recovery outcomes.
          </p>

          <div className="mt-8 max-w-md mx-auto relative">
            <div className={`relative transition-all duration-300 ${
              isSearchFocused ? 'scale-105' : 'scale-100'
            }`}>
              <input
                type="text"
                placeholder="Search departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg
                  focus:outline-none focus:border-purple-500 transition-all duration-300"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Select Department
              </h3>
              <div className="space-y-3">
                {filteredDepartments.map((dept) => (
                  <motion.button
                    key={dept.id}
                    onClick={() => setActiveDepartment(dept)}
                    onMouseEnter={() => setIsHovering(dept.id)}
                    onMouseLeave={() => setIsHovering(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all ${
                      activeDepartment.id === dept.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${
                      activeDepartment.id === dept.id 
                        ? 'bg-white/20' 
                        : 'bg-white dark:bg-gray-800'
                    }`}>
                      <div className={activeDepartment.id === dept.id ? 'text-white' : 'text-purple-600 dark:text-purple-400'}>
                        {dept.icon}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold block">{dept.title}</span>
                      <span className="text-sm opacity-80">{dept.shortDesc}</span>
                    </div>
                    {activeDepartment.id === dept.id && (
                      <ChevronRight className="ml-auto w-5 h-5" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDepartment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    src={activeDepartment.imageUrl}
                    alt={activeDepartment.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-600/20 backdrop-blur-sm rounded-lg">
                        {activeDepartment.icon}
                      </div>
                      <div className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-sm">
                        {activeDepartment.availability} Availability
                      </div>
                      <div className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" /> {activeDepartment.stats.rating}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold">{activeDepartment.title}</h2>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {activeDepartment.stats.success}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {activeDepartment.stats.patients}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Patients Treated</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {activeDepartment.stats.specialists}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Specialists</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {activeDepartment.certification}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Certification</div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                    {activeDepartment.description}
                  </p>

                  <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                    Advanced Features & Technologies
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {activeDepartment.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          selectedFeature === feature.title
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                            : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setSelectedFeature(
                          selectedFeature === feature.title ? null : feature.title
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            selectedFeature === feature.title
                              ? 'bg-white/20'
                              : 'bg-purple-100 dark:bg-gray-600'
                          }`}>
                            <CheckCircle2 className={`w-5 h-5 ${
                              selectedFeature === feature.title
                                ? 'text-white'
                                : 'text-purple-600 dark:text-purple-400'
                            }`} />
                          </div>
                          <div>
                            <h4 className={`font-semibold ${
                              selectedFeature === feature.title
                                ? 'text-white'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {feature.title}
                            </h4>
                            <p className={`text-sm mt-1 ${
                              selectedFeature === feature.title
                                ? 'text-purple-100'
                                : 'text-gray-600 dark:text-gray-300'
                            }`}>
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium 
                        hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Schedule Consultation
                      <Calendar className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white 
                        px-6 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 
                        transition-colors flex items-center justify-center gap-2"
                    >
                      Virtual Tour
                      <Eye className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Departments;