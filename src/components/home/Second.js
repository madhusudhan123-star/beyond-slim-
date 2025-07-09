import React, { useEffect, useRef, useState } from 'react';
import { second } from '../../utility/data';
import videoManager from '../../utility/audioManager';

const Second = () => {
    const iframeRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        let player = null;
        window.onYouTubeIframeAPIReady = () => {
            player = new window.YT.Player(iframeRef.current, {
                videoId: 'IhjmG0Dum1U',
                playerVars: {
                    autoplay: 0,
                    loop: 1,
                    playlist: 'IhjmG0Dum1U',
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 1,
                    mute: 1
                },
                events: {
                    onReady: (event) => {
                        videoManager.registerYoutube(event.target);
                        event.target.setVolume(100);
                    }
                }
            });
        };

        // Create a proxy element for YouTube iframe
        const videoProxy = {
            postMessage: (message, target) => {
                if (iframeRef.current && iframeRef.current.contentWindow) {
                    iframeRef.current.contentWindow.postMessage(message, target);
                }
            },
            pause: () => {
                if (iframeRef.current) {
                    iframeRef.current.contentWindow.postMessage(
                        '{"event":"command","func":"pauseVideo","args":""}',
                        '*'
                    );
                }
            }
        };

        // Handle YouTube player state changes
        const handleMessage = (event) => {
            if (event.data && typeof event.data === 'string') {
                try {
                    const data = JSON.parse(event.data);
                    if (data.event === 'onStateChange' && data.info === 1) {
                        // Video started playing
                        setIsInitialLoad(false);
                    }
                } catch (e) {
                    // Ignore parsing errors
                }
            }
        };

        window.addEventListener('message', handleMessage);
        videoManager.register(videoProxy, true);

        return () => {
            window.removeEventListener('message', handleMessage);
            videoManager.unregister(videoProxy, true);
        };
    }, [isInitialLoad]);

    return (
        <section className="relative py-16 md:py-24">
            <div className=" px-4">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Video Side */}
                    <div className="w-full md:w-1/2">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video">
                            <iframe
                                ref={iframeRef}
                                src="https://www.youtube.com/embed/IhjmG0Dum1U?enablejsapi=1&autoplay=0&loop=1&playlist=IhjmG0Dum1U&controls=0&showinfo=0&rel=0&modestbranding=1&origin=http://localhost:3000"
                                title="Video Player"
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            
                        </div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
                            {"Transform Your Body Naturally – Backed by Ayurveda"}
                        </h2>
                        <p className="text-lg text-gray-700 mb-4">
                            {"See visible weight-loss results within weeks with our 100% herbal, safe, and doctor-recommended Ayurvedic oil."}
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
                            <li>Boosts metabolism & burns stubborn fat</li>
                            <li>Made with premium Ayurvedic ingredients</li>
                            <li>No chemicals, no side effects – just results</li>
                            <li>Trusted by 10,000+ happy users</li>
                        </ul>
                        <div className="flex">
                            <a 
                                href="/product" 
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                            >
                                Buy Now – Start Your Journey
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Second;