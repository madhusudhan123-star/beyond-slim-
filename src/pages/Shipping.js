import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import data from '../utility/data';

const Shipping = () => {
    const { language } = useLanguage();
    const shippingData = data[language].shipping;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {shippingData.title}
                    </h1>
                    <p className="text-gray-600">
                        {shippingData.lastUpdated}
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="space-y-8">
                    {shippingData.sections.map((section, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                {section.title}
                            </h2>

                            {section.text && (
                                <p className="text-gray-700 mb-4">
                                    {section.text}
                                </p>
                            )}

                            {section.list && (
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    {section.list.map((item, itemIndex) => (
                                        <li key={itemIndex} className="text-gray-600">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.content && (
                                <div className="space-y-4">
                                    {section.content.map((item, contentIndex) => (
                                        <div key={contentIndex}>
                                            {item.subtitle && (
                                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                                    {item.subtitle}
                                                </h3>
                                            )}
                                            <p className="text-gray-600">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Message */}
                <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <p className="text-gray-700 text-center">
                        {shippingData.footer.text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
