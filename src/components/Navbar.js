import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { navigationLinks } from '../utility/data';

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll position with a more efficient approach
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial scroll position
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const socialIcons = [
        { 
            icon: <FaFacebookF />, 
            link: 'https://www.facebook.com/people/Beyond-Slim-Body-Slimming-Oil/61559800233749/',
            color: '#3b5998',
            label: 'Facebook' 
        },
        { 
            icon: <FaInstagram />, 
            link: 'https://www.instagram.com/beyondslimmingoil/',
            color: '#e1306c', 
            label: 'Instagram' 
        },
        // { 
        //     icon: <FaWhatsapp />, 
        //     link: 'https://wa.me/+919908526444',
        //     color: '#25D366', 
        //     label: 'WhatsApp' 
        // }
    ];

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.mobile-menu-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className={`w-full fixed z-50 transition-all duration-300 ${
                scrolled 
                ? 'bg-white shadow-lg py-1' 
                : 'bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur-md py-2'
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href='/' className="flex items-center">
                            <img 
                                src={logo} 
                                className={`transition-all duration-300 ${
                                    scrolled 
                                    ? 'w-20 md:w-24' 
                                    : 'w-24 md:w-28 '
                                }`}
                                alt="Beyond Slim Logo"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
                        {navigationLinks.map((link, index) => (
                            <motion.a
                                key={link.id}
                                href={link.path}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`px-3 py-2 rounded-md text-lg font-medium relative group transition-all duration-300
                                    ${scrolled 
                                        ? 'text-blue-700 hover:text-blue-900' 
                                        : 'text-white hover:text-blue-200'}`}
                            >
                                {link.title}
                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full ${
                                    scrolled ? 'bg-blue-600' : 'bg-white'
                                }`}></span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Right Social Icons */}
                    {/* <div className="hidden md:flex items-center space-x-2">
                        {socialIcons.map((item, index) => (
                            <motion.a 
                                key={index} 
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.15 }}
                                className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                                    scrolled 
                                        ? `hover:bg-gray-100` 
                                        : `hover:bg-blue-700/50`
                                }`}
                                style={{ 
                                    color: scrolled ? item.color : 'white',
                                }}
                                aria-label={item.label}
                            >
                                {item.icon}
                            </motion.a>
                        ))}
                    </div> */}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button 
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                            className={`p-2 rounded-md transition-colors duration-300 ${
                                scrolled 
                                    ? 'text-blue-700 hover:bg-gray-100' 
                                    : 'text-white hover:bg-blue-700/50'
                            }`}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? (
                                <RiCloseLine className="h-6 w-6" />
                            ) : (
                                <RiMenu3Line className="h-6 w-6" />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation - Enhanced with animations */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            className="md:hidden mobile-menu-container overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div 
                                className={`px-2 pt-4 pb-6 space-y-2 rounded-xl mt-2 shadow-lg ${
                                    scrolled ? 'bg-white' : 'bg-blue-800'
                                }`}
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {navigationLinks.map((link, index) => (
                                    <motion.a
                                        key={link.id}
                                        href={link.path}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-300 ${
                                            scrolled 
                                                ? 'text-blue-700 hover:bg-blue-50' 
                                                : 'text-white hover:bg-blue-700/70'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.title}
                                    </motion.a>
                                ))}
                                
                                {/* Mobile Social Icons */}
                                <motion.div 
                                    className="flex items-center justify-center space-x-6 pt-4 pb-2 px-3 mt-2 border-t border-opacity-20"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                    style={{
                                        borderColor: scrolled ? '#cbd5e1' : 'white',
                                    }}
                                >
                                    {socialIcons.map((item, index) => (
                                        <motion.a 
                                            key={index} 
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                                scrolled 
                                                    ? 'bg-gray-100 hover:bg-gray-200' 
                                                    : 'bg-blue-700/50 hover:bg-blue-700/80'
                                            }`}
                                            style={{ 
                                                color: scrolled ? item.color : 'white',
                                            }}
                                            aria-label={item.label}
                                        >
                                            {item.icon}
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default NavbarComponent;