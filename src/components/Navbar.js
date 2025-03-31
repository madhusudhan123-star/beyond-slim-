import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { navigationLinks } from '../utility/data';

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const socialIcons = [
        { icon: <FaFacebookF />, link: 'https://www.facebook.com/people/Beyond-Slim-Body-Slimming-Oil/61559800233749/' },
        { icon: <FaInstagram />, link: 'https://www.instagram.com/beyondslimmingoil/' },
        { icon: <FaWhatsapp />, link: 'https://wa.me/+919908526444', label: 'WhatsApp' }
    ];

    return (
        <nav className={`w-full fixed z-50 ${scrolled ? 'bg-white shadow-md' : 'bg-blue-50'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href='/' className="flex items-center">
                            <img 
                                src={logo} 
                                className='ml-2 w-24 md:w-28' 
                                alt="Beyond Slim Logo"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                        {navigationLinks.map(link => (
                            <a
                                key={link.id}
                                href={link.path}
                                className={`px-3 py-2 text-lg font-medium 
                                    ${scrolled ? 'text-blue-700 hover:text-blue-900' : 'text-blue-600 hover:text-blue-800'}`}
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>

                    {/* Right Social Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {socialIcons.map((item, index) => (
                            <a 
                                key={index} 
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${scrolled ? 'text-blue-700 hover:text-blue-900' : 'text-blue-600 hover:text-blue-800'} 
                                    p-2`}
                                aria-label={item.label || `Social media link ${index + 1}`}
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 ${scrolled ? 'text-blue-700' : 'text-blue-600'}`}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? (
                                <RiCloseLine className="h-6 w-6" />
                            ) : (
                                <RiMenu3Line className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation - Simple Dropdown */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                            {navigationLinks.map(link => (
                                <a
                                    key={link.id}
                                    href={link.path}
                                    className="block px-3 py-2 text-base font-medium text-blue-700 hover:text-blue-900"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.title}
                                </a>
                            ))}
                            
                            {/* Mobile Social Icons */}
                            <div className="flex items-center space-x-5 pt-3 pb-2 px-3">
                                {socialIcons.map((item, index) => (
                                    <a 
                                        key={index} 
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 hover:text-blue-900 text-lg"
                                        aria-label={item.label || `Social media link ${index + 1}`}
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavbarComponent;