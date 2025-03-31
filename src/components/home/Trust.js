import React, { useEffect, useRef, useState } from 'react';
import { Engine, World, Bodies, Body, Mouse, MouseConstraint } from 'matter-js';
import { trustWords, trustColors, truse } from '../../utility/data';

const Trust = () => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const wordsRef = useRef([]);
    const requestRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);

    const WORDS = trustWords;
    const COLORS = trustColors;

    useEffect(() => {
        const updateDimensions = () => {
            const container = canvasRef.current?.parentElement;
            if (container) {
                setDimensions({
                    width: container.offsetWidth,
                    height: container.offsetHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (!dimensions.width || !dimensions.height) return;

        engineRef.current = Engine.create();
        const engine = engineRef.current;

        // Create boundaries with the same setup as the previous code
        const ground = Bodies.rectangle(
            dimensions.width / 2,
            dimensions.height,
            dimensions.width * 1.2,
            60,
            { isStatic: true }
        );

        const ceiling = Bodies.rectangle(
            dimensions.width / 2,
            0,
            dimensions.width * 1.2,
            60,
            { isStatic: true }
        );

        const wallLeft = Bodies.rectangle(
            0,
            dimensions.height / 2,
            60,
            dimensions.height * 1.2,
            { isStatic: true }
        );

        const wallRight = Bodies.rectangle(
            dimensions.width,
            dimensions.height / 2,
            60,
            dimensions.height * 1.2,
            { isStatic: true }
        );

        World.add(engine.world, [ground, ceiling, wallLeft, wallRight]);

        // Improved word creation with better distribution
        wordsRef.current = WORDS.map((word, index) => {
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth < 1024;
            
            // More columns for better distribution
            const columns = isMobile ? 2 : isTablet ? 3 : 4;
            
            // Smaller boxes for better fit
            const boxWidth = isMobile ?
                (word.length * 6 + 20) :
                Math.min((word.length * 8 + 30), dimensions.width * 0.1);
            
            const boxHeight = isMobile ? 32 : 38;
            
            const totalRows = Math.ceil(WORDS.length / columns);
            const row = Math.floor(index / columns);
            const col = index % columns;
            
            // Calculate position with better distribution
            // Add randomness to prevent perfect grid alignment
            const xOffset = (Math.random() - 0.5) * 30;
            const yOffset = (Math.random() - 0.5) * 30;
            
            // Start higher on the canvas and space them out evenly
            const yStart = dimensions.height * 0.1;
            const ySpacing = (dimensions.height * 0.75) / totalRows;
            
            return {
                word,
                body: Bodies.rectangle(
                    (col + 0.5) * (dimensions.width / columns) + xOffset,
                    yStart + (row * ySpacing) + yOffset,
                    boxWidth,
                    boxHeight,
                    {
                        friction: 0.3,
                        restitution: 0.6,
                        density: isMobile ? 0.002 : 0.001,
                        // Reduce angular velocity to prevent excessive spinning
                        angularVelocity: (Math.random() - 0.5) * 0.02
                    }
                ),
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                targetColor: '#ffffff',
                isExploding: false,
                explosionRadius: 0
            };
        });

        World.add(engine.world, wordsRef.current.map(w => w.body));

        // Enhanced mouse control with same settings as previous code
        const mouse = Mouse.create(canvasRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.1,
                render: { visible: false }
            }
        });

        World.add(engine.world, mouseConstraint);

        // Modified animation loop with white background
        const animate = () => {
            Engine.update(engine);
            const ctx = canvasRef.current.getContext('2d');

            // Set white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, dimensions.width, dimensions.height);

            // Mouse attraction behavior
            if (isMouseInCanvas) {
                wordsRef.current.forEach(wordObj => {
                    const { body } = wordObj;
                    const dx = mousePos.x - body.position.x;
                    const dy = mousePos.y - body.position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        const force = 0.000015;
                        Body.applyForce(body, body.position, {
                            x: dx * force,
                            y: dy * force
                        });
                    }
                });
            }

            // Modified word rendering to ensure visibility on white background
            wordsRef.current.forEach(wordObj => {
                const { body, word, isExploding, explosionRadius } = wordObj;
                const { x, y } = body.position;
                const angle = body.angle;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);

                if (isExploding) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 200, 0, ${1 - explosionRadius / 100})`;
                    ctx.arc(0, 0, explosionRadius * 2, 0, Math.PI * 2);
                    ctx.stroke();
                    wordObj.explosionRadius += 5;
                    if (wordObj.explosionRadius > 100) {
                        wordObj.isExploding = false;
                        wordObj.explosionRadius = 0;
                    }
                }

                const isMobile = window.innerWidth < 768;
                // Adjust desiredWidth calculation if necessary
                const desiredWidth = isMobile ?
                    (word.length * 10 + 30) :
                    Math.min((word.length * 12 + 50), dimensions.width * 0.15);
                const height = isMobile ? 40 : 50;

                let fontSize = isMobile ? 14 : 20;
                ctx.font = `${fontSize}px Arial`;
                let textWidth = ctx.measureText(word.toUpperCase()).width;
                const padding = 15;

                while (textWidth > (desiredWidth - padding * 2) && fontSize > 12) {
                    fontSize--;
                    ctx.font = `${fontSize}px Arial`;
                    textWidth = ctx.measureText(word.toUpperCase()).width;
                }

                const finalWidth = Math.max(desiredWidth, textWidth + padding * 2);

                // Enhanced shadow effects
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                ctx.shadowBlur = 15;
                ctx.shadowOffsetX = 5;
                ctx.shadowOffsetY = 5;

                ctx.fillStyle = wordObj.color;
                ctx.beginPath();
                ctx.roundRect(-finalWidth / 2, -height / 2, finalWidth, height, isMobile ? 8 : 12);
                ctx.fill();

                ctx.shadowColor = 'none';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillStyle = '#ffffff';
                ctx.font = `${fontSize}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(word.toUpperCase(), 0, 0);

                ctx.restore();
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            World.clear(engine.world);
            Engine.clear(engine);
        };
    }, [dimensions]);

    // Enhanced scroll effect with bounce animation
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            wordsRef.current.forEach(wordObj => {
                Body.applyForce(
                    wordObj.body,
                    { x: wordObj.body.position.x, y: wordObj.body.position.y },
                    {
                        x: (Math.random() - 0.5) * 0.001 * scrollDelta,
                        y: -0.002 * scrollDelta
                    }
                );

                Body.setAngularVelocity(
                    wordObj.body,
                    (Math.random() - 0.5) * 0.01 * scrollDelta
                );
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click handlers for word creation and explosion effects
    const handleClick = (e) => {
        if (!engineRef.current) return;

        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        const isMobile = window.innerWidth < 768;
        const width = isMobile ?
            (word.length * 15 + 60) :
            Math.min((word.length * 20 + 100), dimensions.width * 0.25);
        const height = isMobile ? 60 : 80;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newWord = {
            word,
            body: Bodies.rectangle(x, y, width, height, {
                friction: 0.3,
                restitution: 0.6,
                density: isMobile ? 0.002 : 0.001
            }),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            targetColor: '#ffffff',
            isExploding: false,
            explosionRadius: 0
        };

        wordsRef.current.push(newWord);
        World.add(engineRef.current.world, newWord.body);
    };

    const handleDoubleClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        let closestWord = null;
        let closestDist = Infinity;

        wordsRef.current.forEach(wordObj => {
            const dx = wordObj.body.position.x - clickX;
            const dy = wordObj.body.position.y - clickY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < closestDist) {
                closestDist = dist;
                closestWord = wordObj;
            }
        });

        if (closestWord && closestDist < 100) {
            closestWord.isExploding = true;
            closestWord.explosionRadius = 0;
            Body.setVelocity(closestWord.body, {
                x: (Math.random() - 0.5) * 20,
                y: -Math.random() * 15
            });
            Body.setAngularVelocity(closestWord.body, (Math.random() - 0.5) * 0.4);
        }
    };

    const handleMouseMove = (e) => {
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseEnter = () => {
        setIsMouseInCanvas(true);
    };

    const handleMouseLeave = () => {
        setIsMouseInCanvas(false);
    };

    return (
        <div className="w-screen bg-white overflow-hidden flex flex-col gap-8 md:gap-26 items-center justify-center">
            <div className='container mx-auto my-4 md:my-28 flex flex-col items-center justify-center gap-4 md:gap-0 px-4 md:px-0'>
                <div className='w-full'>
                    <h1 className='text-2xl md:text-5xl text-center mb-4 md:mb-0'>
                        {truse.title}
                    </h1>
                </div>
                <div className='w-full h-[40vh] md:h-[70vh] relative bg-white overflow-hidden rounded-2xl md:rounded-3xl flex items-center justify-center'>
                    <canvas
                        ref={canvasRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            background: 'white',
                            position: 'relative',
                            zIndex: 1,
                            mixBlendMode: 'normal'
                        }}
                        width={dimensions.width}
                        height={dimensions.height}
                        onClick={handleClick}
                        onDoubleClick={handleDoubleClick}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            </div>
        </div>
    );
};

export default Trust;