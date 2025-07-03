import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ClipboardDocumentCheckIcon, ShoppingCartIcon, EnvelopeIcon, PhoneIcon, HeartIcon } from '@heroicons/react/24/outline';

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
  const { t } = useTranslation();
  
  const tabs = [
    { id: 'testDrive', name: t('contact_page.tab_test_drive'), icon: ClipboardDocumentCheckIcon },
    { id: 'purchase', name: t('contact_page.tab_purchase'), icon: ShoppingCartIcon },
    { id: 'sponsorship', name: t('contact_page.tab_sponsorship'), icon: HeartIcon },
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Submitted:', data);
    const currentTabName = tabs.find(tab => tab.id === activeTab)?.name || '';
    alert(`${t('contact_page.alert_success_intro')}\n\n${t('contact_page.alert_form_type')}: ${currentTabName}\n${t('contact_page.alert_data_preview')}:\n${JSON.stringify(data, null, 2)}\n\n${t('contact_page.alert_frontend_simulation')}`);
    e.target.reset();
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'testDrive':
        return (
          <motion.form key="testDrive" onSubmit={handleSubmit} variants={formVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{t('contact_page.test_drive_form.title')}</h3>
            <p className="text-gray-400">{t('contact_page.test_drive_form.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label={t('contact_page.test_drive_form.name_label')} name="name" placeholder={t('contact_page.test_drive_form.name_placeholder')} />
              <FormInput label={t('contact_page.test_drive_form.email_label')} type="email" name="email" placeholder={t('contact_page.test_drive_form.email_placeholder')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label={t('contact_page.test_drive_form.phone_label')} name="phone" placeholder={t('contact_page.test_drive_form.phone_placeholder')} />
              <FormInput label={t('contact_page.test_drive_form.company_label')} name="company" placeholder={t('contact_page.test_drive_form.company_placeholder')} />
            </div>
            <FormInput label={t('contact_page.test_drive_form.date_label')} type="date" name="date" />
            <FormTextarea label={t('contact_page.test_drive_form.notes_label')} name="message" placeholder={t('contact_page.test_drive_form.notes_placeholder')} />
            <button type="submit" className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors duration-300">{t('contact_page.test_drive_form.submit_button')}</button>
          </motion.form>
        );
      case 'purchase':
        return (
          <motion.form key="purchase" onSubmit={handleSubmit} variants={formVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{t('contact_page.purchase_form.title')}</h3>
            <p className="text-gray-400">{t('contact_page.purchase_form.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('contact_page.purchase_form.name_label')} name="name" placeholder={t('contact_page.purchase_form.name_placeholder')} />
                <FormInput label={t('contact_page.purchase_form.email_label')} type="email" name="email" placeholder={t('contact_page.purchase_form.email_placeholder')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('contact_page.purchase_form.phone_label')} name="phone" placeholder={t('contact_page.purchase_form.phone_placeholder')} />
                <FormInput label={t('contact_page.purchase_form.quantity_label')} type="number" name="quantity" placeholder={t('contact_page.purchase_form.quantity_placeholder')} />
            </div>
            <FormTextarea label={t('contact_page.purchase_form.needs_label')} name="message" placeholder={t('contact_page.purchase_form.needs_placeholder')} />
            <button type="submit" className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors duration-300">{t('contact_page.purchase_form.submit_button')}</button>
          </motion.form>
        );
      case 'sponsorship':
        return (
          <motion.form key="sponsorship" onSubmit={handleSubmit} variants={formVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{t('contact_page.sponsorship_form.title')}</h3>
            <p className="text-gray-400">{t('contact_page.sponsorship_form.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label={t('contact_page.sponsorship_form.company_label')} name="company_name" placeholder={t('contact_page.sponsorship_form.company_placeholder')} />
              <FormInput label={t('contact_page.sponsorship_form.contact_name_label')} name="contact_person" placeholder={t('contact_page.sponsorship_form.contact_name_placeholder')} />
            </div>
            <FormInput label={t('contact_page.sponsorship_form.email_label')} type="email" name="email" placeholder={t('contact_page.sponsorship_form.email_placeholder')} />
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-300 mb-1">{t('contact_page.sponsorship_form.logo_label')}</label>
              <input
                type="file"
                name="logo"
                id="logo"
                accept="image/png, image/jpeg, image/svg+xml"
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-pink file:text-white hover:file:bg-pink-600 transition cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">{t('contact_page.sponsorship_form.logo_simulation_note')}</p>
            </div>
            <FormTextarea label={t('contact_page.sponsorship_form.sponsorship_details_label')} name="sponsorship_details" placeholder={t('contact_page.sponsorship_form.sponsorship_details_placeholder')} />
            <FormTextarea label={t('contact_page.sponsorship_form.other_message_label')} name="other_message" placeholder={t('contact_page.sponsorship_form.other_message_placeholder')} />
            <button type="submit" className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors duration-300">{t('contact_page.sponsorship_form.submit_button')}</button>
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
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">{t('contact_page.header_title')}</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            {t('contact_page.header_subtitle')}
          </p>
        </header>

        <div className="max-w-4xl mx-auto md:flex gap-16">
            {/* Left Info Panel */}
            <div className="md:w-1/3 mb-12 md:mb-0">
                <h2 className="text-3xl font-bold text-brand-gold mb-6">{t('contact_page.direct_contact_title')}</h2>
                <p className="text-gray-400 mb-8">{t('contact_page.direct_contact_subtitle')}</p>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <PhoneIcon className="h-6 w-6 text-brand-pink mt-1"/>
                        <div>
                            <h3 className="font-bold text-white">{t('contact_page.phone')}</h3>
                            {/* 電話號碼 */}
                            <a href="tel:+886-3-5712121" className="text-gray-300 hover:text-brand-pink transition-colors">+886-3-5712121 Ext. 55101</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <EnvelopeIcon className="h-6 w-6 text-brand-pink mt-1"/>
                        <div>
                            <h3 className="font-bold text-white">{t('contact_page.email')}</h3>
                            <a href="mailto:nycuracing@gmail.com" className="text-gray-300 hover:text-brand-pink transition-colors">nycuracing@gmail.com</a>
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