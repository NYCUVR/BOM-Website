import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardDocumentCheckIcon, ShoppingCartIcon, ChartPieIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const tabs = [
  { id: 'testDrive', name: '試駕申請', icon: ClipboardDocumentCheckIcon },
  { id: 'purchase', name: '購車專人', icon: ShoppingCartIcon },
  { id: 'dataRequest', name: '索取分析資料', icon: ChartPieIcon },
];

const FormInput = ({ label, type = 'text', name, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-3 focus:ring-brand-pink focus:border-brand-pink transition"
      placeholder={placeholder}
      required
    />
  </div>
);

const FormTextarea = ({ label, name, placeholder }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <textarea
        name={name}
        id={name}
        rows="4"
        className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-3 focus:ring-brand-pink focus:border-brand-pink transition"
        placeholder={placeholder}
      ></textarea>
    </div>
);

const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Submitted:', data);
    alert(`感謝您的填寫！\n\n表單類型: ${tabs.find(t => t.id === activeTab).name}\n資料（已顯示於主控台）:\n${JSON.stringify(data, null, 2)}\n\n(此為前端模擬，資料未實際送出)`);
    e.target.reset();
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'testDrive':
        return (
          <motion.form key="testDrive" onSubmit={handleSubmit} variants={formVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h3 className="text-2xl font-bold text-white">預約賽道試駕</h3>
            <p className="text-gray-400">親身體驗 VR7.5 的極致性能。請填寫以下資訊，我們將有專人與您聯繫安排。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="姓名" name="name" placeholder="您的姓名" />
              <FormInput label="電子郵件" type="email" name="email" placeholder="you@example.com" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="聯絡電話" name="phone" placeholder="您的電話" />
              <FormInput label="所屬公司/車隊名稱" name="company" placeholder="您的單位" />
            </div>
            <FormInput label="希望的試駕日期" type="date" name="date" />
            <FormTextarea label="其他備註" name="message" placeholder="是否有任何特殊需求？" />
            <button type="submit" className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors duration-300">提交申請</button>
          </motion.form>
        );
      case 'purchase':
        return (
          <motion.form key="purchase" onSubmit={handleSubmit} variants={formVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h3 className="text-2xl font-bold text-white">購車專人服務</h3>
            <p className="text-gray-400">我們的專家將為您提供完整的購車方案，包含客製化選項與技術支援。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="聯絡人姓名" name="name" placeholder="您的姓名" />
                <FormInput label="電子郵件" type="email" name="email" placeholder="you@example.com" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="聯絡電話" name="phone" placeholder="您的電話" />
                <FormInput label="預計採購數量" type="number" name="quantity" placeholder="1" />
            </div>
            <FormTextarea label="您的問題或特殊需求" name="message" placeholder="例如：是否需要客製化塗裝、特定的感測器配置...等" />
            <button type="submit" className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors duration-300">請求專人聯繫</button>
          </motion.form>
        );
      case 'dataRequest':
        return (
          <motion.form key="dataRequest" onSubmit={handleSubmit} variants={formVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h3 className="text-2xl font-bold text-white">索取駕駛分析資料</h3>
            <p className="text-gray-400">我們的數據分析服務是提升賽道表現的關鍵。索取範例資料，了解我們如何將數據轉化為勝利。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="姓名" name="name" placeholder="您的姓名" />
                <FormInput label="公司/研究單位名稱" name="company" placeholder="您的單位" />
            </div>
            <FormInput label="電子郵件" type="email" name="email" placeholder="you@example.com" />
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">感興趣的數據類型（可複選）</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {['性能與圈速', '電池健康度', '空力效益', '底盤動態', '駕駛行為', '其他'].map(item => (
                        <div key={item} className="flex items-center">
                            <input id={item} name="data_type" type="checkbox" value={item} className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-brand-pink focus:ring-brand-pink" />
                            <label htmlFor={item} className="ml-2 text-sm text-gray-300">{item}</label>
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit" className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors duration-300">索取資料</button>
          </motion.form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24">
        
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">聯絡我們</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            無論您是想親身體驗我們的賽車、洽談採購，或是對我們的數據分析服務感興趣，我們都期待您的來信。
          </p>
        </header>

        <div className="max-w-4xl mx-auto md:flex gap-16">
            {/* Left Info Panel */}
            <div className="md:w-1/3 mb-12 md:mb-0">
                <h2 className="text-3xl font-bold text-brand-gold mb-6">直接聯繫</h2>
                <p className="text-gray-400 mb-8">如果您有其他問題，也歡迎透過以下方式直接與我們取得聯繫。</p>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <PhoneIcon className="h-6 w-6 text-brand-pink mt-1"/>
                        <div>
                            <h3 className="font-bold text-white">電話</h3>
                            <a href="tel:+886-3-5712121" className="text-gray-300 hover:text-brand-pink transition-colors">+886-3-5712121 Ext. 55101</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <EnvelopeIcon className="h-6 w-6 text-brand-pink mt-1"/>
                        <div>
                            <h3 className="font-bold text-white">電子郵件</h3>
                            <a href="mailto:contact@youracing.team" className="text-gray-300 hover:text-brand-pink transition-colors">contact@youracing.team</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="md:w-2/3 bg-gray-800 p-8 rounded-2xl shadow-2xl">
                {/* Tabs */}
                <div className="mb-8 flex space-x-1 bg-gray-700 rounded-lg p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                            activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
                        } flex-1 relative rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2`}
                    >
                        {activeTab === tab.id && (
                            <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 z-10 bg-brand-pink"
                            style={{ borderRadius: 6 }}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <tab.icon className="h-5 w-5 z-20" />
                        <span className="z-20">{tab.name}</span>
                    </button>
                ))}
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                    {renderForm()}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 