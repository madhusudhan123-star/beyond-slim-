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
                videoId: 'AxYbPlLk79M',
                playerVars: {
                    autoplay: 1,
                    loop: 1,
                    playlist: 'AxYbPlLk79M',
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

    const handleToggleMute = () => {
        const player = videoManager.youtubePlayer;
        if (player) {
            const newMutedState = !isMuted;
            setIsMuted(newMutedState);

            if (!newMutedState) {
                videoManager.handleYoutubeUnmute();
                player.unMute();
                player.playVideo();
            } else {
                player.mute();
            }
        }
    };

    return (
        <section className="relative py-16 md:py-24 bg-[aliceblue]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Video Side */}
                    <div className="w-full md:w-1/2">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video">
                            <iframe
                                ref={iframeRef}
                                src="https://www.youtube.com/embed/AxYbPlLk79M?enablejsapi=1&autoplay=1&loop=1&playlist=AxYbPlLk79M&controls=0&showinfo=0&rel=0&modestbranding=1&origin=http://localhost:3000"
                                title="Video Player"
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <button
                                onClick={handleToggleMute}
                                className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10"
                            >
                                {isMuted ? (
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
                    
                    {/* Content Side */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {second.slide1 || "Beyond Innovation"}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            {second.slide2 || "Watch our video to learn how we're transforming digital experiences with cutting-edge technology and innovative solutions."}
                        </p>
                        <div className="flex">
                            <a 
                                href="#learn-more" 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Second;