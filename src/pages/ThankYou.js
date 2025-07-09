import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaCheckCircle, 
  FaShippingFast, 
  FaEnvelope, 
  FaPhoneAlt,
  FaDownload,
  FaPrint,
  FaShare,
  FaStar,
  FaGift,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { validateOrderConfirmation, calculateEstimatedDelivery } from '../schemas';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    // Get order data from location state or localStorage
    const data = location.state || JSON.parse(localStorage.getItem('beyondSlimOrderSuccess') || '{}');
    
    if (!data.orderNumber) {
      // Redirect to home if no order data
      navigate('/', { replace: true });
      return;
    }

    // Validate order data
    const validation = validateOrderConfirmation(data);
    if (!validation.isValid) {
      console.warn('Order data validation failed:', validation.errors);
    }

    setOrderData(data);

    // Calculate estimated delivery date using schema helper
    const deliveryDate = calculateEstimatedDelivery(data.orderDate || new Date());
    setEstimatedDelivery(deliveryDate);

    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#06D6A0', '#FFD23F', '#EE6C4D']
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  const formatCurrency = (amount) => {
    return `₹ ${Number(amount).toFixed(2)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Beyond Slim Order Confirmation',
          text: `I just ordered ${orderData?.productName} from Beyond Slim! Order #${orderData?.orderNumber}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Order link copied to clipboard!');
    }
  };

  const handleDownloadReceipt = () => {
    // Create a simple receipt content
    const receiptContent = `
BEYOND SLIM - ORDER RECEIPT
============================

Order Number: ${orderData?.orderNumber}
Order Date: ${orderData?.orderDate || new Date().toLocaleDateString()}
Product: ${orderData?.productName}
Quantity: ${orderData?.quantity}
Amount: ${formatCurrency(orderData?.totalAmount)}
Payment Method: ${orderData?.paymentMethod}

Customer Details:
Name: ${orderData?.customerName}
Email: ${orderData?.customerEmail}
Phone: ${orderData?.customerPhone}

Shipping Address:
${orderData?.shippingAddress}

Thank you for your order!
Visit: beyondslim.com
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beyond-slim-receipt-${orderData?.orderNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order Confirmed - Thank You | Beyond Slim</title>
        <meta name="description" content="Your Beyond Slim order has been confirmed. Thank you for your purchase!" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 font-['Inter',sans-serif]">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-xl text-gray-600">Thank you for choosing Beyond Slim</p>
            <p className="text-lg text-indigo-600 font-semibold mt-2">
              Order #{orderData.orderNumber}
            </p>
          </motion.div>

          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-6"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
              {/* Order Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium text-gray-800">{orderData.productName}</h3>
                      <p className="text-gray-600">Quantity: {orderData.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(orderData.totalAmount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 text-lg font-semibold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-indigo-600">{formatCurrency(orderData.totalAmount)}</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Payment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Payment Method:</span>
                      <p className="font-medium">{orderData.paymentMethod}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Transaction ID:</span>
                      <p className="font-medium text-xs">{orderData.transactionId}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Customer Details</h3>
                    <p className="text-gray-600">{orderData.customerName}</p>
                    <p className="text-gray-600">{orderData.customerEmail}</p>
                    <p className="text-gray-600">{orderData.customerPhone}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Shipping Address</h3>
                    <p className="text-gray-600 whitespace-pre-line">{orderData.shippingAddress}</p>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center text-blue-800 mb-2">
                      <FaShippingFast className="mr-2" />
                      <span className="font-medium">Estimated Delivery</span>
                    </div>
                    <p className="text-blue-600 font-semibold">{estimatedDelivery}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      We'll send you tracking information via email and SMS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={handleDownloadReceipt}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaDownload className="text-2xl text-gray-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">Download Receipt</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaPrint className="text-2xl text-gray-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">Print Order</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaShare className="text-2xl text-gray-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">Share Order</span>
              </button>
              
              <Link
                to="/contact"
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaEnvelope className="text-2xl text-gray-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">Contact Support</span>
              </Link>
            </div>
          </motion.div>

          {/* What's Next Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <FaEnvelope className="text-xl text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Order Confirmation</h3>
                <p className="text-sm text-gray-600">
                  You'll receive an email confirmation with your order details shortly.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                  <FaShippingFast className="text-xl text-yellow-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  We'll prepare your order and ship it within 1-2 business days.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <FaGift className="text-xl text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">
                  Your Beyond Slim package will arrive at your doorstep within 5-7 days.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Need Help? We're Here!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Contact Us</h3>
                <div className="space-y-2">
                  <a href="tel:+919030758333" className="flex items-center hover:text-blue-200 transition-colors">
                    <FaPhoneAlt className="mr-2" />
                    <span>+91 903-075-8333</span>
                  </a>
                  <a href="https://wa.me/+919908526444" className="flex items-center hover:text-blue-200 transition-colors">
                    <FaWhatsapp className="mr-2" />
                    <span>WhatsApp Support</span>
                  </a>
                  <Link to="/contact" className="flex items-center hover:text-blue-200 transition-colors">
                    <FaEnvelope className="mr-2" />
                    <span>Email Support</span>
                  </Link>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/beyondslim" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-200 transition-colors">
                    <FaFacebook />
                  </a>
                  <a href="https://instagram.com/beyondslim" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-200 transition-colors">
                    <FaInstagram />
                  </a>
                  <a href="https://twitter.com/beyondslim" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-200 transition-colors">
                    <FaTwitter />
                  </a>
                </div>
                <p className="text-sm text-blue-100 mt-2">
                  Stay updated with tips and offers!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Review Request */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <FaStar className="text-2xl text-yellow-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Love Beyond Slim?</h2>
            <p className="text-gray-600 mb-4">
              Share your experience with others and help them on their wellness journey!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Leave a Review
              </Link>
              <Link
                to="/"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ThankYou;
