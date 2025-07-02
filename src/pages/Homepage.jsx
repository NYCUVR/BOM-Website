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
import CtaSection from '../components/CtaSection';

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
  { url: "https://placehold.co/1920x1080/000000/FFFFFF.png?text=racing+1", alt: "A formula car on the track" },
  { url: "https://placehold.co/1920x1080/111111/FFFFFF.png?text=racing+2", alt: "Data visualization dashboard" },
  { url: "https://placehold.co/1920x1080/222222/FFFFFF.png?text=racing+3", alt: "Engineers working on a car" },
  { url: "https://placehold.co/1920x1080/222222/FFFFFF.png?text=racing+4", alt: "Engineers working on a car" },
];

// This component contains all the 3D and HTML scroll content
function Experience() {
  const [featureInView, setFeatureInView] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);
  const scroll = useScroll();
  const modelRef = useRef();

  useFrame((state, delta) => {
    // Page 3: CTA Section (from 2/4 to 3/4 of scroll)
    const ctaRange = scroll.range(2 / 4, 1 / 4);
    setCtaInView(ctaRange > 0);

    // Page 4: Feature Section (from 3/4 to 4/4 of scroll)
    const featureRange = scroll.range(3 / 4, 1 / 4);
    setFeatureInView(featureRange > 0);

    // Animate the 3D model
    if (modelRef.current) {
        // As we scroll into the last page (featureRange > 0), smoothly interpolate the rotation back to 0.
        const targetRotation = lerp(scroll.offset * Math.PI, 0, featureRange);
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
          {/* Page 1: Hero Section */}
          <div className="relative h-screen">
             <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                className="absolute inset-0 w-full h-full z-10"
              >
                {slideImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image.url})` }}></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute inset-0 bg-black opacity-60 z-20"></div>
              <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-30">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">您的第一台方程式賽車</h1>
                  <h2 className="text-5xl md:text-7xl font-bold text-brand-pink mt-2">從這裡開始</h2>
                  <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-300">
                    我們致力於打造高性能、高安全且易於駕馭的入門級方程式賽車，結合雲端智能分析，讓每位愛好者都能實現賽道夢想。
                  </p>
              </div>
          </div>

          {/* Page 2: Introductory text */}
          <div className="h-screen flex flex-col justify-center items-center text-center p-8">
             <h2 className="text-4xl font-bold text-white mb-4">不只是製造，更是賦能</h2>
             <p className="max-w-3xl text-gray-300">
                每一台賽車都搭載了我們的核心技術：連接雲端 AI 的智慧大腦。它不僅是您的座駕，更是您的專屬教練與工程師，陪您一同成長，發掘潛能極限。
             </p>
          </div>

          {/* Page 3: CTA Section */}
          <div className="h-screen flex items-center justify-center">
            <CtaSection inView={ctaInView} />
          </div>

          {/* Page 4: Feature Section */}
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
        <ScrollControls pages={4} damping={0.1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Homepage; 