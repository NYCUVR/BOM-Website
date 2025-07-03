import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { lerp } from 'three/src/math/MathUtils';

import FeatureSection from '../components/FeatureSection';
import CtaSection from '../components/CtaSection';
import { CarModel } from '../components/CarModel';
import PlaceholderModel from '../components/PlaceholderModel';

// This component checks for the model and renders it, or a fallback.
function ModelManager() {
  const [modelExists, setModelExists] = useState(null);

  useEffect(() => {
    // Check if the model file exists by sending a HEAD request.
    fetch('/vr7_5_model.glb', { method: 'HEAD' })
      .then(res => {
        // A 404 error will result in res.ok being false.
        setModelExists(res.ok);
      })
      .catch(() => {
        // A network error or other issue.
        setModelExists(false);
      });
  }, []);

  // While checking, we can render nothing.
  if (modelExists === null) {
    return null;
  }

  return modelExists ? (
    // If the model exists, try to load it with Suspense.
    // Suspense will catch the loading state.
    <Suspense fallback={<PlaceholderModel scale={1.8} position={[0, -1, 0]} />}>
      <CarModel scale={0.8} position={[0, -1.5, 0]} rotation={[0, -Math.PI / 4, 0]} />
    </Suspense>
  ) : (
    // If the check fails, render the placeholder immediately.
    <PlaceholderModel scale={1.8} position={[0, -1, 0]} />
  );
}

// Responsive Camera
function ResponsiveCamera() {
    const { camera } = useThree();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useFrame(() => {
        const targetFov = isMobile ? 70 : 45;
        camera.fov = lerp(camera.fov, targetFov, 0.1);
        camera.updateProjectionMatrix();
    });

    return null;
}

const slideImages = [
  { url: "/m_bg_01.jpg", alt: "A formula car on the track" },
  { url: "/m_bg_02.jpg", alt: "Close up on a racing car wheel" },
  { url: "/y_bg_03.jpg", alt: "Engineers working on a car" },
  { url: "/y_bg_04.jpg", alt: "Racing car cockpit view" },
  { url: "/y_bg_05.jpg", alt: "Racing car cockpit view" },
  { url: "/y_bg_06.jpg", alt: "Racing car cockpit view" },
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
        <ModelManager />
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
                    <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
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
      <Canvas shadows camera={{ position: [0, 0, 8] }}>
        <ResponsiveCamera />
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