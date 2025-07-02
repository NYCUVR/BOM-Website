import React from 'react';
import { motion } from 'framer-motion';

const CtaSection = ({ inView }) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.section
      className="text-white container mx-auto px-4 py-16 md:py-24 text-center"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
        準備好踏上賽道了嗎？
      </h2>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
        我們的專家團隊將協助您了解車輛的每一個細節，並為您量身打造最適合的方案。立即預約一對一線上諮詢。
      </p>
      <div className="mt-10">
        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-brand-pink text-white font-bold rounded-md hover:bg-brand-gold transition-colors duration-300 shadow-lg transform hover:scale-105"
        >
          預約諮詢
        </a>
      </div>
    </motion.section>
  );
};

export default CtaSection; 