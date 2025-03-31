import React from 'react';
import { footerData } from '../utility/data';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
    const socialIcons = [
        { icon: <FaFacebookF />, link: 'https://www.facebook.com/people/Beyond-Slim-Body-Slimming-Oil/61559800233749/', label: 'Facebook' },
        { icon: <FaInstagram />, link: 'https://www.instagram.com/beyondslimmingoil/', label: 'Instagram' },
        { icon: <FaWhatsapp />, link: 'https://wa.me/+919908526444', label: 'WhatsApp' }
    ];

    return (
        <footer className="relative z-40 bg-gradient-to-r from-gray-900 to-gray-700 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo and Social Icons Section */}
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <img
                            src={logo}
                            alt="Beyond Logo"
                            className="h-16 w-auto hover:opacity-90 transition-opacity"
                        />
                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            {socialIcons.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 
                                             p-2 rounded-full hover:bg-white/10 text-xl"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid Section */}
                    <div className="flex gap-12 md:gap-24">
                        {footerData.columns.map((column, index) => (
                            <div key={index} className="flex flex-col">
                                <h3 className="text-xl font-semibold mb-6 text-blue-400 relative">
                                    {column.title}
                                    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-400"></span>
                                </h3>
                                <ul className="space-y-4">
                                    {column.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-yellow-300 transition-all duration-300 inline-block transform hover:translate-x-2"
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright and Social Text */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Beyond. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm">
                            Connect with us on social media
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
