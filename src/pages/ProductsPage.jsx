import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useTranslation } from 'react-i18next';

import { CogIcon, ChartBarIcon, WrenchScrewdriverIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import AiPlanComparison from '../components/AiPlanComparison';

const galleryImages = [
  '/y_assm_01.jpg',
  '/y_assm_02.jpg',
  '/y_assm_03.jpg',
  '/y_assm_04.jpg',
  '/m_assm_05.jpg'
];

// --- Visual Components ---

const CarGallery = () => (
  <Swiper
    modules={[Navigation, Pagination, EffectCoverflow]}
    loop={true}
    effect={'coverflow'}
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={'auto'}
    coverflowEffect={{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }}
    pagination={{ clickable: true }}
    navigation={true}
    className="w-full"
  >
    {galleryImages.map((src, index) => (
      <SwiperSlide key={index} style={{ width: '80%', maxWidth: '500px' }}>
        <img src={src} alt={`VR7.5 image ${index + 1}`} className="rounded-lg shadow-2xl" />
      </SwiperSlide>
    ))}
  </Swiper>
);

const VisualPlaceholder = ({ src, alt }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg shadow-2xl border border-gray-700 h-full flex items-center justify-center">
        <img src={src} alt={alt} className="rounded-lg w-full h-auto object-cover max-h-[400px]" />
    </div>
);


// --- Refactored ServiceSection ---

const ServiceSection = ({ icon: Icon, title, children, visual, reverse = false }) => (
  <motion.div 
    className="items-center grid grid-cols-1 md:grid-cols-2 gap-12"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    <div className={`md:order-${reverse ? '2' : '1'}`}>
      <Icon className="h-12 w-12 text-brand-pink mb-4" />
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <div className="text-gray-300 space-y-4">
        {children}
      </div>
    </div>
    <div className={`md:order-${reverse ? '1' : '2'} w-full h-full flex items-center justify-center`}>
      {visual}
    </div>
  </motion.div>
);

const ProductsPage = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24 space-y-24">
        
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">{t('products_page.header_title')}</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            {t('products_page.header_desc')}
          </p>
        </header>

        {/* Vehicle Showcase */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">{t('products_page.gallery_title')}</h2>
          <CarGallery />
        </section>

        {/* Core Services */}
        <div className="space-y-24">
          <ServiceSection 
            icon={TruckIcon} 
            title={t('products_page.service1_title')}
            visual={<VisualPlaceholder src="/y_com_car_01.jpg" alt="VR7.5 Production" />}
          >
            <p>
              {t('products_page.service1_desc1')}
            </p>
            <p>
              {t('products_page.service1_desc2')}
            </p>
          </ServiceSection>

          <ServiceSection 
            icon={CogIcon} 
            title={t('products_page.service2_title')}
            visual={<VisualPlaceholder src="/y_part_01.jpg" alt="Aero Components" />}
            reverse={true}
          >
            <p>
              {t('products_page.service2_desc')}
            </p>
          </ServiceSection>
          
          <ServiceSection 
            icon={WrenchScrewdriverIcon} 
            title={t('products_page.service3_title')}
            visual={<VisualPlaceholder src="/y_support_01.jpg" alt="Maintenance" />}
          >
            <p>
              {t('products_page.service3_desc')}
            </p>
          </ServiceSection>
        </div>

        {/* AI Plan Section */}
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">{t('products_page.ai_section_title')}</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            {t('products_page.ai_section_desc')}
          </p>
          <div className="mt-16">
            <AiPlanComparison />
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductsPage; 