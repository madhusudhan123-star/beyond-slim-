import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqData } from '../utility/data';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let bubbles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Bubble {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 15 + 5;
                this.speed = Math.random() * 2 + 1;
                this.color = `hsla(${210}, 100%, 70%, ${Math.random() * 0.3 + 0.1})`;
                this.wobble = 0;
                this.wobbleSpeed = Math.random() * 0.05;
            }

            update() {
                this.y -= this.speed;
                this.wobble += this.wobbleSpeed;
                this.x += Math.sin(this.wobble) * 2;

                // Reset bubble when it goes off screen
                if (this.y < -this.size) {
                    this.y = canvas.height + this.size;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                gradient.addColorStop(0, `hsla(210, 100%, 80%, ${Math.random() * 0.2 + 0.1})`);
                gradient.addColorStop(1, this.color);
                
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Add shine effect
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create bubbles
        for (let i = 0; i < 50; i++) {
            bubbles.push(new Bubble());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create wave pattern in background
            ctx.fillStyle = 'rgba(59, 130, 246, 0.03)';
            for (let i = 0; i < canvas.width; i += 50) {
                const amplitude = 20;
                const frequency = 0.02;
                const y = Math.sin(i * frequency + Date.now() * 0.001) * amplitude;
                ctx.fillRect(i, canvas.height / 2 + y, 25, canvas.height);
            }

            bubbles.forEach(bubble => {
                bubble.update();
                bubble.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-montserrat pt-28 relative">
            {/* Background Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
            />

            {/* FAQ Content with glass morphism effect */}
            <section className="relative z-10">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="faq-title text-5xl md:text-6xl font-bold text-center mb-16 text-blue-600">
                        Frequently Asked Questions
                    </h1>
                    
                    <div className="faq-container max-w-4xl mx-auto space-y-6">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className="faq-item backdrop-blur-sm bg-white/70 rounded-lg shadow-lg 
                                         overflow-hidden transition-all duration-300 hover:shadow-xl
                                         border border-white/20"
                            >
                                <button
                                    className="w-full px-6 py-5 text-left flex items-center justify-between"
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                                    <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="px-6 pb-5 text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Section with glass morphism */}
                    <div className="text-center mt-16 backdrop-blur-sm bg-white/50 p-8 rounded-2xl">
                        <p className="text-xl text-gray-700 mb-8">
                            Still have questions? We're here to help!
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full 
                                     text-lg font-semibold hover:bg-blue-700 transition-all duration-300 
                                     transform hover:scale-105 shadow-lg hover:shadow-blue-300/50"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FAQ;
