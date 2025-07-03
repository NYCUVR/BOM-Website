import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

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

export default PlaceholderModel; 