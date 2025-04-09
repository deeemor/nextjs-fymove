"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, Share2, Filter, Users, TrendingUp, Award, Clock, Tag, ChevronRight, Search } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  content: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  isLiked: boolean;
}

interface Category {
  name: string;
  count: number;
  icon: React.ReactNode;
}

function CommunityForum() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const categories: Category[] = [
    { name: 'All', count: 124, icon: <Filter className="w-4 h-4" /> },
    { name: 'Recovery Tips', count: 45, icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Success Stories', count: 32, icon: <Award className="w-4 h-4" /> },
    { name: 'Questions', count: 28, icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Exercise Help', count: 19, icon: <Users className="w-4 h-4" /> },
  ];

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'How I recovered from ACL surgery in record time',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'Community Member',
      },
      category: 'Success Stories',
      tags: ['knee', 'surgery', 'recovery'],
      content: 'I wanted to share my journey recovering from ACL reconstruction. The FyMove program helped me track my progress and stay motivated throughout the entire process...',
      likes: 48,
      comments: 23,
      shares: 7,
      timeAgo: '2 days ago',
      isLiked: false,
    },
    {
      id: '2',
      title: 'Best exercises for chronic lower back pain?',
      author: {
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        role: 'Verified Patient',
      },
      category: 'Questions',
      tags: ['back pain', 'exercises', 'chronic'],
      content: 'Ive been dealing with lower back pain for years and recently started using FyMove. Im looking for recommendations on the most effective exercises that have worked for others...',
      likes: 32,
      comments: 41,
      shares: 3,
      timeAgo: '5 hours ago',
      isLiked: false,
    },
    {
      id: '3',
      title: 'Weekly progress tracking improved my motivation',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        role: 'Community Member',
      },
      category: 'Recovery Tips',
      tags: ['progress', 'motivation', 'tracking'],
      content: 'I wanted to share a tip that really helped me stay consistent with my rehabilitation program. Setting up weekly progress photos and measurements in the app has been a game-changer...',
      likes: 76,
      comments: 18,
      shares: 12,
      timeAgo: '1 week ago',
      isLiked: false,
    },
  ];

  const communityStats = {
    members: 12453,
    posts: 8742,
    activeUsers: 1243,
    topContributors: [
      { name: 'Dr. Lisa Wong', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', posts: 142 },
      { name: 'James Peterson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', posts: 98 },
      { name: 'Sophia Martinez', avatar: 'https://randomuser.me/api/portraits/women/57.jpg', posts: 87 },
    ],
  };

  const handleLikePost = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
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

  return (
    <section id="community" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">Join The Conversation</span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">Community Forum</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with others on similar rehabilitation journeys, share experiences, and get valuable advice from our community of patients and experts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Posts */}
          <motion.div 
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Search and Filter */}
            <motion.div 
              className="mb-6 flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 no-scrollbar">
                {categories.map((category) => (
                  <motion.button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap ${
                      activeCategory === category.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                    <span className="text-xs opacity-80">({category.count})</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Posts */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name} 
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{post.author.name}</h4>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <span className="mr-2">{post.author.role}</span>
                              <span>•</span>
                              <span className="ml-2">{post.timeAgo}</span>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {post.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex space-x-4">
                            <motion.button 
                              className={`flex items-center space-x-1 ${
                                likedPosts[post.id] 
                                  ? 'text-red-500' 
                                  : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500'
                              }`}
                              onClick={() => handleLikePost(post.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart className="w-5 h-5" fill={likedPosts[post.id] ? "currentColor" : "none"} />
                              <span>{likedPosts[post.id] ? post.likes + 1 : post.likes}</span>
                            </motion.button>
                            
                            <motion.button 
                              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <MessageSquare className="w-5 h-5" />
                              <span>{post.comments}</span>
                            </motion.button>
                            
                            <motion.button 
                              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Share2 className="w-5 h-5" />
                              <span>{post.shares}</span>
                            </motion.button>
                          </div>
                          
                          <motion.button
                            className="text-blue-600 dark:text-blue-400 font-medium flex items-center"
                            whileHover={{ x: 5 }}
                          >
                            <span>Read more</span>
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No discussions found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div 
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <motion.a
                href="/community"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Discussions
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Sidebar - Community Stats */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Community Stats Card */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Community Stats</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {communityStats.members.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {communityStats.posts.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {communityStats.activeUsers.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Active Today</div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <h4 className="font-medium mb-3 text-gray-900 dark:text-white flex items-center">
                  <Award className="w-4 h-4 mr-2 text-yellow-500" />
                  Top Contributors
                </h4>
                <div className="space-y-3">
                  {communityStats.topContributors.map((contributor, index) => (
                    <motion.div 
                      key={contributor.name}
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <div className="relative">
                        <img 
                          src={contributor.avatar} 
                          alt={contributor.name} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-yellow-500 text-white text-xs rounded-full">
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {contributor.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {contributor.posts} posts
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Join Community Card */}
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-md overflow-hidden p-6 text-white"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-3">Join Our Community</h3>
              <p className="mb-4 opacity-90">
                Connect with others, share your journey, and get support from people who understand what you're going through.
              </p>
              <motion.button
                className="w-full bg-white text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now
              </motion.button>
            </motion.div>
            
            {/* Recent Activity */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="min-w-[40px] h-10 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">Alex Thompson</span> commented on "Managing pain after shoulder surgery"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="min-w-[40px] h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">Maria Garcia</span> liked "5 exercises for faster knee recovery"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">25 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="min-w-[40px] h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">Dr. James Wilson</span> joined the community
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <motion.a
                  href="/activity"
                  className="text-blue-600 dark:text-blue-400 font-medium flex items-center justify-center"
                  whileHover={{ x: 5 }}
                >
                  <span>View all activity</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CommunityForum;