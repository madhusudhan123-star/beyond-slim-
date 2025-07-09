import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import product from '../assets/about_product.png';
import { productPage } from '../utility/data';
import { FaShieldAlt, FaStar, FaStarHalfAlt, FaRegStar, FaCheck, FaTruck, FaUndo } from 'react-icons/fa';
import amazon from '../assets/amazon.webp'; 
import cart from '../assets/cart.png';
import banner from '../assets/homebanner1.jpg';
import { getProductBySlug, productSlugs } from '../utils/urlSlugs';
import { Helmet } from 'react-helmet-async';

const Product = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [mounted, setMounted] = useState(false);

    // Get product data based on slug
    const productData = slug ? getProductBySlug(slug) : productSlugs['beyond-slim-capsules'];
    const seoData = productData || productSlugs['beyond-slim-capsules'];

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddToCart = () => {
        const price = 3990;
        const productDetails = {
            productName: productPage.title,
            quantity: quantity,
            totalAmount: price * quantity,
        };

        navigate('/secure-checkout', { state: productDetails });
    };

    // Product specifications
    const specifications = [
        { name: 'Serving Size', value: '2 capsules' },
        { name: 'Servings Per Container', value: '30' },
        { name: 'Recommended Use', value: '1-2 capsules daily with water' },
        { name: 'Container Size', value: '60 capsules' },
        { name: 'Manufactured In', value: 'USA in GMP-certified facility' },
        { name: 'Certifications', value: 'FDA Registered Facility, Non-GMO' }
    ];

    // Customer reviews
    const reviews = [
        { id: 1, name: "Sarah M.", rating: 5, comment: "I've been using this for 2 months and I'm amazed at the results! Definitely recommend!", verified: true },
        { id: 2, name: "Michael T.", rating: 4.5, comment: "Great product that actually delivers on its promises. My energy levels have improved significantly.", verified: true },
        { id: 3, name: "Jennifer K.", rating: 5, comment: "The best oil I've tried so far. No side effects and I'm seeing great results.", verified: true }
    ];

    // Render stars for ratings
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }
        
        const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
        }
        
        return stars;
    };

    return (
        <>
            <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDescription} />
                {seoData.keywords && (
                    <meta name="keywords" content={seoData.keywords.join(', ')} />
                )}
            </Helmet>
            
            <div className="min-h-screen bg-white overflow-hidden">
            <Helmet>
                <title>{seoData.title} - Your Trusted Health Partner</title>
                <meta name="description" content={seoData.description} />
                <link rel="canonical" href={`https://www.yourwebsite.com/product/${slug}`} />
            </Helmet>
            
            <section className={`relative w-full min-h-screen bg-transparent transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                {/* Hero Section */}
                <div className="w-full pt-28 pb-16 shadow-sm">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Product Image Section */}
                            <div className="relative md:w-1/2 flex justify-center">
                                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
                                    {/* Added shadow for professional look */}
                                    <div className="absolute bottom-0 w-[80%] h-[20px] bg-black opacity-10 blur-xl rounded-full mx-auto left-0 right-0"></div>
                                    <img
                                        src={product}
                                        alt="Beyond Slim Product"
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                                 w-full h-full object-cover drop-shadow-xl"
                                    />
                                </div>
                            </div>
                            
                            {/* Product Info Section */}
                            <div className="md:w-1/2 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start mb-3">
                                    <div className="flex">
                                        {renderStars(4.8)}
                                    </div>
                                    <span className="ml-2 text-gray-600 text-sm">4.8/5</span>
                                </div>
                                
                                <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-800">
                                    {productPage.title}
                                </h1>
                                
                                <p className="text-xl text-gray-600 mb-4 max-w-2xl">
                                    {productPage.description}
                                </p>
                                
                                {/* Price Section */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-center md:justify-start space-x-3">
                                        <span className="text-3xl font-bold text-blue-600">₹3,990</span>
                                        <span className="text-xl text-gray-500 line-through">₹5,999</span>
                                        <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                                            33% OFF
                                        </span>
                                    </div>
                                    <p className="text-green-600 text-sm mt-1">
                                        <span className="font-semibold">In Stock</span> - Ready to Ship
                                    </p>
                                </div>
                                
                                {/* Trust Indicators */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                                    <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                                        <FaTruck className="text-blue-600 mr-2" />
                                        <span className="text-sm">Free Shipping</span>
                                    </div>
                                    <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                                        <FaUndo className="text-blue-600 mr-2" />
                                        <span className="text-sm">30-Day Returns</span>
                                    </div>
                                    <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                                        <FaShieldAlt className="text-blue-600 mr-2" />
                                        <span className="text-sm">Secure Checkout</span>
                                    </div>
                                </div>
                                
                                {/* Buy Now Section */}
                                <div className="flex flex-col gap-4 mb-4">
                                    <div className="flex flex-wrap gap-5">
                                        <div className="flex items-center overflow-hidden w-fit mx-auto md:mx-0">
                                            <button
                                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                className="bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition"
                                            >
                                                -
                                            </button>
                                            <span className="px-6 py-2 font-medium text-gray-800">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(prev => prev + 1)}
                                                className="bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <a
                                                href="https://www.amazon.in/dp/B0F44432PP"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="Amazon flex-1 text-black text-2xl px-6 py-3 
                                                        rounded-lg transition-all duration-300
                                                        transform hover:scale-105 shadow-lg hover:shadow-xl font-bold flex gap-4 items-center justify-center">
                                                <img 
                                                    src={amazon}
                                                    alt="Amazon" 
                                                    className="w-14"
                                                />
                                                AVALIABLE ON AMAZON
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 bg-white text-black text-lg px-6 py-3 
                                                    rounded-lg transition-all duration-300
                                                    transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                                        >
                                            <img src={cart} alt="Cart" className="mr-2" />
                                            {productPage.buttons.addToCart}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Guarantee Banner */}
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center">
                                    <div className="bg-green-100 rounded-full p-2 mr-3">
                                        <FaShieldAlt className="text-green-600 text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-green-800">100% Money Back Guarantee</p>
                                        <p className="text-sm text-green-700">Not satisfied? Get a full refund within 15 days</p>
                                    </div>
                                </div>
                                
                                {/* Payment methods */}
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">Secure Payment Options:</p>
                                    <div className="flex space-x-2">
                                        <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8" />
                                        <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-8" />
                                        <img src="https://cdn-icons-png.flaticon.com/128/5968/5968299.png" alt="Razorpay" className="h-8" />
                                        <img src="https://cdn-icons-png.flaticon.com/128/5968/5968249.png" alt="UPI" className="h-8" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Banner */}
                {/* <div className="bg-blue-700 text-white py-12">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">Trusted by Over 50,000+ Satisfied Customers</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center">
                                <div className="text-4xl font-bold mb-2">4.8/5</div>
                                <div className="flex mb-1">
                                    {renderStars(4.8)}
                                </div>
                                <div className="text-sm opacity-90">Average Rating</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-4xl font-bold mb-2">15</div>
                                <div className="text-sm opacity-90">Day Guarantee</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-4xl font-bold mb-2">24/7</div>
                                <div className="text-sm opacity-90">Customer Support</div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div>
                    <img src={banner} alt="Beyond Slim Banner" className='w-full h-auto' />
                </div>
                
                {/* Content Tabs Section */}
                <div className=" py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex border-b border-gray-300 mb-8">
                            <button 
                                className={`py-3 px-6 font-medium text-lg ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                            <button 
                                className={`py-3 px-6 font-medium text-lg ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews
                            </button>
                        </div>
                        
                        {activeTab === 'description' && (
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">About Beyond Slim</h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Beyond Slim is an advanced weight management supplement designed to support your weight loss journey naturally. Our proprietary blend of ingredients works synergistically to help boost metabolism, increase energy levels, and support fat burning through multiple pathways.
                                </p>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    What sets Beyond Slim apart is our commitment to quality and efficacy. Each ingredient is carefully selected for its proven benefits and is included in optimal amounts to maximize results. Our formula is free from harsh stimulants, ensuring you get a clean energy boost without the jitters or crash associated with other supplements.
                                </p>
                                
                                <h4 className="text-xl font-semibold mb-3 text-gray-800">Key Benefits</h4>
                                <ul className="list-none space-y-2 mb-6">
                                    {['Supports healthy weight management', 'Increases natural energy levels', 'Helps optimize metabolism', 'Supports reduced food cravings', 'Promotes thermogenesis (fat burning)'].map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="mt-1 mr-3 flex-shrink-0">
                                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                    <FaCheck className="text-green-500 text-xs" />
                                                </div>
                                            </div>
                                            <span className="text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {activeTab === 'specifications' && (
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">Product Specifications</h3>
                                <div className="overflow-hidden border border-gray-200 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <tbody className="divide-y divide-gray-200">
                                            {specifications.map((spec, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{spec.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{spec.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Certification & Quality</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                                            <img src="https://cdn-icons-png.flaticon.com/128/2833/2833315.png" alt="GMP Certified" className="w-12 h-12 mr-3" />
                                            <div>
                                                <h5 className="font-medium text-gray-800">GMP Certified</h5>
                                                <p className="text-sm text-gray-600">Good Manufacturing Practices</p>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                                            <img src="https://cdn-icons-png.flaticon.com/128/4213/4213736.png" alt="FDA Registered" className="w-12 h-12 mr-3" />
                                            <div>
                                                <h5 className="font-medium text-gray-800">FDA Registered</h5>
                                                <p className="text-sm text-gray-600">Facility FDA Registered</p>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                                            <img src="https://cdn-icons-png.flaticon.com/128/5659/5659446.png" alt="Lab Tested" className="w-12 h-12 mr-3" />
                                            <div>
                                                <h5 className="font-medium text-gray-800">Lab Tested</h5>
                                                <p className="text-sm text-gray-600">Quality & Purity Verified</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'reviews' && (
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
                                    <div className="flex items-center">
                                        <div className="flex mr-2">
                                            {renderStars(4.8)}
                                        </div>
                                        <span className="text-gray-600">4.8 out of 5</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    {reviews.map(review => (
                                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center">
                                                    <div className="bg-blue-100 text-blue-800 font-semibold rounded-full w-10 h-10 flex items-center justify-center mr-3">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{review.name}</p>
                                                        <div className="flex items-center">
                                                            <div className="flex mr-2">
                                                                {renderStars(review.rating)}
                                                            </div>
                                                            {review.verified && (
                                                                <span className="text-green-600 text-xs flex items-center">
                                                                    <FaCheck className="mr-1" /> Verified Purchase
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">2 weeks ago</span>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default Product;