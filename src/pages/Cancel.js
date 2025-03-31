import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import data from '../utility/data';

const Cancel = () => {
    const { language } = useLanguage();
    const cancelData = data[language].cancel;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {cancelData.title}
                    </h1>
                    <p className="text-gray-600">
                        {cancelData.lastUpdated}
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="space-y-8">
                    {cancelData.sections.map((section, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                {section.title}
                            </h2>

                            {section.description && (
                                <p className="text-gray-700 mb-4">
                                    {section.description}
                                </p>
                            )}

                            <ul className="list-disc list-inside space-y-3">
                                {section.points.map((point, pointIndex) => (
                                    <li key={pointIndex} className="text-gray-600 leading-relaxed">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer Message */}
                <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <p className="text-gray-700 mb-4">
                        {cancelData.footer.message}
                    </p>
                    <p className="text-gray-700 font-medium">
                        {cancelData.footer.thankYou}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
