import React from 'react';
import { footerData } from '../utility/data';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import pay1 from '../assets/payment/card1.webp';
import pay2 from '../assets/payment/card2.webp';
import pay3 from '../assets/payment/card3.webp';
import pay4 from '../assets/payment/card4.webp';
import pay5 from '../assets/payment/card5.webp';

const Footer = () => {
    const socialIcons = [
        { icon: <FaFacebookF />, link: 'https://www.facebook.com/people/Beyond-Slim-Body-Slimming-Oil/61559800233749/', label: 'Facebook', color: '#3b5998' },
        { icon: <FaInstagram />, link: 'https://www.instagram.com/beyondslimmingoil/', label: 'Instagram', color: '#e1306c' },
        // { icon: <FaWhatsapp />, link: 'https://wa.me/+919908526444', label: 'WhatsApp', color: '#25D366' }
    ];

    const contactInfo = [
        { icon: <FaPhoneAlt />, info: '+91 939 227 7389', link: 'tel:+919392277389' },
        { icon: <FaEnvelope />, info: 'customercareproductcenter@gmail.com', link: 'mailto:customercareproductcenter@gmail.com' },
        { icon: <FaMapMarkerAlt />, info: 'Hyderabad, India', link: '#' }
    ];

    return (
        <footer className="relative z-40 overflow-hidden">
            {/* Top Wave Design */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[40px] w-full">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
                </svg>
            </div>

            {/* Main Footer Content */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-800 pt-16 pb-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-10">
                        
                        {/* Company Info & Social */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center md:items-start"
                        >
                            <img src={logo} alt="Beyond Logo" className="h-16 mb-4 filter brightness-0 invert" />
                            <div className="flex space-x-3 mt-2">
                                {socialIcons.map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.link} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                                        style={{ color: social.color }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                        
                        {/* Quick Links 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-bold text-white mb-5 relative flex items-center">
                                {footerData.columns[0].title}
                                <span className="block absolute bottom-0 left-0 w-10 h-[2px] bg-blue-200 rounded-full"></span>
                            </h3>
                            <ul className="space-y-3">
                                {footerData.columns[0].links.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-blue-100 hover:text-white transition-all duration-300 flex items-center">
                                            <span className="mr-2">›</span>
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        
                        {/* Quick Links 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-bold text-white mb-5 relative flex items-center">
                                {footerData.columns[1].title}
                                <span className="block absolute bottom-0 left-0 w-10 h-[2px] bg-blue-200 rounded-full"></span>
                            </h3>
                            <ul className="space-y-3">
                                {footerData.columns[1].links.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-blue-100 hover:text-white transition-all duration-300 flex items-center">
                                            <span className="mr-2">›</span>
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        
                        {/* Contact Info */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-bold text-white mb-5 relative flex items-center">
                                Contact Us
                                <span className="block absolute bottom-0 left-0 w-10 h-[2px] bg-blue-200 rounded-full"></span>
                            </h3>
                            <ul className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="text-blue-300 mt-1 mr-3">{item.icon}</div>
                                        <a href={item.link} className="text-blue-100 hover:text-white transition-all duration-300">
                                            {item.info}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                    
                    {/* Newsletter Signup */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="border-t border-blue-500/30 pt-8 mt-4"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="text-white">
                                © {new Date().getFullYear()} Beyond Slim. All rights reserved.
                            </div>
                            <div className="flex items-center space-x-4 mt-4 md:mt-0">
                                <span className="text-blue-100">Payment Methods:</span>
                                <div className="flex space-x-2">
                                    <div className="w-14 h-10 rounded flex items-center justify-center">
                                        <img src={pay1} alt="Card 1" className="h-10 w-10" />
                                    </div>
                                    <div className="w-14 h-10 rounded flex items-center justify-center">
                                        <img src={pay2} alt="Card 2" className="h-10 w-10" />
                                    </div>
                                    <div className="w-14 h-10 rounded flex items-center justify-center">
                                        <img src={pay3} alt="Card 3" className="h-10 w-10" />
                                    </div>
                                    <div className="w-14 h-10 rounded flex items-center justify-center">
                                        <img src={pay4} alt="Card 4" className="h-10 w-10" />
                                    </div>
                                    
                                    <div className="w-14 h-10 rounded flex items-center justify-center">
                                        <img src={pay5} alt="Card 5" className="h-10 w-10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
