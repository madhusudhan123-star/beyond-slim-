import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import data from '../utility/data';
import { FaLock, FaShieldAlt, FaCreditCard, FaPaypal, FaCheckCircle, FaRegCreditCard, FaCcPaypal } from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';
import {Helmet} from 'react-helmet-async'
import logo from '../assets/logo.png'; // Ensure the logo file path is correct

// Add Google Fonts import to index.html or add this at the top of your component
// This ensures the component uses better fonts
const fontStyles = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
`;

const SHIPPING_CHARGE = 0; // Updated to INR

const COUNTRIES = [
    { code: "AF", name: "Afghanistan" },
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" },
    { code: "AS", name: "American Samoa" },
    { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" },
    { code: "AI", name: "Anguilla" },
    { code: "AQ", name: "Antarctica" },
    { code: "AG", name: "Antigua and Barbuda" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AW", name: "Aruba" },
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" },
    { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" },
    { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" },
    { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Benin" },
    { code: "BM", name: "Bermuda" },
    { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" },
    { code: "BV", name: "Bouvet Island" },
    { code: "BR", name: "Brazil" },
    { code: "IO", name: "British Indian Ocean Territory" },
    { code: "BN", name: "Brunei Darussalam" },
    { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" },
    { code: "CA", name: "Canada" },
    { code: "CV", name: "Cape Verde" },
    { code: "KY", name: "Cayman Islands" },
    { code: "CF", name: "Central African Republic" },
    { code: "TD", name: "Chad" },
    { code: "CL", name: "Chile" },
    { code: "CN", name: "China" },
    { code: "CX", name: "Christmas Island" },
    { code: "CC", name: "Cocos (Keeling) Islands" },
    { code: "CO", name: "Colombia" },
    { code: "KM", name: "Comoros" },
    { code: "CG", name: "Congo" },
    { code: "CD", name: "Congo, Democratic Republic of the" },
    { code: "CK", name: "Cook Islands" },
    { code: "CR", name: "Costa Rica" },
    { code: "CI", name: "Cote D'Ivoire" },
    { code: "HR", name: "Croatia" },
    { code: "CU", name: "Cuba" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DK", name: "Denmark" },
    { code: "DJ", name: "Djibouti" },
    { code: "DM", name: "Dominica" },
    { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" },
    { code: "EG", name: "Egypt" },
    { code: "SV", name: "El Salvador" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "ER", name: "Eritrea" },
    { code: "EE", name: "Estonia" },
    { code: "ET", name: "Ethiopia" },
    { code: "FK", name: "Falkland Islands (Malvinas)" },
    { code: "FO", name: "Faroe Islands" },
    { code: "FJ", name: "Fiji" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "GF", name: "French Guiana" },
    { code: "PF", name: "French Polynesia" },
    { code: "TF", name: "French Southern Territories" },
    { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambia" },
    { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" },
    { code: "GH", name: "Ghana" },
    { code: "GI", name: "Gibraltar" },
    { code: "GR", name: "Greece" },
    { code: "GL", name: "Greenland" },
    { code: "GD", name: "Grenada" },
    { code: "GP", name: "Guadeloupe" },
    { code: "GU", name: "Guam" },
    { code: "GT", name: "Guatemala" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haiti" },
    { code: "HM", name: "Heard Island and Mcdonald Islands" },
    { code: "VA", name: "Holy See (Vatican City State)" },
    { code: "HN", name: "Honduras" },
    { code: "HK", name: "Hong Kong" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" },
    { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" },
    { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japan" },
    { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KE", name: "Kenya" },
    { code: "KI", name: "Kiribati" },
    { code: "KP", name: "Korea, Democratic People's Republic of" },
    { code: "KR", name: "Korea, Republic of" },
    { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "LA", name: "Lao People's Democratic Republic" },
    { code: "LV", name: "Latvia" },
    { code: "LB", name: "Lebanon" },
    { code: "LS", name: "Lesotho" },
    { code: "LR", name: "Liberia" },
    { code: "LY", name: "Libyan Arab Jamahiriya" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MO", name: "Macao" },
    { code: "MK", name: "Macedonia" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaysia" },
    { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" },
    { code: "MT", name: "Malta" },
    { code: "MH", name: "Marshall Islands" },
    { code: "MQ", name: "Martinique" },
    { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauritius" },
    { code: "YT", name: "Mayotte" },
    { code: "MX", name: "Mexico" },
    { code: "FM", name: "Micronesia, Federated States of" },
    { code: "MD", name: "Moldova, Republic of" },
    { code: "MC", name: "Monaco" },
    { code: "MN", name: "Mongolia" },
    { code: "MS", name: "Montserrat" },
    { code: "MA", name: "Morocco" },
    { code: "MZ", name: "Mozambique" },
    { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" },
    { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" },
    { code: "NL", name: "Netherlands" },
    { code: "NC", name: "New Caledonia" },
    { code: "NZ", name: "New Zealand" },
    { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigeria" },
    { code: "NU", name: "Niue" },
    { code: "NF", name: "Norfolk Island" },
    { code: "MP", name: "Northern Mariana Islands" },
    { code: "NO", name: "Norway" },
    { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" },
    { code: "PW", name: "Palau" },
    { code: "PS", name: "Palestinian Territory, Occupied" },
    { code: "PA", name: "Panama" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" },
    { code: "PH", name: "Philippines" },
    { code: "PN", name: "Pitcairn" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "PR", name: "Puerto Rico" },
    { code: "QA", name: "Qatar" },
    { code: "RE", name: "Reunion" },
    { code: "RO", name: "Romania" },
    { code: "RU", name: "Russian Federation" },
    { code: "RW", name: "Rwanda" },
    { code: "SH", name: "Saint Helena" },
    { code: "KN", name: "Saint Kitts and Nevis" },
    { code: "LC", name: "Saint Lucia" },
    { code: "PM", name: "Saint Pierre and Miquelon" },
    { code: "VC", name: "Saint Vincent and the Grenadines" },
    { code: "WS", name: "Samoa" },
    { code: "SM", name: "San Marino" },
    { code: "ST", name: "Sao Tome and Principe" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SN", name: "Senegal" },
    { code: "CS", name: "Serbia and Montenegro" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "SB", name: "Solomon Islands" },
    { code: "SO", name: "Somalia" },
    { code: "ZA", name: "South Africa" },
    { code: "GS", name: "South Georgia and the South Sandwich Islands" },
    { code: "ES", name: "Spain" },
    { code: "LK", name: "Sri Lanka" },
    { code: "SD", name: "Sudan" },
    { code: "SR", name: "Suriname" },
    { code: "SJ", name: "Svalbard and Jan Mayen" },
    { code: "SZ", name: "Swaziland" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "SY", name: "Syrian Arab Republic" },
    { code: "TW", name: "Taiwan" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania, United Republic of" },
    { code: "TH", name: "Thailand" },
    { code: "TL", name: "Timor-Leste" },
    { code: "TG", name: "Togo" },
    { code: "TK", name: "Tokelau" },
    { code: "TO", name: "Tonga" },
    { code: "TT", name: "Trinidad and Tobago" },
    { code: "TN", name: "Tunisia" },
    { code: "TR", name: "Turkey" },
    { code: "TM", name: "Turkmenistan" },
    { code: "TC", name: "Turks and Caicos Islands" },
    { code: "TV", name: "Tuvalu" },
    { code: "UG", name: "Uganda" },
    { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "UM", name: "United States Minor Outlying Islands" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VU", name: "Vanuatu" },
    { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Viet Nam" },
    { code: "VG", name: "Virgin Islands, British" },
    { code: "VI", name: "Virgin Islands, U.S." },
    { code: "WF", name: "Wallis and Futuna" },
    { code: "EH", name: "Western Sahara" },
    { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" }
];

// Add styles for the moda
const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            fontFamily: "'Poppins', sans-serif",
        },
        content: {
            background: '#fff',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '520px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
};

// Updated helper function at the top level
const formatCurrency = (amount) => {
    return `₹ ${Number(amount).toFixed(2)}`;
};

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
    return (
        <div className="flex flex-col space-y-4 mb-6 font-['Inter',sans-serif]">
            <h3 className="text-lg font-semibold text-gray-800">Select Payment Method</h3>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-all duration-200 hover:shadow-md">
                <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={selectedMethod === 'razorpay'}
                    onChange={() => onSelect('razorpay')}
                    className="h-5 w-5 text-indigo-600"
                />
                <div className="ml-4 flex items-center">
                    <SiRazorpay className="text-blue-500 text-3xl mr-2" />
                    <span className="font-medium text-gray-900">Razorpay</span>
                    <span className="ml-2 text-sm text-gray-600">(Cards, UPI, Net Banking)</span>
                </div>
            </label>
            
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-all duration-200 hover:shadow-md">
                <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedMethod === 'cod'}
                    onChange={() => onSelect('cod')}
                    className="h-5 w-5 text-indigo-600"
                />
                <div className="ml-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-gray-900">Cash On Delivery</span>
                    <span className="ml-2 text-sm text-gray-600">(Pay when you receive)</span>
                </div>
            </label>
        </div>
    );
};

const Checkout = () => {
    const paypalRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const checkoutData = data[language].checkout;
    const orderDetails = location.state || { productName: 'Product', quantity: 1, totalAmount: 10 };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formComplete, setFormComplete] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('razorpay'); // Default to Razorpay
    const paymentSectionRef = useRef(null);
    const formColumnRef = useRef(null); // Add ref for the form column
    const orderSummaryRef = useRef(null); // Add ref for the order summary column

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: 'India',
    });

    const [formErrors, setFormErrors] = useState({});

    const [currentStep, setCurrentStep] = useState(1);
    const [animateForm, setAnimateForm] = useState(false);

    // Define all helper functions before the main return statement
    const renderCheckoutProgress = () => (
        <div className="flex justify-center ml-10 my-10">
            <div className="flex items-center w-full max-w-2xl relative">
                {/* Progress line */}
                <div className="absolute h-1 bg-gray-200 w-full top-4 z-0"></div>
                <div className={`absolute h-1 bg-blue-600 transition-all duration-500 top-4 z-0`} 
                     style={{width: `${((currentStep - 1) / 2) * 100}%`}}></div>
                
                {/* Steps */}
                {['Information', 'Payment', 'Confirmation'].map((step, index) => (
                    <div key={step} className="flex-1">
                        <div className={`flex flex-col items-center relative z-10 
                            ${currentStep > index + 1 ? 'text-blue-600' : 
                              currentStep === index + 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full 
                                transition-all duration-300 ${
                                currentStep > index + 1 ? 'bg-blue-600 text-white' :
                                currentStep === index + 1 ? 'bg-blue-100 border-2 border-blue-600' : 
                                'bg-gray-200'}`}>
                                {currentStep > index + 1 ? '✓' : index + 1}
                            </div>
                            <span className="text-xs mt-2 font-medium">{step}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderOrderSummary = () => (
        <div className={`bg-white p-8  ${animateForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 tracking-tight">
                {checkoutData.title}
            </h2>
            
            <div className="space-y-4">
                {/* Product Details - Make sure quantity is displayed correctly */}
                <div className="flex justify-between py-2">
                    <span className="text-gray-700 font-medium">
                        {orderDetails?.productName} x {orderDetails?.quantity || 1}
                    </span>
                    <span className="text-gray-700 font-semibold">
                        {formatCurrency(orderDetails?.totalAmount)}
                    </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between py-2 border-t border-gray-200">
                    <span className="font-medium text-gray-700">
                        {checkoutData.orderSummary.shipping}
                    </span>
                    <div className="text-sm text-gray-500 mt-1 flex flex-col items-end gap-2">
                        <span className="text-gray-700">{formatCurrency(SHIPPING_CHARGE)}</span>
                        <span>(Delivery within 5-7 business days)</span>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between py-4 border-t border-gray-200 mt-2">
                    <span className="text-lg font-bold text-gray-800">
                        {checkoutData.orderSummary.total}
                    </span>
                    <span className="text-lg font-bold text-indigo-700">
                        {formatCurrency(orderDetails?.totalAmount + SHIPPING_CHARGE)}
                    </span>
                </div>
            </div>
            
            {renderTrustBadges()}
            
            {/* <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-2">
                    Our customer support team is available Monday-Friday, 9am-6pm.
                </p>
                <a href="tel:+919908526444" className="text-blue-600 font-medium text-sm hover:underline">
                    Call: +91 990-852-6444
                </a>
            </div> */}
        </div>
    );

    const renderTrustBadges = () => (
        <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
                <p className="text-gray-600 font-medium flex items-center justify-center">
                    <FaShieldAlt className="text-green-600 mr-2" />
                    Secure Checkout
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Your information is protected using secure encryption
                </p>
            </div>
            
            <div className="flex items-center justify-center flex-wrap gap-4 mt-2">
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded">
                    <FaLock className="text-gray-600 mr-2" />
                    <span className="text-xs text-gray-700">SSL Secured</span>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded">
                    <FaRegCreditCard className="text-gray-600 mr-2" />
                    <span className="text-xs text-gray-700">Encrypted Payment</span>
                </div>
            </div>

            <div className="border-t border-gray-200 w-full my-4 pt-4"></div>
            <p className="text-center text-sm font-medium text-gray-700">We Accept</p>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
                <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="American Express" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/128/825/825464.png" alt="RuPay" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/128/6124/6124998.png" alt="UPI" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/128/4901/4901284.png" alt="Net Banking" className="h-6" />
            </div>
            
            {/* Additional Trust Badges */}
            <div className="border-t border-gray-200 w-full my-4 pt-4"></div>
            <p className="text-center text-sm font-medium text-gray-700 mb-3">Shop With Confidence</p>
            <div className="grid grid-cols-2 gap-3 w-full">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <img src="https://cdn-icons-png.flaticon.com/128/2038/2038828.png" alt="100% Secure" className="h-8 mb-2" />
                    <span className="text-xs font-medium text-gray-700">100% Secure</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <img src="https://cdn-icons-png.flaticon.com/128/9342/9342023.png" alt="Money-Back Guarantee" className="h-8 mb-2" />
                    <span className="text-xs font-medium text-gray-700">Money-Back Guarantee</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <img src="https://cdn-icons-png.flaticon.com/128/1161/1161388.png" alt="Free Delivery" className="h-8 mb-2" />
                    <span className="text-xs font-medium text-gray-700">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <img src="https://cdn-icons-png.flaticon.com/128/4341/4341977.png" alt="Authentic Products" className="h-8 mb-2" />
                    <span className="text-xs font-medium text-gray-700">Authentic Products</span>
                </div>
            </div>
            
            {/* Additional certification badges */}
            <div className="border-t border-gray-200 w-full my-4 pt-4"></div>
            <div className="flex flex-wrap justify-center gap-4">
                <div className="flex flex-col items-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/7616/7616931.png" alt="Quality Tested" className="h-10 mb-1" />
                    <span className="text-xs text-gray-600">Quality Tested</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/5928/5928231.png" alt="Natural Ingredients" className="h-10 mb-1" />
                    <span className="text-xs text-gray-600">Natural Ingredients</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/4107/4107420.png" alt="Certified" className="h-10 mb-1" />
                    <span className="text-xs text-gray-600">Certified</span>
                </div>
            </div>
        </div>
    );

const sendOrderConfirmationEmail = async (paymentDetails) => {
    try {
        // Try using the backend email API first
        try {
            const emailResponse = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: formData.email,
                    subject: `Order Confirmation - ${orderDetails.productName}`,
                    message: `
                        Dear ${formData.firstName} ${formData.lastName},

                        Thank you for your order from Beyond Slim!

                        Order Details:
                        Product: ${orderDetails.productName}
                        Quantity: ${orderDetails.quantity}
                        Total: ${formatCurrency(orderDetails.totalAmount + SHIPPING_CHARGE)}
                        
                        Customer Information:
                        Name: ${formData.firstName} ${formData.lastName}
                        Email: ${formData.email}
                        Phone: ${formData.phone}
                        Address: ${formData.address}
                        City: ${formData.city}
                        Country: ${formData.country}
                        
                        Payment Information:
                        Transaction ID: ${paymentDetails.id}
                        Status: ${paymentDetails.status}
                        
                        Your order will be processed soon. For any questions, please contact our support team.
                        
                        Thank you for shopping with Beyond Slim!
                    `
                })
            });
            
            const emailResult = await emailResponse.json();
            if (emailResult.success) {
                return true;
            }
        } catch (emailApiError) {
            console.log("Backend email API failed, trying FormSubmit instead");
        }
        
        // Fallback to FormSubmit if backend email API fails
        const response = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: `Order Confirmation - ${orderDetails.productName}`,
                _template: 'table',
                _captcha: 'false',
                message: `
                    Order Details:
                    Product: ${orderDetails.productName}
                    Quantity: ${orderDetails.quantity}
                    Total: ${formatCurrency(orderDetails.totalAmount + SHIPPING_CHARGE)}
                    
                    Customer Information:
                    Name: ${formData.firstName} ${formData.lastName}
                    Email: ${formData.email}
                    Phone: ${formData.phone}
                    Address: ${formData.address}
                    City: ${formData.city}
                    Country: ${formData.country}
                    
                    Payment Information:
                    Transaction ID: ${paymentDetails.id}
                    Status: ${paymentDetails.status}
                    Time: ${new Date().toISOString()}
                `
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

    const validateForm = () => {
        const errors = {};

        // Existing validations
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.city) errors.city = 'City is required';

        // Enhanced phone validation
        if (!formData.phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits';
        }

        // Email validation
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Update formComplete state based on validation
        setFormComplete(Object.keys(errors).length === 0);
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Special handling for phone input
        if (name === 'phone') {
            // Remove any non-digit characters
            const phoneValue = value.replace(/\D/g, '');
            // Limit to 10 digits
            const truncatedPhone = phoneValue.slice(0, 10);
            setFormData(prev => ({
                ...prev,
                [name]: truncatedPhone
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                setFormComplete(true);
                setCurrentStep(2); // Update progress bar
                setIsSubmitting(false);
                
                // Add smooth scroll to payment section
                setTimeout(() => {
                    paymentSectionRef.current?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            } catch (error) {
                console.error('Form submission error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: "Error validating form. Please try again."
                }));
                setIsSubmitting(false);
            }
        }
    };

const handleRazorpayPayment = async () => {
    setIsSubmitting(true);
    
    try {
        // Calculate total amount with shipping
        const totalAmount = orderDetails.totalAmount + SHIPPING_CHARGE;
        
        // First create order on server
        const response = await fetch('http://localhost:5000/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: totalAmount,
                currency: 'INR',
                receipt: `beyond_order_${Date.now()}`,
                notes: {
                    productName: orderDetails.productName,
                    customerName: `${formData.firstName} ${formData.lastName}`,
                    customerEmail: formData.email,
                    quantity: orderDetails.quantity
                }
            }),
        });
        
        const orderData = await response.json();
        
        if (!orderData.success) {
            throw new Error(orderData.message || "Failed to create order");
        }
        
        const options = {
            key: orderData.key, // Key from backend API
            amount: orderData.order.amount,
            currency: orderData.order.currency,
            name: 'Beyond Slim',
            description: `Order for ${orderDetails.productName}`,
            order_id: orderData.order.id,
            image: 'https://cdn-icons-png.flaticon.com/512/2331/2331966.png', // Your logo URL
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            notes: {
                address: `${formData.address}, ${formData.city}, ${formData.country}`
            },
            theme: {
                color: '#4F46E5' // Match your indigo-600 color
            },
            handler: async function (response) {
                try {
                    // Verify payment on server
                    const verifyResponse = await fetch('http://localhost:5000/verify-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }),
                    });
                    
                    const verifyData = await verifyResponse.json();
                    
                    if (!verifyData.success) {
                        throw new Error("Payment verification failed");
                    }
                    
                    // Create payment details for success handling
                    const paymentDetails = {
                        id: response.razorpay_payment_id,
                        status: 'Completed',
                        update_time: new Date().toISOString(),
                        orderId: response.razorpay_order_id
                    };
                    
                    // Handle successful payment
                    onPaymentSuccess(paymentDetails);
                } catch (error) {
                    console.error("Payment verification error:", error);
                    setFormErrors(prev => ({
                        ...prev,
                        submit: "Payment successful but verification failed. Please contact support."
                    }));
                    setIsSubmitting(false);
                }
            },
            modal: {
                ondismiss: function () {
                    setIsSubmitting(false);
                }
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (error) {
        console.error("Payment initialization error:", error);
        setFormErrors(prev => ({
            ...prev,
            submit: "Failed to initialize payment. Please try again."
        }));
        setIsSubmitting(false);
    }
};

    const handleCodOrder = async () => {
        setIsSubmitting(true);
        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Create mock payment details for COD
            const paymentDetails = {
                id: `COD-${Date.now()}`,
                status: 'Pending',
                update_time: new Date().toISOString(),
                payment_method: 'Cash On Delivery'
            };
            
            onPaymentSuccess(paymentDetails);
        } catch (error) {
            console.error('COD processing error:', error);
            setFormErrors(prev => ({
                ...prev,
                submit: "There was an error processing your order. Please try again."
            }));
            setIsSubmitting(false);
        }
    };

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method);
    };

const onPaymentSuccess = async (order) => {
    setPaymentSuccess(true);
    setCurrentStep(3); // Update progress to final step
    
    // Try to send confirmation email
    const emailSent = await sendOrderConfirmationEmail(order);
    
    if (!emailSent) {
        console.warn("Failed to send confirmation email");
    }
};

    useEffect(() => {
        if (location.state) {
            console.log("Received from product page:", location.state);
        }
        
        if (!orderDetails) {
            navigate('/product');
            return;
        }

        // Don't overwrite the quantity from product page
        if (orderDetails.totalAmount !== orderDetails.quantity * 10) {
            const pricePerUnit = 10;
            orderDetails.totalAmount = pricePerUnit * orderDetails.quantity;
            console.log("Corrected order details:", orderDetails);
        }

        /* PayPal integration temporarily disabled
        if (formComplete) {
            const addPayPalScript = async () => {
                // PayPal script loading code...
            };

            const renderPayPalButtons = () => {
                // PayPal button rendering code...
            };

            addPayPalScript();
        }
        */
    }, [orderDetails, navigate, formComplete]);

    useEffect(() => {
        if (formComplete) {
            const loadRazorpayScript = () => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                document.body.appendChild(script);
                
                return script;
            };
            
            const razorpayScript = loadRazorpayScript();
            
            return () => {
                if (document.body.contains(razorpayScript)) {
                    document.body.removeChild(razorpayScript);
                }
            };
        }
    }, [formComplete]);

    useEffect(() => {
        setAnimateForm(true);
    }, []);

    // Add scroll synchronization effect
    useEffect(() => {
        const formColumn = formColumnRef.current;
        const orderSummary = orderSummaryRef.current;
        
        const handleScroll = () => {
            if (!formColumn || !orderSummary) return;
            
            const formScrollTop = window.scrollY;
            const formHeight = formColumn.offsetHeight;
            const windowHeight = window.innerHeight;
            const orderSummaryHeight = orderSummary.offsetHeight;
            
            // Calculate how much the order summary should move
            // Prevent moving too far down (keep it in viewport)
            const maxOffset = Math.max(0, formHeight - orderSummaryHeight);
            
            // Calculate scrolling progress as a percentage
            const scrollProgress = Math.min(formScrollTop / (formHeight - windowHeight + 300), 1);
            const translateY = Math.min(scrollProgress * maxOffset, maxOffset);
            
            // Apply smooth translation to the order summary
            orderSummary.style.transform = `translateY(${translateY}px)`;
            orderSummary.style.transition = 'transform 0.1s ease-out';
        };
        
        // Add scroll event listener to window
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Redirect if no order details
    if (!orderDetails) {
        navigate('/product');
        return null;
    }

    // Main component return
    return (
        <div className="pt-5 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-['Poppins',sans-serif]">
            <Helmet>
                <title>Checkout - Beyond Slim</title>
                <meta name="description" content="Complete your purchase of Beyond Slim products. Secure checkout with multiple payment options and free delivery available." />
                <meta name="keywords" content="checkout, payment, Beyond Slim, secure payment, online shopping" />
                <meta property="og:title" content="Secure Checkout - Beyond Slim" />
                <meta property="og:description" content="Complete your purchase securely with Beyond Slim. Multiple payment options available." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={window.location.href} />
                
                {/* Structured data for better SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CheckoutPage",
                        "name": "Beyond Slim Checkout",
                        "description": "Secure checkout page for Beyond Slim products",
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "INR",
                            "price": orderDetails?.totalAmount,
                            "availability": "https://schema.org/InStock"
                        }
                    })}
                </script>
            </Helmet>
            <style>{fontStyles}</style>

            {/* Centered Logo */}
            <div className="flex justify-center items-center">
                <img src={logo} alt="Logo" className="h-16" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <p className='my-5 font-medium text-gray-700 ml-10 tracking-wide'>Enjoy 100% natural products with free delivery.</p>
                
                {renderCheckoutProgress()}
                
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    {/* Checkout Form - First Column */}
                    <div 
                        ref={formColumnRef}
                        className={`bg-white p-8 ${animateForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3 tracking-tight">{checkoutData.shippingTitle}</h2>
                        
                        {!formComplete ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {checkoutData.formFields.firstName.label}
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder={checkoutData.formFields.firstName.placeholder}
                                            className={`block w-full rounded-md shadow-sm 
                                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                        border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} 
                                                        p-3 transition-all duration-200 hover:border-blue-400
                                                        focus:shadow-lg transform focus:scale-[1.01]
                                                        font-['Inter',sans-serif]`}
                                        />
                                        {formErrors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {checkoutData.formFields.firstName.error}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {checkoutData.formFields.lastName.label}
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder={checkoutData.formFields.lastName.placeholder}
                                            className={`block w-full rounded-md shadow-sm 
                                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                        border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} 
                                                        p-3 transition-all duration-200 hover:border-blue-400
                                                        focus:shadow-lg transform focus:scale-[1.01]
                                                        font-['Inter',sans-serif]`}
                                        />
                                        {formErrors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {checkoutData.formFields.lastName.error}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {checkoutData.formFields.email.label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder={checkoutData.formFields.email.placeholder}
                                            className={`block w-full rounded-md shadow-sm pl-10
                                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                    border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} 
                                                    p-3 transition-all duration-200 hover:border-blue-400
                                                    focus:shadow-lg transform focus:scale-[1.01]
                                                    font-['Inter',sans-serif]`}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {formErrors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {checkoutData.formFields.email.error}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {checkoutData.formFields.phone.label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder={checkoutData.formFields.phone.placeholder}
                                            maxLength="10"
                                            className={`block w-full rounded-md shadow-sm pl-10
                                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                    border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} 
                                                    p-3 transition-all duration-200 hover:border-blue-400
                                                    focus:shadow-lg transform focus:scale-[1.01]
                                                    font-['Inter',sans-serif]`}
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {formErrors.phone && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {checkoutData.formFields.phone.error}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-2 border-t border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-800 mb-3">Delivery Address</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {checkoutData.formFields.address.label}
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder={checkoutData.formFields.address.placeholder}
                                            className={`block w-full rounded-md shadow-sm 
                                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                        border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} 
                                                        p-3 transition-all duration-200 hover:border-blue-400
                                                        focus:shadow-lg transform focus:scale-[1.01]
                                                        font-['Inter',sans-serif]`}
                                        />
                                        {formErrors.address && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {checkoutData.formFields.address.error}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {checkoutData.formFields.city.label}
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder={checkoutData.formFields.city.placeholder}
                                                className={`block w-full rounded-md shadow-sm 
                                                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                            border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} 
                                                            p-3 transition-all duration-200 hover:border-blue-400
                                                            focus:shadow-lg transform focus:scale-[1.01]
                                                            font-['Inter',sans-serif]`}
                                            />
                                            {formErrors.city && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {checkoutData.formFields.city.error}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {checkoutData.formFields.country.label}
                                            </label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className={`block w-full rounded-md shadow-sm 
                                                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                            border ${formErrors.country ? 'border-red-500' : 'border-gray-300'} 
                                                            p-3 transition-all duration-200 hover:border-blue-400
                                                            focus:shadow-lg transform focus:scale-[1.01]
                                                            font-['Inter',sans-serif]`}
                                            >
                                                <option value="">Select a country</option>
                                                {COUNTRIES.map((country) => (
                                                    <option key={country.code} value={country.name}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.country && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {checkoutData.formFields.country.error}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
                                    <div className="flex items-center">
                                        <FaCheckCircle className="text-green-600 mr-2 text-xl" />
                                        <p className="text-blue-800 font-medium">
                                            100% Money Back Guarantee
                                        </p>
                                    </div>
                                    <p className="text-blue-600 text-sm mt-1 ml-6">
                                        15-day satisfaction guarantee or your money back
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-6 rounded-lg
                                                shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]
                                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                                flex items-center justify-center tracking-wide"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing...
                                            </div>
                                        ) : (
                                            <>
                                                <FaLock className="mr-2" />
                                                Continue to Payment
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-center">
                                        <FaCheckCircle className="text-green-500 mr-2 text-lg" />
                                        <p className="text-green-700 font-medium">
                                            Information validated! Please select your preferred payment method.
                                        </p>
                                    </div>
                                </div>
                                
                                <div ref={paymentSectionRef} className="border border-gray-300 rounded-lg p-5 mb-4 shadow-sm">
                                    <h3 className="font-medium text-gray-700 flex items-center mb-3">
                                        <FaCreditCard className="mr-2 text-indigo-600" />
                                        Secure Payment
                                    </h3>
                                    
                                    <PaymentMethodSelector 
                                        selectedMethod={paymentMethod}
                                        onSelect={handlePaymentMethodSelect}
                                    />
                                    
                                    {/* PayPal option temporarily disabled 
                                    {paymentMethod === 'paypal' && (
                                        <div ref={paypalRef} className="mt-4"></div>
                                    )}
                                    */}
                                    
                                    {paymentMethod === 'razorpay' && (
                                        <button
                                            onClick={handleRazorpayPayment}
                                            disabled={isSubmitting}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-6 rounded-lg
                                                    shadow-lg transition-all duration-300 transform hover:scale-[1.02]
                                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                                    flex items-center justify-center mt-4 tracking-wide"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Processing...
                                                </div>
                                            ) : (
                                                <>
                                                    <SiRazorpay className="mr-2 text-lg" />
                                                    Pay ₹ {(orderDetails.totalAmount + SHIPPING_CHARGE).toFixed(2)}
                                                </>
                                            )}
                                        </button>
                                    )}
                                    
                                    {paymentMethod === 'cod' && (
                                        <>
                                            <div className="mt-4 mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <div className="flex items-center text-yellow-800 mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="font-medium">Cash on Delivery Information</span>
                                                </div>
                                                <p className="text-yellow-700 text-sm ml-7">
                                                    Pay with cash upon delivery. Our delivery agent will collect the payment when your order arrives.
                                                </p>
                                            </div>
                                            
                                            <button
                                                onClick={handleCodOrder}
                                                disabled={isSubmitting}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 px-6 rounded-lg
                                                        shadow-lg transition-all duration-300 transform hover:scale-[1.02]
                                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
                                                        flex items-center justify-center tracking-wide"
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center justify-center">
                                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        Processing...
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                        </svg>
                                                        Place Order - ₹ {(orderDetails.totalAmount + SHIPPING_CHARGE).toFixed(2)}
                                                    </>
                                                )}
                                            </button>
                                        </>
                                    )}
                                </div>
                                
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                    <div className="flex items-center text-blue-700">
                                        <FaShieldAlt className="mr-2" />
                                        <span className="font-medium">Secure Transaction</span>
                                    </div>
                                    <p className="text-sm text-blue-600 mt-1 ml-6">
                                        Your payment information is securely processed and never stored.
                                    </p>
                                </div>
                                
                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By completing this payment, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                                </p>
                            </>
                        )}

                        {formErrors.submit && (
                            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-200">
                                {formErrors.submit}
                            </div>
                        )}
                    </div>
                    
                    {/* Order Summary - Second Column */}
                    <div className="relative bg-white">
                        <div
                            ref={orderSummaryRef}
                            className="transition-transform">
                            {renderOrderSummary()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Message Modal */}
            {paymentSuccess && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.content}>
                        <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <FaCheckCircle className="text-green-600 text-4xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
                            {checkoutData.successMessage.title}
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                            {checkoutData.successMessage.description} We've sent a confirmation email with your order details.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors
                                      shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 
                                      font-medium tracking-wide"
                        >
                            {checkoutData.successMessage.buttonText}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;