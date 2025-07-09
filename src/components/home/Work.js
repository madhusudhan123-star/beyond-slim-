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
           
        </div>
    );
};

export default Work;

