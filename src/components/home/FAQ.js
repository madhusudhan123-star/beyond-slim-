import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../../utility/data';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
            {/* Background decoration elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-60"></div>
                <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-40"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-100 rounded-full opacity-30"></div>
                
                {/* Animated dots */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-blue-200 rounded-full"
                        style={{
                            width: Math.random() * 10 + 5,
                            height: Math.random() * 10 + 5,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-blue-700 text-lg md:text-xl max-w-2xl mx-auto">
                        Find answers to common questions about Beyond Slim products
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {faqData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <motion.div
                                className={`border border-blue-100 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    activeIndex === index ? 'ring-2 ring-blue-300' : ''
                                }`}
                            >
                                <button
                                    onClick={() => toggleAnswer(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                    aria-expanded={activeIndex === index}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 pr-8">
                                        {item.question}
                                    </h3>
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: activeIndex === index ? 45 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex items-center justify-center rounded-full w-8 h-8 ${
                                            activeIndex === index 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-blue-100 text-blue-600'
                                        }`}
                                    >
                                        {activeIndex === index ? <FiMinus /> : <FiPlus />}
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            key={`answer-${index}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ 
                                                height: "auto", 
                                                opacity: 1,
                                                transition: {
                                                    height: { 
                                                        duration: 0.4 
                                                    },
                                                    opacity: { 
                                                        duration: 0.3, 
                                                        delay: 0.1 
                                                    }
                                                }
                                            }}
                                            exit={{ 
                                                height: 0, 
                                                opacity: 0,
                                                transition: {
                                                    height: { 
                                                        duration: 0.3 
                                                    },
                                                    opacity: { 
                                                        duration: 0.2 
                                                    }
                                                }
                                            }}
                                            id={`faq-answer-${index}`}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 border-t border-blue-50 pt-4">
                                                <p className="text-gray-600">{item.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 mb-6">Still have questions?</p>
                    <a 
                        href="/contact" 
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Contact Us
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;