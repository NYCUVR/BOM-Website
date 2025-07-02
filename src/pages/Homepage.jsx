import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { lerp } from 'three/src/math/MathUtils';

import FeatureSection from '../components/FeatureSection';

// 3D Placeholder Model
function PlaceholderModel(props) {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#e31d93" roughness={0.5} metalness={0.5} />
    </mesh>
  );
}

const slideImages = [
  { url: "https://placehold.co/1920x1080/000000/FFFFFF.png?text=VR7.5+pic+1", alt: "VR7.5 on the track" },
  { url: "https://placehold.co/1920x1080/111111/FFFFFF.png?text=pic+2", alt: "The VR7.5 team" },
  { url: "https://placehold.co/1920x1080/222222/FFFFFF.png?text=pic+3", alt: "Workshop and manufacturing" },
  { url: "https://placehold.co/1920x1080/333333/FFFFFF.png?text=pic+4", alt: "AI Data Analysis" },
  { url: "https://placehold.co/1920x1080/444444/FFFFFF.png?text=pic+5", alt: "Circular Economy" },
];

// This component contains all the 3D and HTML scroll content
function Experience() {
  const [featureInView, setFeatureInView] = useState(false);
  const scroll = useScroll();
  const modelRef = useRef();

  useFrame((state, delta) => {
    // Get the range for the third page (features section)
    const featureRange = scroll.range(2 / 3, 1 / 3);

    // Determine if the feature section is in view
    setFeatureInView(featureRange > 0);

    // Animate the 3D model
    if (modelRef.current) {
        // When scrolling into the feature section, smoothly interpolate rotation back to 0
        const targetRotation = featureRange > 0 ? 0 : scroll.offset * Math.PI;

        // Use lerp for a smooth transition
        modelRef.current.rotation.y = lerp(modelRef.current.rotation.y, targetRotation, 0.1);
    }
  });

  return (
    <>
      {/* 3D Model */}
      <group ref={modelRef}>
        <PlaceholderModel scale={1.8} position={[0, -1, 0]} />
      </group>

      {/* HTML Content overlay */}
      <Scroll html>
        <div className="w-screen">
          {/* Page 1: Hero with Swiper background */}
          <div className="relative h-screen">
             <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                className="absolute inset-0 w-full h-full"
              >
                {slideImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image.url})` }}></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute inset-0 bg-black opacity-60"></div>
              <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">創新源於賽道</h1>
                  <h2 className="text-5xl md:text-7xl font-bold text-brand-pink mt-2">智慧定義未來</h2>
                  <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-300">
                    我們是 VR7.5 學生方程式賽車隊，致力於結合尖端工程、AI 數據分析與循環經濟，打造賽道上的永續性能標竿。
                  </p>
              </div>
          </div>

          {/* Page 2: Additional Content */}
          <div className="h-screen flex flex-col justify-center items-center text-center p-8">
             <h2 className="text-4xl font-bold text-white mb-4">不只追求速度，更建構循環</h2>
             <p className="max-w-3xl text-gray-300">
                我們的核心使命是證明高性能與永續可以共存。透過導入循環經濟模型，我們不僅在賽道上追求極致表現，更在物料科學與供應鏈管理上進行創新。從可回收的碳纖維複合材料，到與在地廠商合作開發的翻新零件，我們正在為賽車運動的未來，探索一個更環保、更具韌性的可能。
             </p>
          </div>

          {/* Page 3: Feature Section */}
          <div className="h-screen flex items-center">
            <FeatureSection inView={featureInView} />
          </div>
        </div>
      </Scroll>
    </>
  );
}

const Homepage = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <ScrollControls pages={3} damping={0.1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Homepage; 