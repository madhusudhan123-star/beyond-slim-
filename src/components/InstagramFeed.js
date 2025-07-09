import React from 'react';
import { motion } from 'framer-motion';

const InstagramFeed = () => {

    return (
        <div className="relative bg-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Simple Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-gray-600 text-lg">@beyondslimmingoil</p>
                </motion.div>

                {/* Sliding Posts Container */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-50"
                >
                    {/* Instagram Feed with Sliding Effect */}
                    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
                        <iframe
                            src="https://www.instagram.com/beyondslimmingoil/embed"
                            className="w-full h-full border-none"
                            title="Instagram Feed - Sliding Posts"
                            loading="lazy"
                        ></iframe>
                    </div>
                </motion.div>

                {/* Simple Follow Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <a
                        href="https://www.instagram.com/beyondslimmingoil?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 
                                 text-white px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 
                                 transition-all duration-300 font-medium text-lg"
                    >
                        <span className="text-xl">📱</span>
                        Follow @beyondslimmingoil
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default InstagramFeed;
