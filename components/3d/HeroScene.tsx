'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Stars, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/DamagedHelmet.gltf';

function SmartModel({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(MODEL_PATH);
  const { viewport } = useThree();
  
  // Use a safer mobile check
  const isMobile = viewport.width < 5; 

  useFrame((state) => {
    if (!meshRef.current) return;

    const vh = window.innerHeight;
    
    // Default Targets
    let targetX = 0;
    let targetY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    
    // Adjusted scale for better mobile fit
    let targetScale = isMobile ? 1.4 : 2; 

    // --- STAGE 1: HERO (0 -> 100vh) ---
    if (scrollY <= vh) {
       const p = scrollY / vh; 
       // Desktop: Move Left. Mobile: Stay Center
       targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : -3.5, p); 
       targetRotationY = THREE.MathUtils.lerp(0, 0.5, p); 
       
       // FIX: On mobile, keep Y close to 0 so it stays in the middle of the screen
       targetY = isMobile ? 0 : 0; 
    } 
    // --- STAGE 2: TOURNAMENTS (100vh -> 200vh) ---
    else if (scrollY <= vh * 2) {
       targetX = isMobile ? 0 : -3.5; 
       targetRotationY = 0.5; 
       targetY = 0; // Keep steady
    }
    // --- STAGE 3: FEATURES (200vh -> 450vh) ---
    else if (scrollY <= vh * 4.5) {
       const start = vh * 2;
       const end = vh * 4.5;
       const p = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

       targetX = isMobile ? 0 : -3.5; 
       targetRotationY = THREE.MathUtils.lerp(0.5, 0.5 + (Math.PI / 2), p); 
       targetRotationX = Math.sin(p * Math.PI) * 0.1; 
       targetY = 0; // Keep steady
    }
    // --- STAGE 4: JOIN NETWORK (450vh -> Bottom) ---
    else {
        const start = vh * 4.5;
        const end = vh * 5.5;
        const p = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

        targetX = THREE.MathUtils.lerp(isMobile ? 0 : -3.5, 0, p);
        
        // Only float up at the very end to make room for buttons
        targetY = THREE.MathUtils.lerp(0, 1.2, p);
        
        const currentRot = 0.5 + (Math.PI / 2);
        targetRotationY = THREE.MathUtils.lerp(currentRot, Math.PI * 2, p);
        targetRotationX = THREE.MathUtils.lerp(0, 0, p);
    }

    // Gentle Mouse Parallax
    const mouseIntensity = isMobile ? 0.02 : 0.1; // Reduced for stability
    const mouseX = state.mouse.x * mouseIntensity;
    const mouseY = state.mouse.y * mouseIntensity;

    // Apply Smooth Physics
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1); 
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY + mouseX, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX + mouseY, 0.1);
  });

  return (
    // Lowered initial Y slightly (-0.5) to center visually
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.2} floatingRange={[-0.05, 0.05]}>
        <primitive object={scene} ref={meshRef} position={[0, -0.5, 0]} />
    </Float>
  );
}

useGLTF.preload(MODEL_PATH);

export default function HeroScene() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Absolute position ensures it stays locked to the parent container
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={50} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={30} color="#6d28d9" />
        
        <SmartModel scrollY={scrollY} />

        <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
    </div>
  );
}