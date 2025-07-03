import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
        <h1 className="text-4xl font-bold text-brand-pink mb-4">VR7.5 Racing</h1>
        <div className="w-1/4 max-w-sm bg-gray-700 rounded-full h-1.5">
            <motion.div
                className="bg-brand-pink h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{
                    duration: 1.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'mirror'
                }}
            />
        </div>
    </div>
  );
};

export default LoadingSpinner; 