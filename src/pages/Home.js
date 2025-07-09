import React, { useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { header, why } from '../utility/data';
import Second from '../components/home/Second';
import Review from '../components/home/Review';
import Work from '../components/home/Work';
import FAQ from '../components/home/FAQ';
import why1 from '../assets/why1.jpeg';
import why2 from '../assets/why2.png';
import why3 from '../assets/why3.png';
import why4 from '../assets/why4.png';
import one from '../assets/t_one.svg';
import two from '../assets/t_two.svg';
import three from '../assets/t_three.svg';
import four from '../assets/t_four.png';
import five from '../assets/hala.png';
import six from '../assets/t_six.png';
import seven from '../assets/t_seven.png';
import eight from '../assets/t_eight.png';
import nine from '../assets/t_nine.png';
import Ingredients from '../components/home/Ingredients';
import { motion } from 'framer-motion';
import banner from '../assets/homebanner3.jpg';
import banner2 from '../assets/homebanner2.jpg';
import InstagramFeed from '../components/InstagramFeed';
import BlogPreview from '../components/home/BlogPreview';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const bannerImages = [banner, banner2]; // Images for the banner slider
    const bannerTexts = header.animationSequence.filter(item => typeof item === 'string');

    useEffect(() => {
        // Use standard scrolling behavior
        document.documentElement.style.scrollBehavior = 'auto';

        // Initialize ScrollTrigger without Lenis
        // No smooth scrolling implementation needed

        // Handle window resizing if needed
        const handleResize = () => {
            // Window resize handling without smooth scrolling
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.documentElement.style.scrollBehavior = '';
        };
    }, []);

    // Banner auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
        }, 4000);
        
        return () => clearInterval(interval);
    }, [bannerImages.length]);

    return (
        <main className='relative overflow-hidden font-montserrat'>
            {/* Image Banner Header Section */}
            <section className='relative z-20 mt-20 md:mt-16 overflow-hidden'>
                <div className='relative z-10 w-full'>
                    {/* Banner Image Slider */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className='relative w-full aspect-[1280/500] mx-auto overflow-hidden'
                    >
                        {bannerImages.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: currentBannerIndex === index ? 1 : 0,
                                    zIndex: currentBannerIndex === index ? 10 : 0
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className='absolute inset-0 w-full h-full'
                            >
                                <img 
                                    src={img} 
                                    alt={`Banner ${index + 1}`}
                                    className='w-full h-full object-cover object-center' 
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>



            {/* Trusted By Section - with improved styling and infinite slider */}
            <div className="w-full py-5">
                <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10 text-gray-800"
                >
                    Trusted By Leading Brands
                </motion.h3>
                <div className="relative overflow-hidden">
                    <motion.div
                    className="flex items-center"
                    animate={{
                        x: [0, "-50%"]
                    }}
                    transition={{
                        x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 15,
                        ease: "linear"
                        }
                    }}
                    style={{
                        width: "200%"
                    }}
                    >
                    {/* Original logos */}
                    {[one, two, three, four, five, six, seven, eight, nine].map((img, index) => (
                        <div
                        key={index}
                        className="flex-shrink-0 px-4 sm:px-6 md:px-8 flex justify-center items-center"
                        style={{ width: "16.66%" }} // 100 / 6
                        >
                        <img
                            src={img}
                            alt={`Trusted partner ${index + 1}`}
                            className="h-16 sm:h-20 md:h-28 w-auto filter transition-all duration-300 hover:scale-105"
                        />
                        </div>
                    ))}
                    {/* Duplicate logos for seamless loop */}
                    {[one, two, three, four, five, six].map((img, index) => (
                        <div
                        key={`duplicate-${index}`}
                        className="flex-shrink-0 px-4 sm:px-6 md:px-8 flex justify-center items-center"
                        style={{ width: "16.66%" }}
                        >
                        <img
                            src={img}
                            alt={`Trusted partner duplicate ${index + 1}`}
                            className="h-16 sm:h-20 md:h-28 w-auto filter transition-all duration-300 hover:scale-105"
                        />
                        </div>
                    ))}
                    </motion.div>
                </div>
                </div>


            {/* Second Section */}
            <Second />

            {/* Ingredients Section */}
            <div className='relative z-20'>
                <Ingredients />
            </div>


            {/* Additional content */}
            <div className='relative'>
                <Work />
            </div>

            {/* Review Section */}
            <section className='relative z-20 bg-black'>
                <Review />
            </section>

            {/* Why Use Section - with improved styling */}
            <div className="py-10">
                <div className='px-4 md:px-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-12'>
                        {[
                            { img: why1, title: why.title4, para: why.para4 },
                            { img: why2, title: why.title3, para: why.para3 },
                            { img: why3, title: why.title1, para: why.para1 },
                            { img: why4, title: why.title2, para: why.para2 }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className='flex flex-col items-center justify-start gap-4 md:gap-5 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
                            >
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <img src={item.img} alt={item.title} className='w-16 md:w-20' />
                                </div>
                                <h2 className='font-bold text-lg md:text-xl text-blue-600 text-center'>{item.title}</h2>
                                <p className='text-center text-sm md:text-base text-gray-600'>{item.para}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className='relative'>
                <FAQ />
            </div>

            <BlogPreview />

            <div>
                {/* <InstagramFeed /> */}
            </div>
        </main>
    );
};

export default Home;