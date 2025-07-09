import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Cancel from "./pages/Cancel";
import Shipping from "./pages/Shipping";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsCondition from "./pages/TermsCondition";
import Privacypolicy from "./pages/Privacypolicy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import { HelmetProvider } from "react-helmet-async";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Landing from './pages/Landing'

const AppContent = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isCheckoutPage = pathname === "/secure-checkout" || pathname === "/checkout";
  const isThankYouPage = pathname === "/thank-you";
  const isLandingPage = pathname === "/beyondslim";

  return (
    <>
      {!isCheckoutPage && !isThankYouPage && !isLandingPage && <NavbarComponent />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/about" element={<About />} /> {/* Legacy route */}
        <Route path="/products" element={<Product />} />
        <Route path="/product" element={<Product />} /> {/* Legacy route */}
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/contact" element={<Contact />} /> {/* Legacy route */}
        <Route path="/secure-checkout" element={<Checkout />} />
        <Route path="/checkout" element={<Checkout />} /> {/* Legacy route */}
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/terms" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/frequently-asked-questions" element={<FAQ />} />
        <Route path="/faq" element={<FAQ />} /> {/* Legacy route */}
        <Route path="/health-blog" element={<Blog />} />
        <Route path="/blog" element={<Blog />} /> {/* Legacy route */}
        <Route path="/health-blog/:slug" element={<BlogPost />} />
        <Route path="/blog/:slug" element={<BlogPost />} /> {/* Legacy route */}
        <Route path="/blog/:id" element={<BlogPost />} /> {/* Legacy route */}
        <Route path="/beyondslim" element={<Landing />} />
      </Routes>

      {!isLandingPage && !isThankYouPage && <Footer />}

      {/* <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 
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
      </div> */}
    </>
  );
};


function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen">
        <HelmetProvider>
          <Router>
            <AppContent />
          </Router>
        </HelmetProvider>
      </div>
    </LanguageProvider>
  );
}

export default App;


