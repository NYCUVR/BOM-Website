import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import required modules
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

const slideImages = [
  { url: "https://placehold.co/1920x1080/000000/FFFFFF.png?text=VR7.5+賽道英姿", alt: "VR7.5 on the track" },
  { url: "https://placehold.co/1920x1080/111111/FFFFFF.png?text=團隊合照", alt: "The VR7.5 team" },
  { url: "https://placehold.co/1920x1080/222222/FFFFFF.png?text=工廠實作", alt: "Workshop and manufacturing" },
];

const HeroSection = () => {
  return (
    <div className="relative bg-black text-white h-[70vh] min-h-[500px] flex items-center justify-center">
      {/* Swiper Slider Background */}
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 950,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="absolute inset-0 w-full h-full"
      >
        {slideImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          創新源於賽道
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-brand-pink mt-2">
          智慧定義未來
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
          我們是 VR7.5 學生方程式賽車隊，致力於結合尖端工程、AI 數據分析與循環經濟，打造賽道上的永續性能標竿。
        </p>
      </div>
    </div>
  );
};

export default HeroSection; 