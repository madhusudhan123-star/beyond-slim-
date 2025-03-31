import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Engine, World, Bodies } from 'matter-js';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const formRef = useRef(null);
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const boxesRef = useRef([]);
    const requestRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (!dimensions.width || !dimensions.height) return;

        // Initialize matter.js
        engineRef.current = Engine.create();
        const engine = engineRef.current;

        // Create walls
        const wallThickness = 60;
        const walls = [
            Bodies.rectangle(dimensions.width / 2, dimensions.height + 30, dimensions.width, wallThickness, { isStatic: true }),
            Bodies.rectangle(-30, dimensions.height / 2, wallThickness, dimensions.height, { isStatic: true }),
            Bodies.rectangle(dimensions.width + 30, dimensions.height / 2, wallThickness, dimensions.height, { isStatic: true })
        ];

        World.add(engine.world, walls);

        // Create falling shapes animation
        const createShape = () => {
            const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#F08080', '#FA8072'];
            const size = Math.random() * 30 + 15;
            const x = Math.random() * dimensions.width;

            return {
                body: Bodies.circle(x, -50, size, {
                    friction: 0.3,
                    restitution: 0.6,
                    density: 0.001
                }),
                color: colors[Math.floor(Math.random() * colors.length)],
                size
            };
        };

        const animate = () => {
            Engine.update(engine);
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            if (boxesRef.current.length < 30 && Math.random() > 0.95) {
                const newShape = createShape();
                boxesRef.current.push(newShape);
                World.add(engine.world, newShape.body);
            }

            boxesRef.current.forEach((shape, index) => {
                const { body, color, size } = shape;
                ctx.save();
                ctx.translate(body.position.x, body.position.y);

                // Create gradient for each circle
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, '#fff');

                // Draw circle with shadow and gradient
                ctx.shadowColor = color;
                ctx.shadowBlur = 15;
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                if (body.position.y > dimensions.height + 100) {
                    World.remove(engine.world, body);
                    boxesRef.current.splice(index, 1);
                }
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        // GSAP Animations
        gsap.fromTo(formRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            World.clear(engine.world);
            Engine.clear(engine);
        };
    }, [dimensions]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ type: 'loading', message: 'Sending message...' });

        try {
            const response = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _template: 'table',
                    _captcha: 'false'
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you for your message. We will get back to you soon!'
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Oops! Something went wrong. Please try again later.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                className="fixed top-0 left-0 w-full h-full pointer-events-none"
            />

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 text-gray-800">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows="6"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                required
                            ></textarea>
                        </div>

                        {submitStatus.message && (
                            <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' :
                                submitStatus.type === 'error' ? 'bg-red-100 text-red-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitStatus.type === 'loading'}
                            className={`w-full bg-blue-600 text-white text-lg font-semibold py-4 rounded-full 
                                    transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                                    ${submitStatus.type === 'loading' ?
                                    'opacity-75 cursor-not-allowed' :
                                    'hover:bg-blue-700'}`}
                        >
                            {submitStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
