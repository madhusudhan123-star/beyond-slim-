import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Checkouts from "./pages/Checkouts";
import Cancel from "./pages/Cancel";
import Shipping from "./pages/Shipping";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsCondition from "./pages/TermsCondition";
import Privacypolicy from "./pages/Privacypolicy"; // Changed from PrivacyPolicy
import Contact from "./pages/Contact";
import About from "./pages/About"; // Make sure this import is correct
import FAQ from "./pages/FAQ";
import { HelmetProvider } from "react-helmet-async";
import Checkout_two from './pages/Checkout_two';
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import whats from './assets/whats.png';

import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

// Add this new component before AppContent
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Create a wrapper component that conditionally renders the navbar
const AppContent = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  const handleCall = () => {
    window.location.href = 'tel:+919908526444';
  };

  const handleWhatsApp = () => {
    window.location.href = 'https://wa.me/+919908526444';
  };

  return (
    <>
      {/* Only render NavbarComponent if not on checkout page */}
      {!isCheckoutPage && <NavbarComponent />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkouts" element={<Checkouts />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/terms" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path='/check' element={<Checkout_two />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
      
      {/* Footer and mobile buttons */}
      {<Footer />}

      {/* Mobile Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 
                    flex justify-around items-center py-3 px-4 space-x-4">
        <button
          onClick={handleCall}
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-full 
                  flex items-center justify-center space-x-2 shadow-md
                  active:scale-95 transition-transform"
        >
          <FaPhoneAlt className="text-lg" />
          <span className="text-sm font-medium">Call Now</span>
        </button>
      </div>

      {/* Desktop Floating Button */}
      <button
        // onClick={handleCall}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 
                text-white rounded-full p-4 shadow-lg transform hover:scale-110 
                transition-all duration-300 hidden md:flex items-center justify-center
                animate-bounce hover:animate-none group"
        aria-label="Call us"
      >
         <a href="https://wa.me/919908526444" target="_blank" rel="noopener noreferrer">
        <img src={whats} className="w-8 h-8" />
         </a>
        {/* <FaPhoneAlt className="text-2xl group-hover:animate-wiggle" /> */}
      </button>
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen">
        <HelmetProvider>
          <Router>
            <ScrollToTop /> {/* Add this line */}
            <AppContent />
          </Router>
        </HelmetProvider>
      </div>
    </LanguageProvider>
  );
}

export default App;
