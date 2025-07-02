import React from 'react';

const FutureGoalsSection = () => {
    return (
        <section className="bg-gray-900 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-pink">未來目標</h2>
                <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
                    <ul className="text-lg md:text-xl text-gray-300 space-y-4 list-disc list-inside">
                        <li>參加 JSAE (日本自動車技術會) 的比賽。</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FutureGoalsSection; 