import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { productPage } from '../utility/data';
import { why } from '../utility/data';
import why1 from '../assets/why1.jpeg';
import why2 from '../assets/why2.png';
import why3 from '../assets/why3.png';
import why4 from '../assets/why4.png';
import home3 from '../assets/video3.mp4';
import home4 from '../assets/video4.mp4';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);

    const handleVideoHover = (videoRef, isEntering) => {
        if (videoRef.current) {
            videoRef.current.muted = !isEntering;
            if (isEntering) {
                videoRef.current.play().catch(error => {
                    console.log("Video play failed:", error);
                });
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Who we are | About Beyond Slim</title>
                <meta name="description" content="Beyond Slim Slimming Oil offers natural, effective slimming solutions, crafted under the guidance of qualified and experienced Ayurvedic doctors." />
            </Helmet>
            <main className="min-h-screen bg-white font-montserrat pt-28 relative">
                {/* Hero Section */}
                <section className="about-header min-h-[70vh] bg-opacity-90 text-black flex items-center justify-center relative overflow-hidden">
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                            Who we are | About Beyond Slim
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
                            Beyond Slim is an exporter and supplier of health and wellness products covering 18 States with authorized distributors all over India.
                        </p>
                    </div>
                </section>

                {/* Company Description Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <p className="text-lg mb-6">
                                Beyond Slim products are manufactured under the supervision of qualified Ayurvedic doctors, and they are made up of active herbal elements articulated from organically grown pure plant extracts. <a href="/" className="text-blue-600 hover:underline">Beyond Slim</a> are of WHO, GMP, and ISO standards, and they inculcate the ideologies of preservative formulae for everyday uses.
                            </p>
                            <p className="text-lg mb-6">
                                We are 100% Vegan, Cruelty-free, and PETA (People for the Ethical Treatment of Animals) certified. All our products have natural ingredients, and we do not use animal testing in their production.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-24 bg-gray-50/90">
                    <div className="container mx-auto px-4">
                        <h3 className="text-4xl font-bold mb-8 text-center">Our Mission</h3>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-lg mb-6">
                                At Beyond Slim, we're committed to providing natural, effective solutions for your wellness journey. Our <a href="/product" className="text-blue-600 hover:underline">Beyond slimming oil</a> combines ancient Ayurvedic wisdom with modern scientific research to deliver exceptional results while maintaining the highest standards of quality and safety.
                            </p>
                            <p className="text-lg mb-6">
                                Our goal is to create value for all our customers & consumers by fulfilling our mission. Our commitment is to always provide them with the highest degree of pure, standardized & quality-oriented products.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Quality Assurance Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <h3 className="text-4xl font-bold mb-8 text-center">Quality Assurance</h3>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-lg mb-6">
                                We are engaged with an exclusive range of Natural Herbal Products. These are available for direct contact with the customers.
                            </p>
                            <p className="text-lg mb-6">
                                Moreover, we certify that we stringently test our assortments on numerous parameters of quality.
                            </p>
                        </div>
                    </div>
                </section>

                {/* New Video Section */}
                <section className="py-24 bg-gray-50/90">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-600">
                            Our Journey
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {/* First Video */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-700/20 pointer-events-none"></div>
                                <video
                                    ref={video1Ref}
                                    className="w-full h-full object-cover"
                                    loop
                                    playsInline
                                    muted
                                    autoPlay
                                    onMouseEnter={() => handleVideoHover(video1Ref, true)}
                                    onMouseLeave={() => handleVideoHover(video1Ref, false)}
                                >
                                    <source src={home3} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                                    <h3 className="text-white text-xl font-semibold">Product Overview</h3>
                                    <p className="text-white/80 text-sm">Hover to unmute</p>
                                </div>
                                {/* Mute/Unmute Indicator */}
                                <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={video1Ref?.current?.muted ?
                                                "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" :
                                                "M15.536 8.464a5 5 0 010 7.072M12 6.253v13494C12 18.891 10.923 18.337 10.293 17.707L5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v1.253zM17.657 16.657l1.414-1.414a4 4 0 000-5.656l-1.414-1.414"}
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Second Video */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-700/20 pointer-events-none"></div>
                                <video
                                    ref={video2Ref}
                                    className="w-full h-full object-cover"
                                    loop
                                    playsInline
                                    muted
                                    autoPlay
                                    onMouseEnter={() => handleVideoHover(video2Ref, true)}
                                    onMouseLeave={() => handleVideoHover(video2Ref, false)}
                                >
                                    <source src={home4} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                                    <h3 className="text-white text-xl font-semibold">Customer Success Stories</h3>
                                    <p className="text-white/80 text-sm">Hover to unmute</p>
                                </div>
                                {/* Mute/Unmute Indicator */}
                                <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={video2Ref?.current?.muted ?
                                                "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" :
                                                "M15.536 8.464a5 5 0 010 7.072M12 6.253v13494C12 18.891 10.923 18.337 10.293 17.707L5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v1.253zM17.657 16.657l1.414-1.414a4 4 0 000-5.656l-1.414-1.414"}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Details Section */}
                <section className="relative min-h-screen z-10 px-4 py-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-6xl text-black font-bold mb-12 text-center">
                            {productPage.features.title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {productPage.features.items.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-blue/10 backdrop-blur-sm rounded-2xl p-8
                                             hover:bg-white/20 transition-all duration-300
                                             transform hover:scale-105"
                                >
                                    <h3 className="text-2xl md:text-3xl text-black font-bold mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-black/90">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-24 bg-gradient-to-r from-blue-600/95 to-blue-700/95 text-white relative">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Start Your Journey?</h2>
                        <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
                            Join thousands of satisfied customers who have transformed their lives with Beyond Slim.
                        </p>
                        <a
                            href="/product"
                            className="inline-block bg-white text-blue-600 px-12 py-5 rounded-full text-xl font-bold 
                            hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Shop Now
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
};

export default About;
