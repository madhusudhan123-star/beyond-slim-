import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import data from '../utility/data';

const ReturnPolicy = () => {
    const { language } = useLanguage();
    const returnData = data[language].return;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {returnData.title}
                    </h1>
                    <p className="text-gray-600">
                        {returnData.lastUpdated}
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="space-y-8">
                    {returnData.sections.map((section, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                {section.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Message */}
                <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <p className="text-gray-700 text-center">
                        {returnData.footer.contact}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;
