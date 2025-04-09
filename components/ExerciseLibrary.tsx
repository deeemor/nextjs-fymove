"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Play, Clock, BarChart3, Target, Info, Heart, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  bodyPart: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  description: string;
  steps: string[];
  benefits: string[];
  precautions: string[];
  equipment: string[];
  isFavorite: boolean;
}

function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Strength',
    'Flexibility',
    'Balance',
    'Endurance',
    'Coordination'
  ];

  const bodyParts = [
    'All',
    'Knee',
    'Shoulder',
    'Back',
    'Neck',
    'Hip',
    'Ankle',
    'Wrist',
    'Elbow'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const exercises: Exercise[] = [
    {
      id: '1',
      title: 'Seated Knee Extension',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Strength',
      bodyPart: 'Knee',
      difficulty: 'Beginner',
      duration: 5,
      description: 'A simple exercise to strengthen the quadriceps muscles after knee injury or surgery.',
      steps: [
        'Sit on a chair with your back straight and feet flat on the floor.',
        'Slowly extend your right leg until its parallel to the floor.',
        'Hold for 5 seconds, focusing on tightening your thigh muscle.',
        'Slowly lower your leg back to the starting position.',
        'Repeat 10 times, then switch to your left leg.'
      ],
      benefits: [
        'Strengthens quadriceps muscles',
        'Improves knee stability',
        'Reduces pain and stiffness',
        'Enhances range of motion'
      ],
      precautions: [
        'Avoid locking your knee at full extension',
        'Stop if you experience sharp pain',
        'Start with fewer repetitions if needed'
      ],
      equipment: ['Chair'],
      isFavorite: false
    },
    {
      id: '2',
      title: 'Pendulum Shoulder Exercise',
      thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Flexibility',
      bodyPart: 'Shoulder',
      difficulty: 'Beginner',
      duration: 3,
      description: 'A gentle exercise to improve shoulder mobility and reduce stiffness.',
      steps: [
        'Lean forward and support your weight with your unaffected arm on a table or chair.',
        'Let your affected arm hang down completely relaxed.',
        'Gently swing your arm in small circles, gradually increasing the size.',
        'Perform clockwise circles for 30 seconds, then counter-clockwise for 30 seconds.',
        'Repeat 2-3 times.'
      ],
      benefits: [
        'Increases shoulder mobility',
        'Reduces stiffness and pain',
        'Improves circulation to the joint',
        'Prepares the shoulder for more advanced exercises'
      ],
      precautions: [
        'Keep movements gentle and pain-free',
        'Let gravity do the work - dont force the movement',
        'Maintain good posture throughout'
      ],
      equipment: ['Table or chair for support'],
      isFavorite: false
    },
    {
      id: '3',
      title: 'Bird Dog Core Stabilization',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Balance',
      bodyPart: 'Back',
      difficulty: 'Intermediate',
      duration: 7,
      description: 'An effective exercise for improving core stability and strengthening the lower back.',
      steps: [
        'Start on your hands and knees in a tabletop position.',
        'Extend your right arm forward and left leg backward simultaneously.',
        'Keep your spine neutral and core engaged.',
        'Hold for 5 seconds, then return to the starting position.',
        'Repeat with the left arm and right leg.',
        'Perform 10 repetitions on each side.'
      ],
      benefits: [
        'Strengthens core and back muscles',
        'Improves balance and coordination',
        'Enhances spinal stability',
        'Reduces risk of lower back pain'
      ],
      precautions: [
        'Keep your movements slow and controlled',
        'Maintain a neutral spine - dont arch your back',
        'Avoid this exercise if you have acute back pain'
      ],
      equipment: ['Exercise mat'],
      isFavorite: false
    },
    {
      id: '4',
      title: 'Ankle Alphabet',
      thumbnail: 'https://images.unsplash.com/photo-1508002366005-75a695ee2d17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Flexibility',
      bodyPart: 'Ankle',
      difficulty: 'Beginner',
      duration: 4,
      description: 'A simple exercise to improve ankle mobility and flexibility after injury.',
      steps: [
        'Sit in a chair with your foot elevated slightly off the floor.',
        'Using your big toe as a pointer, "write" the alphabet in the air.',
        'Move only your ankle, keeping your leg stationary.',
        'Complete the entire alphabet once.',
        'Repeat with the other ankle if needed.'
      ],
      benefits: [
        'Increases ankle range of motion',
        'Strengthens ankle muscles',
        'Improves proprioception',
        'Reduces stiffness and swelling'
      ],
      precautions: [
        'Move within a pain-free range',
        'Stop if you experience increased pain',
        'Take breaks if needed'
      ],
      equipment: ['Chair'],
      isFavorite: false
    },
    {
      id: '5',
      title: 'Wall Slides for Shoulder',
      thumbnail: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Strength',
      bodyPart: 'Shoulder',
      difficulty: 'Intermediate',
      duration: 6,
      description: 'An effective exercise for improving shoulder mobility and strengthening the rotator cuff.',
      steps: [
        'Stand with your back against a wall, feet shoulder-width apart.',
        'Place your arms against the wall in a "W" position (elbows bent at 90 degrees).',
        'Slowly slide your arms up the wall while keeping your elbows, wrists, and hands in contact with the wall.',
        'Raise your arms as high as comfortable, then slowly lower back to the starting position.',
        'Repeat 10-15 times.'
      ],
      benefits: [
        'Improves shoulder mobility',
        'Strengthens rotator cuff muscles',
        'Corrects posture',
        'Reduces risk of shoulder impingement'
      ],
      precautions: [
        'Keep your back flat against the wall',
        'Move within a pain-free range',
        'Avoid shrugging your shoulders'
      ],
      equipment: ['Wall'],
      isFavorite: false
    },
    {
      id: '6',
      title: 'Single Leg Balance',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Balance',
      bodyPart: 'Knee',
      difficulty: 'Beginner',
      duration: 5,
      description: 'A fundamental exercise to improve balance and proprioception after lower extremity injury.',
      steps: [
        'Stand near a counter or sturdy chair for support if needed.',
        'Shift your weight to one leg and lift the other foot slightly off the floor.',
        'Maintain your balance for 30 seconds.',
        'For an added challenge, try closing your eyes or standing on an unstable surface.',
        'Switch legs and repeat.'
      ],
      benefits: [
        'Improves balance and stability',
        'Enhances proprioception',
        'Strengthens ankle, knee, and hip stabilizers',
        'Reduces risk of falls'
      ],
      precautions: [
        'Have a stable support nearby',
        'Start with shorter durations if needed',
        'Avoid if you have severe balance issues without supervision'
      ],
      equipment: ['Chair for support (optional)'],
      isFavorite: false
    }
  ];

  useEffect(() => {
    // Initialize favorites from exercises
    const initialFavorites: Record<string, boolean> = {};
    exercises.forEach(exercise => {
      initialFavorites[exercise.id] = exercise.isFavorite;
    });
    setFavorites(initialFavorites);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = searchQuery === '' || 
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesBodyPart = selectedBodyPart === 'All' || exercise.bodyPart === selectedBodyPart;
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesBodyPart && matchesDifficulty;
  });

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  return (
    <>
      <section id="exercises" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">Rehabilitation Resources</span>
            <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">Exercise Library</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse our comprehensive collection of rehabilitation exercises, designed by medical professionals to help you recover effectively and safely.
            </p>
          </motion.div>

          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-5 h-5" />
                <span>Filter</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Category</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <input
                              type="radio"
                              id={`category-${category}`}
                              name="category"
                              checked={selectedCategory === category}
                              onChange={() => setSelectedCategory(category)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={`category-${category}`} className="ml-2 text-gray-700 dark:text-gray-300">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Body Part</h3>
                      <div className="space-y-2">
                        {bodyParts.map((part) => (
                          <div key={part} className="flex items-center">
                            <input
                              type="radio"
                              id={`body-${part}`}
                              name="bodyPart"
                              checked={selectedBodyPart === part}
                              onChange={() => setSelectedBodyPart(part)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={`body-${part}`} className="ml-2 text-gray-700 dark:text-gray-300">
                              {part}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Difficulty</h3>
                      <div className="space-y-2">
                        {difficulties.map((difficulty) => (
                          <div key={difficulty} className="flex items-center">
                            <input
                              type="radio"
                              id={`difficulty-${difficulty}`}
                              name="difficulty"
                              checked={selectedDifficulty === difficulty}
                              onChange={() => setSelectedDifficulty(difficulty)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={`difficulty-${difficulty}`} className="ml-2 text-gray-700 dark:text-gray-300">
                              {difficulty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <motion.button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedBodyPart('All');
                        setSelectedDifficulty('All');
                      }}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reset Filters
                    </motion.button>
                    <motion.button
                      onClick={() => setIsFilterOpen(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply Filters
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {filteredExercises.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredExercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={exercise.thumbnail} 
                      alt={exercise.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          {exercise.category}
                        </span>
                        <motion.button
                          onClick={() => toggleFavorite(exercise.id)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-1 rounded-full ${
                            favorites[exercise.id] ? 'text-red-500' : 'text-white'
                          }`}
                        >
                          <Heart className="w-5 h-5" fill={favorites[exercise.id] ? "currentColor" : "none"} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {exercise.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Target className="w-4 h-4 mr-1" />
                        <span>{exercise.bodyPart}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        <span>{exercise.difficulty}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{exercise.duration} min</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {exercise.description}
                    </p>
                    
                    <motion.button
                      onClick={() => setSelectedExercise(exercise)}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" />
                      <span>View Exercise</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No exercises found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your search or filters to find exercises that match your criteria.
              </p>
              <motion.button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedBodyPart('All');
                  setSelectedDifficulty('All');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          )}

          {filteredExercises.length > 0 && (
            <motion.div 
              className="mt-8 flex justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="flex items-center gap-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </motion.button>
              <div className="flex items-center gap-1">
                <span className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</span>
                <span className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer">2</span>
                <span className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer">3</span>
              </div>
              <motion.button
                className="flex items-center gap-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Exercise Detail Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedExercise(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={selectedExercise.thumbnail} 
                  alt={selectedExercise.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {selectedExercise.category}
                    </span>
                    <motion.button
                      onClick={() => toggleFavorite(selectedExercise.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-1 rounded-full ${
                        favorites[selectedExercise.id] ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      <Heart className="w-6 h-6" fill={favorites[selectedExercise.id] ? "currentColor" : "none"} />
                    </motion.button>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedExercise.title}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-sm text-gray-200">
                      <Target className="w-4 h-4 mr-1" />
                      <span>{selectedExercise.bodyPart}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      <span>{selectedExercise.difficulty}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{selectedExercise.duration} min</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedExercise.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Steps
                  </h3>
                  <ol className="space-y-3 list-decimal list-inside text-gray-600 dark:text-gray-300">
                    {selectedExercise.steps.map((step, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="pl-2"
                      >
                        {step}
                      </motion.li>
                    ))}
                  </ol>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Benefits
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      {selectedExercise.benefits.map((benefit, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                      Precautions
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      {selectedExercise.precautions.map((precaution, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{precaution}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Equipment Needed</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExercise.equipment.map((item, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <motion.button
                    onClick={() => setSelectedExercise(null)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to My Program
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ExerciseLibrary;