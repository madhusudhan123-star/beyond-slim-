import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { Engine, World, Bodies, Body, Mouse, MouseConstraint } from 'matter-js';
import { trustWords, trustColors, truse } from '../../utility/data';
import { work } from '../../utility/data'
import home1 from '../../assets/test1.mp4'
import home2 from '../../assets/test2.mp4'
import videoManager from '../../utility/audioManager';

const Work = () => {
    // const containerRef = useRef(null);
    // const dotsRef = useRef([]);
    // const mouseRef = useRef({ x: 0, y: 0 });
    const [isMuted1, setIsMuted1] = useState(true);
    const [isMuted2, setIsMuted2] = useState(true);
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);

    // useEffect(() => {
    //     const config = {
    //         rows: window.innerWidth < 768 ? 20 : 40,
    //         cols: window.innerWidth < 768 ? 20 : 40,
    //         dotSize: window.innerWidth < 768 ? 3 : 4,
    //         gap: window.innerWidth < 768 ? 15 : 25,
    //         mouseRadius: window.innerWidth < 768 ? 100 : 150,
    //         baseOpacity: 0.8,           // Increased base opacity
    //         maxOpacity: 1,
    //         maxScale: window.innerWidth < 768 ? 3 : 4,
    //         glowIntensity: 8           // Added glow intensity config
    //     };

    //     // Pre-calculate styles for better performance
    //     const baseStyles = {
    //         position: 'absolute',
    //         width: `${config.dotSize}px`,
    //         height: `${config.dotSize}px`,
    //         borderRadius: '50%',
    //         backgroundColor: '#ffffff',
    //         opacity: config.baseOpacity,
    //         transform: 'translate3d(0,0,0)', // Enable GPU acceleration
    //         willChange: 'transform, opacity, box-shadow' // Hint browser for optimization
    //     };

    //     const container = containerRef.current;
    //     const dots = [];
    //     const fragment = document.createDocumentFragment(); // Use fragment for batch DOM updates

    //     // Center the container in the purple section
    //     // const purpleSection = container.parentElement;
    //     // const sectionWidth = purpleSection.offsetWidth;
    //     // const sectionHeight = purpleSection.offsetHeight;

    //     // Calculate total grid size
    //     const gridWidth = (config.cols - 1) * config.gap;
    //     const gridHeight = (config.rows - 1) * config.gap;

    //     // Center position calculations
    //     // const startX = (sectionWidth - gridWidth) / 2;
    //     // const startY = (sectionHeight - gridHeight) / 2;

    //     // Create dots with positioning relative to center
    //     for (let row = 0; row < config.rows; row++) {
    //         for (let col = 0; col < config.cols; col++) {
    //             const dot = document.createElement('div');
    //             Object.assign(dot.style, baseStyles);
    //             // dot.style.left = `${startX + (col * config.gap)}px`;
    //             // dot.style.top = `${startY + (row * config.gap)}px`;
    //             fragment.appendChild(dot);
    //             dots.push(dot);
    //         }
    //     }

    //     container.appendChild(fragment);
    //     dotsRef.current = dots;

    //     let rafId;
    //     let lastMouseX = 0;
    //     let lastMouseY = 0;
    //     const threshold = 0.5; // Movement threshold to trigger update

    //     // Optimized animation function
    //     const animateDots = () => {
    //         const { x, y } = mouseRef.current;

    //         // Only update if mouse moved significantly
    //         if (Math.abs(x - lastMouseX) > threshold || Math.abs(y - lastMouseY) > threshold) {
    //             dots.forEach(dot => {
    //                 const rect = dot.getBoundingClientRect();
    //                 const dotX = rect.left + rect.width / 2;
    //                 const dotY = rect.top + rect.height / 2;
    //                 const distX = x - dotX;
    //                 const distY = y - dotY;
    //                 const distance = Math.sqrt(distX * distX + distY * distY);

    //                 if (distance < config.mouseRadius) {
    //                     const scale = 1 + (1 - distance / config.mouseRadius) * config.maxScale;
    //                     const opacity = Math.min(1, config.baseOpacity +
    //                         (1 - distance / config.mouseRadius));

    //                     dot.style.transform = `translate3d(0,0,0) scale(${scale})`;
    //                     dot.style.opacity = opacity;
    //                     dot.style.boxShadow = `0 0 ${scale * config.glowIntensity}px rgba(255,255,255,${opacity})`;
    //                 } else {
    //                     if (dot.style.transform !== 'translate3d(0,0,0) scale(1)') {
    //                         dot.style.transform = 'translate3d(0,0,0) scale(1)';
    //                         dot.style.opacity = config.baseOpacity;
    //                         dot.style.boxShadow = '0 0 4px rgba(255,255,255,0.4)';
    //                     }
    //                 }
    //             });

    //             lastMouseX = x;
    //             lastMouseY = y;
    //         }

    //         rafId = requestAnimationFrame(animateDots);
    //     };

    //     // Optimized mouse move handler
    //     // const handleMouseMove = (e) => {
    //     //     const rect = purpleSection.getBoundingClientRect();

    //     //     // Only update if mouse is within purple section
    //     //     if (e.clientX >= rect.left && e.clientX <= rect.right &&
    //     //         e.clientY >= rect.top && e.clientY <= rect.bottom) {
    //     //         mouseRef.current = {
    //     //             x: e.clientX,
    //     //             y: e.clientY
    //     //         };
    //     //     }
    //     // };

    //     window.addEventListener('mousemove', handleMouseMove, { passive: true });
    //     rafId = requestAnimationFrame(animateDots);

    //     return () => {
    //         window.removeEventListener('mousemove', handleMouseMove);
    //         cancelAnimationFrame(rafId);
    //         dots.forEach(dot => dot.remove());
    //     };
    // }, []);
    // const canvasRef = useRef(null);
    // const engineRef = useRef(null);
    // const wordsRef = useRef([]);
    // const requestRef = useRef(null);
    // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    // const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);

    // const WORDS = trustWords;
    // const COLORS = trustColors;

    // // useEffect(() => {
    // //     const updateDimensions = () => {
    // //         const container = canvasRef.current?.parentElement;
    // //         if (container) {
    // //             setDimensions({
    // //                 width: container.offsetWidth,
    // //                 height: container.offsetHeight
    // //             });
    // //         }
    // //     };

    // //     updateDimensions();
    // //     window.addEventListener('resize', updateDimensions);

    // //     return () => window.removeEventListener('resize', updateDimensions);
    // // }, []);

    // useEffect(() => {
    //     if (!dimensions.width || !dimensions.height) return;

    //     // Initialize engine
    //     engineRef.current = Engine.create();
    //     const engine = engineRef.current;

    //     // Create boundaries
    //     const ground = Bodies.rectangle(
    //         dimensions.width / 2,
    //         dimensions.height,
    //         dimensions.width * 1.2,
    //         60,
    //         { isStatic: true }
    //     );

    //     const ceiling = Bodies.rectangle(
    //         dimensions.width / 2,
    //         0,
    //         dimensions.width * 1.2,
    //         60,
    //         { isStatic: true }
    //     );

    //     const wallLeft = Bodies.rectangle(
    //         0,
    //         dimensions.height / 2,
    //         60,
    //         dimensions.height * 1.2,
    //         { isStatic: true }
    //     );

    //     const wallRight = Bodies.rectangle(
    //         dimensions.width,
    //         dimensions.height / 2,
    //         60,
    //         dimensions.height * 1.2,
    //         { isStatic: true }
    //     );

    //     World.add(engine.world, [ground, ceiling, wallLeft, wallRight]);

    //     // Create words with initial positions spread across the canvas
    //     wordsRef.current = WORDS.map((word, index) => {
    //         const isMobile = window.innerWidth < 768;
    //         // Increased box sizes
    //         const boxWidth = isMobile ?
    //             (word.length * 15 + 60) : // Increased width on mobile
    //             Math.min((word.length * 20 + 100), dimensions.width * 0.25); // Increased width and max width on desktop
    //         const boxHeight = isMobile ? 60 : 80; // Increased height
    //         const columns = 3; // Number of columns to arrange words
    //         const row = Math.floor(index / columns);
    //         const col = index % columns;

    //         return {
    //             word,
    //             body: Bodies.rectangle(
    //                 (col + 1) * (dimensions.width / (columns + 1)), // Spread horizontally
    //                 dimensions.height * 0.3 + (row * (isMobile ? 80 : 120)), // Adjusted spacing
    //                 boxWidth,
    //                 boxHeight,
    //                 {
    //                     friction: 0.3,
    //                     restitution: 0.6,
    //                     density: isMobile ? 0.002 : 0.001
    //                 }
    //             ),
    //             color: COLORS[Math.floor(Math.random() * COLORS.length)],
    //             targetColor: '#ffffff',
    //             isExploding: false,
    //             explosionRadius: 0
    //         };
    //     });

    //     World.add(engine.world, wordsRef.current.map(w => w.body));

    //     // Add mouse control
    //     const mouse = Mouse.create(canvasRef.current);
    //     const mouseConstraint = MouseConstraint.create(engine, {
    //         mouse,
    //         constraint: {
    //             stiffness: 0.1,
    //             render: { visible: false }
    //         }
    //     });

    //     World.add(engine.world, mouseConstraint);

    //     // Animation loop
    //     // const animate = () => {
    //     //     Engine.update(engine);
    //     //     const ctx = canvasRef.current.getContext('2d');
    //     //     ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    //     //     // Add cursor following behavior
    //     //     if (isMouseInCanvas) {
    //     //         wordsRef.current.forEach(wordObj => {
    //     //             const { body } = wordObj;
    //     //             const dx = mousePos.x - body.position.x;
    //     //             const dy = mousePos.y - body.position.y;
    //     //             const distance = Math.sqrt(dx * dx + dy * dy);

    //     //             // Apply attraction force when mouse is nearby
    //     //             if (distance < 200) {
    //     //                 const force = 0.000015;
    //     //                 Body.applyForce(body, body.position, {
    //     //                     x: dx * force,
    //     //                     y: dy * force
    //     //                 });
    //     //             }
    //     //         });
    //     //     }

    //     //     // Draw words
    //     //     wordsRef.current.forEach(wordObj => {
    //     //         const { body, word, isExploding, explosionRadius } = wordObj;
    //     //         const { x, y } = body.position;
    //     //         const angle = body.angle;

    //     //         ctx.save();
    //     //         ctx.translate(x, y);
    //     //         ctx.rotate(angle);

    //     //         // Draw explosion effect
    //     //         if (isExploding) {
    //     //             ctx.beginPath();
    //     //             ctx.strokeStyle = `rgba(255, 255, 0, ${1 - explosionRadius / 100})`;
    //     //             ctx.arc(0, 0, explosionRadius * 2, 0, Math.PI * 2);
    //     //             ctx.stroke();
    //     //             wordObj.explosionRadius += 5;
    //     //             if (wordObj.explosionRadius > 100) {
    //     //                 wordObj.isExploding = false;
    //     //                 wordObj.explosionRadius = 0;
    //     //             }
    //     //         }

    //     //         const isMobile = window.innerWidth < 768;
    //     //         // Calculate initial sizes
    //     //         const desiredWidth = isMobile ?
    //     //             (word.length * 15 + 60) :
    //     //             Math.min((word.length * 20 + 100), dimensions.width * 0.25);
    //     //         const height = isMobile ? 60 : 80;

    //     //         // Calculate font size to fit text
    //     //         let fontSize = isMobile ? 20 : 32;
    //     //         ctx.font = `${fontSize}px Arial`;
    //     //         let textWidth = ctx.measureText(word.toUpperCase()).width;
    //     //         const padding = 20; // Padding on each side

    //     //         // Reduce font size until text fits
    //     //         while (textWidth > (desiredWidth - padding * 2) && fontSize > 12) {
    //     //             fontSize--;
    //     //             ctx.font = `${fontSize}px Arial`;
    //     //             textWidth = ctx.measureText(word.toUpperCase()).width;
    //     //         }

    //     //         // Use the actual text width to set box width
    //     //         const finalWidth = Math.max(desiredWidth, textWidth + padding * 2);

    //     //         // Draw box with shadow effects
    //     //         ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    //     //         ctx.shadowBlur = 15;
    //     //         ctx.shadowOffsetX = 5;
    //     //         ctx.shadowOffsetY = 5;

    //     //         // Draw the box
    //     //         ctx.fillStyle = wordObj.color;
    //     //         ctx.beginPath();
    //     //         ctx.roundRect(-finalWidth / 2, -height / 2, finalWidth, height, isMobile ? 8 : 12);
    //     //         ctx.fill();

    //     //         // Draw text with adjusted settings
    //     //         ctx.shadowColor = 'none';
    //     //         ctx.shadowOffsetX = 0;
    //     //         ctx.shadowOffsetY = 0;
    //     //         ctx.fillStyle = '#ffffff';
    //     //         ctx.font = `${fontSize}px Arial`;
    //     //         ctx.textAlign = 'center';
    //     //         ctx.textBaseline = 'middle';
    //     //         ctx.fillText(word.toUpperCase(), 0, 0);

    //     //         ctx.restore();
    //     //     });

    //     //     requestRef.current = requestAnimationFrame(animate);
    //     // };

    //     // requestRef.current = requestAnimationFrame(animate);

    //     // Cleanup
    //     return () => {
    //         if (requestRef.current) {
    //             cancelAnimationFrame(requestRef.current);
    //         }
    //         World.clear(engine.world);
    //         Engine.clear(engine);
    //     };
    // }, [dimensions]);

    // // Modify the scroll effect to add bounce without changing initial positions
    // useEffect(() => {
    //     let lastScrollY = window.scrollY;
    //     const handleScroll = () => {
    //         const currentScrollY = window.scrollY;
    //         const scrollDelta = currentScrollY - lastScrollY;
    //         lastScrollY = currentScrollY;

    //         wordsRef.current.forEach(wordObj => {
    //             // Increased force multipliers for more dramatic bounce effect
    //             Body.applyForce(
    //                 wordObj.body,
    //                 { x: wordObj.body.position.x, y: wordObj.body.position.y },
    //                 {
    //                     x: (Math.random() - 0.5) * 0.001 * scrollDelta, // Increased horizontal force
    //                     y: -0.002 * scrollDelta // Increased vertical bounce force
    //                 }
    //             );

    //             // Increased rotation effect
    //             Body.setAngularVelocity(
    //                 wordObj.body,
    //                 (Math.random() - 0.5) * 0.01 * scrollDelta // Increased rotation force
    //             );
    //         });
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // const handleDoubleClick = (e) => {
    //     const clickX = e.clientX;
    //     const clickY = e.clientY;

    //     let closestWord = null;
    //     let closestDist = Infinity;

    //     wordsRef.current.forEach(wordObj => {
    //         const dx = wordObj.body.position.x - clickX;
    //         const dy = wordObj.body.position.y - clickY;
    //         const dist = Math.sqrt(dx * dx + dy * dy);

    //         if (dist < closestDist) {
    //             closestDist = dist;
    //             closestWord = wordObj;
    //         }
    //     });

    //     if (closestWord && closestDist < 100) {
    //         closestWord.isExploding = true;
    //         closestWord.explosionRadius = 0;
    //         Body.setVelocity(closestWord.body, {
    //             x: (Math.random() - 0.5) * 20,
    //             y: -Math.random() * 15
    //         });
    //         Body.setAngularVelocity(closestWord.body, (Math.random() - 0.5) * 0.4);
    //     }
    // };

    // const handleClick = (e) => {
    //     if (!engineRef.current) return;

    //     const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    //     const isMobile = window.innerWidth < 768;
    //     // Increased sizes for clicked boxes
    //     const width = isMobile ?
    //         (word.length * 15 + 60) :
    //         Math.min((word.length * 20 + 100), dimensions.width * 0.25);
    //     const height = isMobile ? 60 : 80;

    //     const newWord = {
    //         word,
    //         body: Bodies.rectangle(
    //             e.clientX,
    //             e.clientY,
    //             width,
    //             height,
    //             {
    //                 friction: 0.3,
    //                 restitution: 0.6,
    //                 density: isMobile ? 0.002 : 0.001
    //             }
    //         ),
    //         color: COLORS[Math.floor(Math.random() * COLORS.length)],
    //         targetColor: '#ffffff',
    //         isExploding: false,
    //         explosionRadius: 0
    //     };

    //     wordsRef.current.push(newWord);
    //     World.add(engineRef.current.world, newWord.body);
    // };

    // const handleMouseMove = (e) => {
    //     setMousePos({ x: e.clientX, y: e.clientY });
    // };

    // const handleMouseEnter = () => {
    //     setIsMouseInCanvas(true);
    // };

    // const handleMouseLeave = () => {
    //     setIsMouseInCanvas(false);
    // };

    useEffect(() => {
        // Register videos with manager
        if (video1Ref.current) {
            videoManager.register(video1Ref.current);
        }
        if (video2Ref.current) {
            videoManager.register(video2Ref.current);
        }

        // Cleanup on unmount
        return () => {
            if (video1Ref.current) {
                videoManager.unregister(video1Ref.current);
            }
            if (video2Ref.current) {
                videoManager.unregister(video2Ref.current);
            }
        };
    }, []);

    const handleToggleMute1 = () => {
        if (video1Ref.current) {
            const newMutedState = !isMuted1;
            if (!newMutedState) {
                // Make sure YouTube is paused and muted before playing this video
                videoManager.handleVideoUnmute(video1Ref.current, setIsMuted1);
                video1Ref.current.muted = false;
                video1Ref.current.play();
            } else {
                video1Ref.current.muted = true;
            }
            setIsMuted1(newMutedState);
        }
    };

    const handleToggleMute2 = () => {
        if (video2Ref.current) {
            const newMutedState = !isMuted2;
            if (!newMutedState) {
                // Make sure YouTube is paused and muted before playing this video
                videoManager.handleVideoUnmute(video2Ref.current, setIsMuted2);
                video2Ref.current.muted = false;
                video2Ref.current.play();
            } else {
                video2Ref.current.muted = true;
            }
            setIsMuted2(newMutedState);
        }
    };

    return (
        <div className="w-screen bg-black py-8 md:py-32 overflow-hidden flex flex-col gap-8 md:gap-26 items-center justify-center">
            {/* First video section */}
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 px-4 md:px-0'>
                <div className='w-full md:w-1/2'>
                    <h1 className='text-white text-3xl md:text-7xl text-center md:text-start mb-4 md:mb-0'>
                        {work.title1}
                    </h1>
                </div>
                <div className='w-full md:w-1/2 h-[60vh] md:h-[90vh] relative bg-blue-500 overflow-hidden rounded-2xl md:rounded-3xl flex items-center justify-center'>
                    {/* <div ref={containerRef} className="absolute inset-0" style={{ zIndex: 1 }} /> */}

                    {/* Updated video container structure */}
                    <div className="absolute inset-0 flex items-center justify-center p-2 md:p-0" style={{ zIndex: 2 }}>
                        <div className="w-full md:w-[80%] h-full md:h-[70%] relative">
                            <video
                                ref={video1Ref}
                                className="w-full h-full object-contain md:object-cover rounded-xl md:rounded-3xl"
                                autoPlay
                                loop
                                muted={isMuted1}
                                playsInline
                                style={{
                                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                                }}
                            >
                                <source src={home1} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <button
                                onClick={handleToggleMute1}
                                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300 z-10"
                            >
                                {isMuted1 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Matter.js canvas section */}
            <div className='container mx-auto my-4 md:my-28 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 px-4 md:px-0'>
                <div className='w-full md:w-1/2'>
                    <h1 className='text-white text-3xl md:text-7xl text-center md:text-start mb-4 md:mb-0'>
                        {work.title2}
                    </h1>
                </div>
                <div className='w-full md:w-1/2 h-[60vh] md:h-[90vh] relative overflow-hidden rounded-2xl md:rounded-3xl flex items-center justify-center'>
                    {/* <canvas
                        ref={canvasRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            background: 'transparent',
                            position: 'relative',
                            zIndex: 1,
                            mixBlendMode: 'overlay'
                        }}
                        width={dimensions.width}
                        height={dimensions.height}
                        onClick={handleClick}
                        onDoubleClick={handleDoubleClick}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    /> */}

                    {/* Updated second video container with centered positioning */}
                    <div className="absolute inset-0 flex items-center justify-center p-2 md:p-0" style={{ zIndex: 2 }}>
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full md:w-[80%] h-full md:h-[70%] relative flex items-center justify-center">
                                <video
                                    ref={video2Ref}
                                    className="w-full h-full object-contain md:object-cover rounded-xl md:rounded-3xl"
                                    autoPlay
                                    loop
                                    muted={isMuted2}
                                    playsInline
                                    style={{
                                        filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                                    }}
                                >
                                    <source src={home2} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <button
                                    onClick={handleToggleMute2}
                                    className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300 z-10"
                                >
                                    {isMuted2 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Work;

