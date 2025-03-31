import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import product from '../assets/about_product.png';
import product1 from '../assets/home1.JPG';
import product2 from '../assets/home2.JPG';
import { useLanguage } from '../context/LanguageContext'; // Add this import
import data from '../utility/data'; // Add this import
import visa from '../assets/visa.svg';  // You'll need to add these images
import mastercard from '../assets/mastercard.svg';
import rupay from '../assets/upi-id.png';
import razorpay from '../assets/paypal.svg';
import AwardsSection from '../components/Awaid';
import { FaShieldAlt, FaLock, FaTruck, FaCheckCircle, FaMoneyBillWave, FaHeadset } from 'react-icons/fa'; // Add react-icons

const PAYMENT_IMAGES = {
    visa: "../assets/visa.svg",
    mastercard: "../assets/mastercard.svg",
    rupay: "../assets/amex.svg",
    razorpay: "https://razorpay.com/assets/razorpay-glyph.svg",
    secure: "https://cdn-icons-png.flaticon.com/512/6195/6195702.png",
    pci: "https://cdn-icons-png.flaticon.com/512/6107/6107137.png",
    ssl: "https://cdn-icons-png.flaticon.com/512/7947/7947657.png"
};

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1 },
    'United States': { currency: 'USD', symbol: '$', rate: 0.012 },
    'United Kingdom': { currency: 'GBP', symbol: '£', rate: 0.0097 },
    'European Union': { currency: 'EUR', symbol: '€', rate: 0.011 },
    'Canada': { currency: 'CAD', symbol: 'CA$', rate: 0.016 },
    'Australia': { currency: 'AUD', symbol: 'A$', rate: 0.018 },
    'Japan': { currency: 'JPY', symbol: '¥', rate: 1.67 },
    'China': { currency: 'CNY', symbol: '¥', rate: 0.088 },
    'Singapore': { currency: 'SGD', symbol: 'S$', rate: 0.016 },
    'United Arab Emirates': { currency: 'AED', symbol: 'د.إ', rate: 0.044 },
    'Switzerland': { currency: 'CHF', symbol: 'CHF', rate: 0.011 },
    'Russia': { currency: 'RUB', symbol: '₽', rate: 0.96 },
    'South Korea': { currency: 'KRW', symbol: '₩', rate: 15.68 },
    'Brazil': { currency: 'BRL', symbol: 'R$', rate: 0.059 },
    'South Africa': { currency: 'ZAR', symbol: 'R', rate: 0.22 }
};


const DEFAULT_COUNTRY = 'India';
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY];
const VALID_PROMO_CODE = "FLASH70";

const PaymentModeSelector = ({ selectedMode, onChange, translations }) => (
    <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
            {translations?.checkout?.mode || 'Payment Mode'}<span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200">
                <input
                    type="radio"
                    name="paymentMode"
                    value="online"
                    checked={selectedMode === 'online'}
                    onChange={(e) => onChange({ target: { name: 'paymentMode', value: e.target.value } })}
                    className="h-5 w-5 text-blue-600"
                />
                <div className="ml-4">
                    <span className="font-medium text-gray-900">Pay Securely Online</span>
                    <p className="text-sm text-green-600">Get 10% instant discount</p>
                </div>
            </label>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200">
                <input
                    type="radio"
                    name="paymentMode"
                    value="cod"
                    checked={selectedMode === 'cod'}
                    onChange={(e) => onChange({ target: { name: 'paymentMode', value: e.target.value } })}
                    className="h-5 w-5 text-blue-600"
                />
                <div className="ml-4">
                    <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                </div>
            </label>
        </div>
    </div>
);

// Add this new component for checkout progress
const CheckoutProgress = ({ currentStep }) => {
    const steps = [
        { id: 1, name: "Cart" },
        { id: 2, name: "Shipping" },
        { id: 3, name: "Payment" },
        { id: 4, name: "Confirmation" }
    ];
    
    return (
        <div className="mb-8">
            <div className="flex items-center justify-center w-full">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="relative flex flex-col items-center">
                            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center py-3 
                                ${currentStep >= step.id 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-gray-200 text-gray-600"}`}>
                                {currentStep > step.id ? (
                                    <FaCheckCircle className="w-6 h-6" />
                                ) : (
                                    <span className="font-bold text-xl">{step.id}</span>
                                )}
                            </div>
                            <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium 
                                ${currentStep >= step.id ? "text-blue-600" : "text-gray-500"}`}>
                                {step.name}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-auto border-t-2 transition duration-500 ease-in-out 
                                ${currentStep > index + 1 ? "border-blue-600" : "border-gray-300"}`}>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// Add this new component for testimonials
const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah J.",
            role: "Verified Buyer",
            content: "The checkout process was smooth, and the delivery was faster than expected!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael T.",
            role: "Verified Buyer",
            content: "Great product and excellent shopping experience. Will buy again!",
            rating: 5
        },
        {
            id: 3,
            name: "Priya K.",
            role: "Verified Buyer",
            content: "Safe payment options and on-time delivery. Highly recommended!",
            rating: 4
        }
    ];
    
    return (
        <div className="my-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">What Our Customers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
                                {testimonial.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                                <p className="font-medium text-gray-800">{testimonial.name}</p>
                                <p className="text-sm text-green-600 flex items-center">
                                    <FaCheckCircle className="mr-1" size={12} />
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Add this component for security badges
const SecurityBadges = () => (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <FaShieldAlt className="mr-2 text-blue-600" />
            Secure Checkout
        </h4>
        <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-2 mb-2">
                <FaLock className="text-green-600" />
                <span className="text-sm text-gray-600">SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
                <img src={PAYMENT_IMAGES.pci} alt="PCI Compliant" className="h-6" />
                <span className="text-sm text-gray-600">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
                <img src={PAYMENT_IMAGES.secure} alt="Secure Transaction" className="h-6" />
                <span className="text-sm text-gray-600">100% Secure Transaction</span>
            </div>
        </div>
    </div>
);

const Checkouts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language } = useLanguage(); // Get language from context
    const translations = data[language] || data['ENGLISH']; // Use ENGLISH as fallback
    const [orderDetails, setOrderDetails] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [promoCode, setPromoCode] = useState("");
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [orderNumber, setOrderNumber] = useState(1); // Initial order number
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const productPrice = 3990; // Discounted price per unit
    const originalPrice = 6990; // Original price per unit
    const productImages = [product, product1, product2, product];
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);


    useEffect(() => {
        // Simulate fetching the latest order number from the backend
        const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
        setOrderNumber(parseInt(latestOrderNumber, 10));
    }, []);
    const incrementOrderNumber = () => {
        const nextOrderNumber = orderNumber + 1;
        setOrderNumber(nextOrderNumber);
        localStorage.setItem("orderNumber", nextOrderNumber); // Persist order number locally
    };
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: DEFAULT_COUNTRY,
        streetAddress: '',
        apartment: '',
        townCity: '',
        phone: '',
        email: '',
        paymentMode: ''
    });
    // Update currency and convert amount when country changes
    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Convert amount from INR to selected currency
            const baseAmount = orderDetails.totalAmount; // Total amount in INR
            const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails]);
    // Original useEffects for initialization and script loading...
    useEffect(() => {
        // Initialize orderDetails with default values
        setOrderDetails({
            quantity: quantity,
            totalAmount: quantity * productPrice,
            productName: 'Beyond Slim: Redefining Beauty and Health',
            unitPrice: productPrice
        });

        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [quantity]); // Add quantity as dependency

    // Update orderDetails whenever quantity changes
    useEffect(() => {
        setOrderDetails(prev => ({
            ...prev,
            quantity: quantity,
            totalAmount: quantity * productPrice
        }));
    }, [quantity]);
    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.country.trim()) errors.country = 'Country is required';
        if (!formData.streetAddress.trim()) errors.streetAddress = 'Street address is required';
        if (!formData.townCity.trim()) errors.townCity = 'Town/City is required';

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.paymentMode) errors.paymentMode = 'Please select a payment mode';

        return errors;
    };
    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            let baseAmount = orderDetails.totalAmount; // Total amount in INR
            let discountPercentage = 10;

            // Apply 10% discount for online payment
            if (formData.paymentMode === 'online') {
                baseAmount *= (1 - discountPercentage / 100);
            }

            const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails, formData.paymentMode]);
    const handlePromoCodeApply = () => {
        if (promoCode.trim().toUpperCase() === VALID_PROMO_CODE) {
            setIsPromoApplied(true);
            setFormErrors(prev => ({ ...prev, promoCode: "" }));
        } else {
            setIsPromoApplied(false);
            setFormErrors(prev => ({ ...prev, promoCode: "Invalid promo code" }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsProcessingOrder(true);
            setIsSubmitting(true);

            try {
                if (formData.paymentMode === 'online') {
                    handleRazorpayPayment();
                } else if (formData.paymentMode === 'cod') {
                    const formattedData = {
                        _subject: `New Order #${orderNumber} - Cash on Delivery`,
                        _template: "table",
                        _captcha: "false",
                        orderNumber: orderNumber,
                        orderDate: new Date().toISOString(),
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                        shippingAddress: `${formData.streetAddress}, ${formData.apartment || ''}, ${formData.townCity}, ${formData.country}`,
                        productName: orderDetails.productName,
                        quantity: orderDetails.quantity,
                        amount: `${currentCurrency.symbol} ${convertedAmount}`,
                        paymentMethod: "Cash on Delivery",
                        orderStatus: "Pending"
                    };

                    try {
                        const response = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(formattedData)
                        });

                        const result = await response.json();
                        console.log('Order submission result:', result);

                        if (result.success) {
                            incrementOrderNumber();
                            setPaymentSuccess(true);
                        } else {
                            throw new Error('Order submission failed');
                        }
                    } catch (error) {
                        throw new Error(`Failed to process order: ${error.message}`);
                    }
                }
            } catch (error) {
                console.error('Order processing error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: error.message || 'Failed to process order. Please try again.'
                }));
            } finally {
                setIsProcessingOrder(false);
                setIsSubmitting(false);
            }
        }
    };
    const handleRazorpayPayment = () => {
        const options = {
            key: 'rzp_test_vjJuid6KjiD8Nz',
            amount: Math.round(convertedAmount * 100), // Ensure amount is rounded
            currency: currentCurrency.currency,
            name: 'Beyond Slim',
            description: `Order for ${orderDetails.productName}`,
            image: 'https://your-brand-logo-url.png', // Add your brand logo URL here
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: '#4f46e5', // Customize to match your brand color
            },
            modal: {
                ondismiss: function () {
                    setIsSubmitting(false);
                },
                animation: true,
            },
            handler: async function (response) {
                try {
                    const formattedData = {
                        _subject: `New Order #${orderNumber} - Online Payment`,
                        _template: "table",
                        _captcha: "false",
                        orderNumber: orderNumber,
                        orderDate: new Date().toISOString(),
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                        shippingAddress: `${formData.streetAddress}, ${formData.apartment || ''}, ${formData.townCity}, ${formData.country}`,
                        productName: orderDetails.productName,
                        quantity: orderDetails.quantity,
                        amount: `${currentCurrency.symbol} ${convertedAmount}`,
                        paymentMethod: "Online Payment (Razorpay)",
                        paymentId: response.razorpay_payment_id,
                        orderStatus: "Paid"
                    };

                    const formResponse = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(formattedData)
                    });

                    if (!formResponse.ok) {
                        throw new Error(`HTTP error! status: ${formResponse.status}`);
                    }

                    const result = await formResponse.json();
                    console.log('Payment form submission result:', result); // Add logging

                    if (result.success) {
                        incrementOrderNumber();
                        setPaymentSuccess(true);
                    } else {
                        throw new Error("Failed to submit order details");
                    }
                } catch (error) {
                    console.error("Order submission error:", error);
                    setFormErrors(prev => ({
                        ...prev,
                        submit: "Payment successful but failed to send order details. Please contact support."
                    }));
                } finally {
                    setIsSubmitting(false);
                }
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };
    const renderFormField = (name, label, type = "text", required = true) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${formErrors[name] ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors[name] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
            )}
        </div>
    );
    const renderOrderSummary = () => (
        <div className="space-y-6">
            {/* Product Details Card */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <span className="text-gray-600 font-medium">{translations?.checkout?.product || 'Product'}</span>
                    <span className="text-gray-600 font-medium">{translations?.checkout?.subtotal || 'Subtotal'}</span>
                </div>

                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-md border border-gray-100 h-16 w-16 flex-shrink-0">
                            <img 
                                src={product} 
                                alt={orderDetails?.productName} 
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div>
                            <span className="text-gray-800 font-medium">{orderDetails?.productName}</span>
                            <span className="block text-sm text-gray-500">Quantity: {orderDetails?.quantity}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="line-through text-gray-400 text-sm">
                            {currentCurrency.symbol} {(originalPrice * orderDetails.quantity * currentCurrency.rate).toFixed(2)}
                        </span>
                        <span className="block font-bold text-gray-900">
                            {currentCurrency.symbol} {convertedAmount}
                        </span>
                        <span className="text-xs text-green-600">
                            You save: {currentCurrency.symbol} {((originalPrice - productPrice) * orderDetails.quantity * currentCurrency.rate).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Shipping Info with better styling */}
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <FaTruck className="text-blue-600 mr-2" />
                        <span className="font-medium text-gray-700">{translations?.checkout?.shipping || 'Shipping'}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-green-600 font-medium">Free</span>
                        <span className="block text-sm text-gray-600">Delivery within 5-7 business days</span>
                    </div>
                </div>
            </div>

            {/* Promo code section with improved styling */}
            <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handlePromoCodeApply}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Apply
                    </button>
                </div>
                {formErrors.promoCode && (
                    <p className="text-red-500 text-sm mt-2">{formErrors.promoCode}</p>
                )}
                {isPromoApplied && (
                    <div className="mt-2 p-2 bg-green-50 text-green-700 rounded flex items-center">
                        <FaCheckCircle className="mr-2" />
                        Promo code applied successfully!
                    </div>
                )}
            </div>

            {/* Total Amount with enhanced styling */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">
                        {currentCurrency.symbol} {convertedAmount}
                    </span>
                </div>
                {formData.paymentMode === 'online' && (
                    <div className="flex justify-between items-center py-2 text-green-600">
                        <span>Online Payment Discount (10%)</span>
                        <span>- {currentCurrency.symbol} {(orderDetails.totalAmount * 0.1 * currentCurrency.rate).toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center py-2 text-green-600">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="border-t mt-2 pt-2">
                    <div className="flex justify-between items-center py-2">
                        <span className="text-lg font-bold text-gray-800">{translations?.checkout?.total || 'Total'}</span>
                        <span className="text-lg font-bold text-blue-600">
                            {currentCurrency.symbol} {convertedAmount}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 text-right">
                        Inclusive of all taxes
                    </p>
                </div>
            </div>

            {/* Payment Mode Selection with better styling */}
            <div className="mt-6">
                <PaymentModeSelector
                    selectedMode={formData.paymentMode}
                    onChange={handleInputChange}
                    translations={translations}
                />
                {formErrors.paymentMode && (
                    <p className="text-red-500 text-sm mt-2">{formErrors.paymentMode}</p>
                )}
            </div>

            {/* Discount Banner with improved design */}
            <div className="mt-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-5 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                        <p className="text-center font-bold text-lg">
                            10% OFF on Online Payment!
                        </p>
                        <p className="text-center text-white text-opacity-90 text-sm">
                            Limited time offer - Pay online and save instantly
                        </p>
                    </div>
                </div>
            </div>

            {/* Security Badges Component */}
            <SecurityBadges />

            {/* Payment Methods Section with improved styling */}
            <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-3">Accepted Payment Methods</h4>
                <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-lg border border-gray-200">
                    <img src={visa} alt="Visa" className="h-8" />
                    <img src={mastercard} alt="Mastercard" className="h-8" />
                    <img src={rupay} alt="Rupay" className="h-8" />
                    <img src={razorpay} alt="Razorpay" className="h-8" />
                </div>
            </div>

            {/* Submit Button with Enhanced Styling */}
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl
                    transition-all duration-300 transform hover:scale-102 hover:shadow-lg flex items-center justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {translations?.checkout?.processing || 'Processing'}
                    </div>
                ) : (
                    <div className="flex items-center">
                        <FaLock className="mr-2" />
                        {translations?.checkout?.order || 'Complete Secure Payment'}
                    </div>
                )}
            </button>

            {/* Order Guarantee */}
            <div className="mt-4 text-center text-sm text-gray-600">
                <p className="flex items-center justify-center">
                    <FaShieldAlt className="text-green-600 mr-2" />
                    100% Secure Ordering | 30-Day Money-Back Guarantee
                </p>
            </div>
        </div>
    );
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (!orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (paymentSuccess) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
                <div className="max-w-2xl w-full mx-auto px-4 transform animate-fadeIn">
                    <div className="bg-white rounded-2xl p-10 border border-green-200 shadow-2xl">
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-green-600 animate-checkmark" viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    d="M20,6L9,17l-5-5"
                                    className="animate-draw"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-green-600 mb-4 animate-slideUp">
                            {translations?.checkout?.successfully || 'Order Successful!'}
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                            <p className="text-gray-700 mb-2 animate-slideUp delay-100">
                                {`${translations?.checkout?.orderNumber || 'Order Number'}: #${orderNumber}`}
                            </p>
                            <p className="text-gray-700 mb-2 animate-slideUp delay-100">
                                A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
                            </p>
                            <p className="text-gray-700 animate-slideUp delay-200">
                                We'll notify you when your order ships!
                            </p>
                        </div>
                        <div className="text-center animate-slideUp delay-300">
                            <button
                                onClick={() => navigate('/')}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl
                                     hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 
                                     font-bold shadow-lg"
                            >
                                {translations?.checkout?.continue || 'Continue Shopping'}
                            </button>
                            <p className="mt-4 text-gray-500 text-sm">
                                Thank you for shopping with Beyond Slim!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const LoadingOverlay = () => (
        isProcessingOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-700">Processing your order...</p>
                </div>
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <LoadingOverlay />
            {/* Hero Section with Enhanced Design */}
            <div className="bg-gradient-to-r pt-28 from-blue-600 to-purple-600 text-white py-10 mb-8 shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        {translations?.checkout?.title || 'Secure Checkout'}
                    </h1>
                    <p className="text-center text-blue-100 max-w-2xl mx-auto">
                        Complete your purchase securely with our trusted payment options
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-12">
                {/* Add the Progress Indicator */}
                <CheckoutProgress currentStep={2} />
                
                {/* Product Selection Section with Glass Morphism */}
                <div className='flex flex-col md:flex-row items-start gap-8 mb-12'>
                    <div className="w-full bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white border-opacity-20">
                        <div className="mb-8 w-full">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Product Images Section - Fixed sizing */}
                                <div className="md:w-1/2 space-y-4">
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={productImages[selectedImage]}
                                            alt="DR. Joints Pain Relief Oil"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 gap-1">
                                        {productImages.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`border-2 rounded-lg overflow-hidden h-10 sm:h-12 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                                                    }`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Product view ${index + 1}`}
                                                    className="w-full h-full object-contain"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center space-y-4 mt-4 sm:mt-0">
                                    <div className="text-lg sm:text-xl font-bold text-gray-800 flex flex-wrap items-center gap-2 sm:gap-4">
                                        <span className="line-through text-red-500">₹ {originalPrice}</span>
                                        <span className="text-green-600">₹ {productPrice}</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                        <div className="w-full sm:w-auto">
                                            <label htmlFor="quantity" className="block sm:inline mr-2 text-gray-700 mb-1 sm:mb-0">
                                                {translations?.productpage?.secondtitle || 'Quantity'}
                                            </label>
                                            <div className="flex items-center bg-white md:w-full w-1/2 shadow-md rounded-lg border border-gray-200">
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-xl font-medium rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    min="1"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                    className="w-16 px-3 py-2 text-center text-gray-700 font-medium border-x border-gray-200 focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity(prev => prev + 1)}
                                                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-xl font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {quantity > 1 && (
                                                <span className="ml-4 text-sm text-green-600 font-medium animate-fade-in">
                                                    {quantity} items selected
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AwardsSection />

                {/* Add Testimonials Section */}
                <Testimonials />

                {/* Main Checkout Grid with Enhanced Styling */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Billing Details Section */}
                    <div className="space-y-8">
                        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white border-opacity-30 transition-all duration-300 hover:shadow-2xl">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <FaShieldAlt className="text-blue-600 h-5 w-5" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    {translations?.checkout?.sectitle || 'Shipping Information'}
                                </h2>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {renderFormField("firstName", translations?.checkout?.firstname || 'First Name')}
                                    {renderFormField("lastName", translations?.checkout?.lastname || 'Last Name')}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {translations?.checkout?.country || 'Country'}<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                                            <option key={country} value={country}>
                                                {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {renderFormField("streetAddress", translations?.checkout?.address || 'Street Address')}
                                {renderFormField("apartment", translations?.checkout?.clientaddress || 'Apartment, suite, etc. (optional)', "text", false)}
                                {renderFormField("townCity", translations?.checkout?.city || 'Town/City')}
                                {renderFormField("phone", translations?.checkout?.phone || 'Phone', "tel")}
                                {renderFormField("email", translations?.checkout?.email || 'Email', "email")}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div>
                        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white border-opacity-30 sticky top-4 transition-all duration-300 hover:shadow-2xl">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-100 p-2 rounded-full mr-3">
                                    <FaMoneyBillWave className="text-green-600 h-5 w-5" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    Order Summary
                                </h2>
                            </div>
                            {renderOrderSummary()}
                        </div>
                    </div>
                </div>

                {/* Trust Badges Section */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8">Why Shop With Us</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
                            <div className="bg-blue-100 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                                <FaShieldAlt className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="font-bold text-gray-800">Secure Payment</h3>
                            <p className="text-sm text-gray-600 mt-2">Your data is protected with 256-bit SSL encryption</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
                            <div className="bg-green-100 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                                <FaTruck className="text-green-600 text-2xl" />
                            </div>
                            <h3 className="font-bold text-gray-800">Fast Delivery</h3>
                            <p className="text-sm text-gray-600 mt-2">Receive your order within 5-7 business days</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
                            <div className="bg-purple-100 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                                <FaMoneyBillWave className="text-purple-600 text-2xl" />
                            </div>
                            <h3 className="font-bold text-gray-800">Multiple Payment Options</h3>
                            <p className="text-sm text-gray-600 mt-2">Credit/Debit Cards, UPI, Net Banking & COD</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
                            <div className="bg-orange-100 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                                <FaHeadset className="text-orange-600 text-2xl" />
                            </div>
                            <h3 className="font-bold text-gray-800">24/7 Customer Support</h3>
                            <p className="text-sm text-gray-600 mt-2">Our team is always ready to help you</p>
                        </div>
                    </div>
                </div>
                
                {/* Add a Trust Seal Section */}
                <div className="mt-12 text-center max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Trusted by Thousands of Customers</h3>
                    <p className="text-gray-600 mb-6">Join our satisfied customers who have experienced the best in beauty and health with Beyond Slim.</p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FaLock className="text-green-600 mr-2" />
                            <span className="font-medium">SSL Secured</span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FaShieldAlt className="text-blue-600 mr-2" />
                            <span className="font-medium">100% Guaranteed</span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FaCheckCircle className="text-green-600 mr-2" />
                            <span className="font-medium">Verified Business</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkouts;