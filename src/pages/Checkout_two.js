import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { ChevronLeft, ChevronRight, CreditCard, Package, Truck, User } from 'lucide-react';
import { SiRazorpay } from 'react-icons/si';

const Checkout_two = () => {
  const [activeStep, setActiveStep] = useState("information");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Added useLocation
  const orderDetails = location.state || { items: [], subtotal: 0, shipping: 0, tax: 0 }; // Default fallback

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) errors.phone = 'Valid 10-digit phone number is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zip) errors.zip = 'ZIP code is required';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    const errors = validateForm();
    if (activeStep === "information" && Object.keys(errors).length === 0) {
      setActiveStep("shipping");
    } else if (activeStep === "shipping") {
      setActiveStep("payment");
    }
    setFormErrors(errors);
  };

  const handlePrevious = () => {
    if (activeStep === "payment") setActiveStep("shipping");
    else if (activeStep === "shipping") setActiveStep("information");
  };

  const handleRazorpayPayment = () => {
    setIsSubmitting(true);
    const amountInRupees = 17046 * 83; // Convert USD to INR
    const options = {
      key: 'rzp_live_tGJjXr7rvi6keg', // Replace with your Razorpay key
      amount: amountInRupees, // Total amount in smallest currency unit (paise)
      currency: 'INR', // Change currency to INR
      name: 'Beyond Slim',
      description: 'Order Payment',
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      handler: (response) => {
        console.log('Payment successful:', response);
        navigate('/success'); // Redirect to success page
      },
      modal: {
        ondismiss: () => setIsSubmitting(false),
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      console.log('Cash on Delivery selected');
      navigate('/success'); // Redirect to success page
    }
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    };
    loadRazorpayScript();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {/* Card Header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <p className="text-gray-500">Complete your purchase</p>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              {/* Tabs Header */}
              <div className="grid grid-cols-3 gap-2 mb-8">
                <button 
                  onClick={() => setActiveStep("information")}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md ${activeStep === "information" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100"}`}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Information</span>
                </button>
                <button 
                  onClick={() => setActiveStep("shipping")}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md ${activeStep === "shipping" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100"}`}
                >
                  <Truck className="h-4 w-4" />
                  <span className="hidden sm:inline">Shipping</span>
                </button>
                <button 
                  onClick={() => setActiveStep("payment")}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md ${activeStep === "payment" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100"}`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Payment</span>
                </button>
              </div>

              {/* Information Tab */}
              {activeStep === "information" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="block text-sm font-medium">First name</label>
                      <input 
                        id="first-name" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John" 
                        className={`w-full px-3 py-2 border rounded-md ${formErrors.firstName ? 'border-red-500' : ''}`}
                      />
                      {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="block text-sm font-medium">Last name</label>
                      <input 
                        id="last-name" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe" 
                        className={`w-full px-3 py-2 border rounded-md ${formErrors.lastName ? 'border-red-500' : ''}`}
                      />
                      {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@example.com" 
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.email ? 'border-red-500' : ''}`}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                    <input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000" 
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                  </div>
                </div>
              )}

              {/* Shipping Tab */}
              {activeStep === "shipping" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium">Address</label>
                    <input 
                      id="address" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St" 
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.address ? 'border-red-500' : ''}`}
                    />
                    {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="apartment" className="block text-sm font-medium">Apartment, suite, etc. (optional)</label>
                    <input 
                      id="apartment" 
                      placeholder="Apt 4B" 
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-medium">City</label>
                      <input 
                        id="city" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="San Francisco" 
                        className={`w-full px-3 py-2 border rounded-md ${formErrors.city ? 'border-red-500' : ''}`}
                      />
                      {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-sm font-medium">State</label>
                      <input 
                        id="state" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="California" 
                        className={`w-full px-3 py-2 border rounded-md ${formErrors.state ? 'border-red-500' : ''}`}
                      />
                      {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="zip" className="block text-sm font-medium">ZIP code</label>
                      <input 
                        id="zip" 
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="94103" 
                        className={`w-full px-3 py-2 border rounded-md ${formErrors.zip ? 'border-red-500' : ''}`}
                      />
                      {formErrors.zip && <p className="text-red-500 text-sm">{formErrors.zip}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="country" className="block text-sm font-medium">Country</label>
                    <input 
                      id="country" 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="United States" 
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeStep === "payment" && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium">Payment Method</label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <input
                          type="radio"
                          name="payment"
                          value="razorpay"
                          checked={paymentMethod === 'razorpay'}
                          onChange={() => setPaymentMethod('razorpay')}
                          className="h-4 w-4"
                        />
                        <label htmlFor="razorpay" className="font-normal flex items-center gap-2">
                          <SiRazorpay className="h-4 w-4" />
                          Razorpay
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="h-4 w-4"
                        />
                        <label htmlFor="cod" className="font-normal">Cash on Delivery</label>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Order'}
                  </button>
                </div>
              )}
            </div>
            
            {/* Card Footer */}
            <div className="p-6 border-t flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={activeStep === "information"}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeStep === "information" 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              {activeStep === "payment" ? (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Order'}
                </button>
              ) : (
                <button 
                  onClick={handleNext} 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Order Summary</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" />
                      <div className="absolute top-0 right-0 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <hr className="my-2" />

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>₹{orderDetails.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>₹{orderDetails.tax.toFixed(2)}</span>
                </div>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>₹{(orderDetails.subtotal + orderDetails.shipping + orderDetails.tax).toFixed(2)}</span>
              </div>

              <div className="pt-4">
                <div className="rounded-md border p-4 bg-gray-50">
                  <div className="flex items-start gap-4">
                    <Package className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Free returns within 30 days</p>
                      <p className="text-xs text-gray-500">
                        Shop with confidence knowing you can return any item within 30 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout_two;