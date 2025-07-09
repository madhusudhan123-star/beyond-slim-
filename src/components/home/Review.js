import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { review } from '../../utility/data';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Review = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>
            
            <div className="px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">What Our Customers Say</h2>
                    <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto">
                        Real results from real people. See why thousands trust Beyond Slim for their body transformation journey.
                    </p>
                </motion.div>

                <div className="review-slider-container relative">
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="py-10 px-1"
                    >
                        {review.map((item, index) => (
                            <SwiperSlide key={index}>
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 h-full flex flex-col"
                                >
                                    {/* Card header with gradient */}
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 flex items-center gap-4">
                                        <div className="rounded-full overflow-hidden border-2 border-white w-16 h-16 flex-shrink-0 shadow-lg">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-white">
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                            <div className="flex items-center gap-1">
                                                {[...Array(Math.floor(parseFloat(item.star)))].map((_, i) => (
                                                    <FaStar key={i} className="text-yellow-300" />
                                                ))}
                                                {parseFloat(item.star) % 1 !== 0 && (
                                                    <div className="relative">
                                                        <FaStar className="text-gray-300" />
                                                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(parseFloat(item.star) % 1) * 100}%` }}>
                                                            <FaStar className="text-yellow-300" />
                                                        </div>
                                                    </div>
                                                )}
                                                <span className="ml-1 text-sm">({item.star})</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Card body */}
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div className="relative">
                                            <FaQuoteLeft className="absolute -top-1 -left-1 text-blue-200 opacity-60 text-lg" />
                                            <p className="text-gray-700 italic px-5 py-2">{item.quote}</p>
                                            <FaQuoteRight className="absolute -bottom-1 -right-1 text-blue-200 opacity-60 text-lg" />
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                                            Verified Purchase • {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Custom navigation buttons */}
                    <div className="swiper-button-prev !text-white !w-10 !h-10 rounded-full bg-blue-600/50 backdrop-blur-sm hover:bg-blue-600/80 transition-all duration-300 !after:content-['prev'] !after:text-[0px] flex items-center justify-center -left-1 md:left-2 lg:-left-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="swiper-button-next !text-white !w-10 !h-10 rounded-full bg-blue-600/50 backdrop-blur-sm hover:bg-blue-600/80 transition-all duration-300 !after:content-['next'] !after:text-[0px] flex items-center justify-center -right-1 md:right-2 lg:-right-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                
                {/* Call to action */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <a 
                        href="/product" 
                        className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-900 bg-white rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Buy now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Review;
