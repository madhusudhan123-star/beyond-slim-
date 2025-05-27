import React from 'react';
// import product1 from '../assets/card1.jpeg';
// import product2 from '../assets/card2.png';
// import product3 from '../assets/card3.jpeg';
// import product4 from '../assets/card4.jpeg';

const InstagramFeed = () => {

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-gray-600 text-lg">@beyondslimmingoil</p>
                </div>

                {/* Instagram Widget */}
                <div className="flex justify-center mb-12">
                    <iframe
                        src="https://www.instagram.com/beyondslimmingoil/embed"
                        className="w-full w-[90vw] h-[600px] border-none rounded-xl shadow-lg"
                        title="Instagram Feed"
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Follow Button */}
                <div className="text-center">
                    <a
                        href="https://www.instagram.com/beyondslimmingoil?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 
                                 text-white px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 
                                 transition-all duration-300 font-medium text-lg"
                    >
                        <span className="text-2xl">📸</span>
                        Follow @beyondslimmingoil
                        <span className="animate-bounce">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InstagramFeed;
