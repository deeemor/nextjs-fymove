"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContextType";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const menuItems = [
    { label: t('navbar.home'), href: "#" },
    { label: t('navbar.about'), href: "#about" },
    { label: t('navbar.services'), href: "#services" },
    { label: t('navbar.departments'), href: "#departments" },
    { label: t('navbar.doctors'), href: "#doctors" },
    { label: t('navbar.contact'), href: "#contact" },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.1,
      color: "rgb(37, 99, 235)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-900/80" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a 
            href="/"
            variants={logoVariants}
            whileHover="hover"
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Activity className="w-8 h-8 text-blue-600 dark:text-blue-500" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              FyMove
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={menuItemVariants}
                whileHover="hover"
                custom={i}
                className="text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.div 
              variants={menuItemVariants}
              className="flex items-center space-x-2"
            >
              <LanguageSwitcher />
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden flex items-center"
            variants={menuItemVariants}
          >
            <LanguageSwitcher />
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-blue-600 focus:outline-none dark:text-white dark:hover:text-blue-400 ml-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: {
                  opacity: { duration: 0.2 },
                  height: { duration: 0.2 }
                }
              }}
              className="md:hidden overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-b-2xl"
            >
              <motion.div 
                className="px-2 pt-2 pb-3 space-y-1"
                variants={navVariants}
                initial="hidden"
                animate="visible"
              >
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    variants={menuItemVariants}
                    whileHover="hover"
                    custom={i}
                    onClick={toggleMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;