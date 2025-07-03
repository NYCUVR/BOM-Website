import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, ArrowsRightLeftIcon, CogIcon } from '@heroicons/react/24/outline';

const PartnerCategory = ({ icon: Icon, title, description, imgSrc, reverse = false }) => {
  const content = (
    <div className="md:w-1/2">
      <div className="flex items-center mb-4">
        <Icon className="h-10 w-10 text-brand-pink mr-4" />
        <h3 className="text-3xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );

  const visual = (
    <div className="md:w-1/2">
      <img src={imgSrc} alt={title} className="rounded-lg shadow-2xl object-cover w-full h-full aspect-[4/3]" />
    </div>
  );

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {content}
      {visual}
    </motion.div>
  );
};

const PartnersPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24 space-y-24">
        
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">我們的合作夥伴</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            我們的成就建立在與各領域領導者的緊密合作之上。從技術創新到資源共享，我們的夥伴是推動我們不斷前進的關鍵力量。
          </p>
        </header>

        <div className="space-y-20">
          <PartnerCategory
            icon={AcademicCapIcon}
            title="賽車學校"
            description="我們與頂尖的賽車學校和學術機構合作，進行知識交流與人才培育。這些合作不僅為我們的團隊帶來了最前沿的理論知識和駕駛技巧，也為學生提供了將理論付諸實踐的寶貴平台，共同培養下一代的工程與賽車精英。"
            imgSrc="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop"
          />
          <PartnerCategory
            icon={ArrowsRightLeftIcon}
            title="永續相關企業"
            description="在追求速度的同時，我們堅信永續發展的重要性。我們與致力於循環經濟和綠色科技的企業合作，探索使用創新的環保材料、開發高效的能源回收系統，並將賽車打造為展示永續技術的平台，共同推動一個更潔淨的未來。"
            imgSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
            reverse={true}
          />
          <PartnerCategory
            icon={CogIcon}
            title="零件供應商"
            description="每一台高性能賽車都由數千個精密零件構成。我們與世界級的零件供應商合作，確保從最小的螺絲到最核心的動力單元，都擁有最高的品質與可靠性。他們不僅是供應商，更是我們解決技術挑戰、實現極致性能的重要夥伴。"
            imgSrc="/sam-loyd-qy27JnsH9sU-unsplash.jpg"
          />
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gray-800 p-12 rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-bold text-brand-gold mb-4">成為推動我們的力量</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                您的支持將直接投入到下一代賽車的研發與製造，並幫助我們培育未來的工程師。我們提供多樣的合作方案，期待您成為我們邁向冠軍之路的夥伴。
            </p>
            <Link to="/contact">
                <button className="bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors duration-300 text-lg shadow-lg">
                    了解贊助方案
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default PartnersPage; 