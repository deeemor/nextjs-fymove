"use client";

import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram, Linkedin, Activity, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

function Footer() {
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

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" }
  ];

  const quickLinks = ['Home', 'About', 'Services', 'Doctors', 'Contact'];
  const services = [
    'Physical Therapy',
    'Occupational Therapy',
    'Sports Rehabilitation',
    'Neurological Rehabilitation',
    'Pediatric Rehabilitation'
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <motion.div 
        className="container mx-auto px-4 pt-16 pb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div 
            className="md:col-span-4 space-y-6"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">FyMove</h3>
            </div>
            <p className="text-gray-400">
              Revolutionizing rehabilitation through smart technology and personalized care. Join us in the journey to better health and mobility.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <a href={`#${link.toLowerCase()}`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <motion.li 
                  key={service}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <a href="#services" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>City Riadh, Sousse, Tunisia</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+216 11 111 111</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>info@fymove.com</span>
              </li>
            </ul>

            {/* App Download Section */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Download Our App</h4>
              <div className="flex flex-col space-y-3">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative h-10 w-32 transition-transform hover:opacity-80"
                >
                  <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative h-10 w-32 transition-transform hover:opacity-80"
                >
                  <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} FyMove. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;