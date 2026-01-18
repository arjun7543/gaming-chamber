'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';
import Link from 'next/link';
import { ArrowRight, Play, Crosshair, Shield, Zap } from 'lucide-react';
import TournamentGrid from '@/components/sections/TournamentGrid';
import Features from '@/components/sections/Features';

// --- 3D MODEL COMPONENT ---
function HelmetModel() {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/DamagedHelmet.gltf');
  const helmetRef = useRef<any>(null);

  useFrame((state) => {
    if (helmetRef.current) {
      helmetRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      helmetRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} ref={helmetRef} scale={1.8} />
    </Float>
  );
}

// --- GLITCH TEXT COMPONENT (FIXED TYPES) ---
// Inside app/page.tsx

// ... imports

const GlitchText = ({ text }: { text: string }) => {
  const glitchVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      x: [0, -2, 2, -1, 1, 0],
      skewX: [0, 10, -10, 5, -5, 0],
      textShadow: [
        "0px 0px 0px rgba(0,255,136,0)",
        "-2px 0px 0px rgba(0,255,136,0.5)",
        "2px 0px 0px rgba(255,0,255,0.5)",
        "0px 0px 0px rgba(0,255,136,0)"
      ],
      transition: {
        x: {
          repeat: Infinity,
          duration: 0.2,
          repeatType: "mirror" as const, // <--- THIS IS THE FIX
          ease: "linear",
        },
        skewX: {
          repeat: Infinity,
          duration: 0.2,
          repeatType: "mirror" as const, // <--- THIS IS THE FIX
          ease: "linear",
        },
        textShadow: {
          repeat: Infinity,
          duration: 0.2,
          repeatType: "mirror" as const, // <--- THIS IS THE FIX
        }
      }
    },
    hover: {
      scale: 1.05,
      color: "#00ff88",
      textShadow: "0 0 10px #00ff88"
    }
  };

  return (
    <motion.span
      variants={glitchVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="inline-block cursor-default"
    >
      {text}
    </motion.span>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="bg-black min-h-screen text-white selection:bg-green-500/30 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* BACKGROUND GRID */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* 3D SCENE */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
             <ambientLight intensity={0.5} />
             <directionalLight position={[10, 10, 5]} intensity={1} color="#00ff88" />
             <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
             <Environment preset="city" />
             <HelmetModel />
          </Canvas>
        </div>

        {/* HERO CONTENT */}
        <motion.div 
          style={{ y, opacity }}
          className="relative z-20 text-center space-y-6 max-w-4xl px-4 mt-32"
        >
            <div className="flex items-center justify-center gap-2 mb-4">
               <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono rounded-full uppercase tracking-widest animate-pulse">
                  System Online
               </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mix-blend-difference">
              Enter The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
                <GlitchText text="Chamber" />
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
              The next-generation eSports ecosystem. Compete in high-stakes tournaments, 
              track your stats, and get paid instantly.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
               <button onClick={() => document.getElementById('tournaments')?.scrollIntoView({ behavior: 'smooth' })} className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-green-400 transition-colors">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Mission <Play className="w-4 h-4 fill-current" />
                  </span>
                  <div className="absolute inset-0 bg-green-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
               </button>
               
               <Link href="/dashboard" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                  Operator Login
               </Link>
            </div>
        </motion.div>
      </section>

      {/* --- SECTIONS --- */}
      <TournamentGrid />
      <Features />
      
      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-600 text-xs uppercase tracking-widest">
        <p>Gaming Chamber © 2026 // System Architecture v1.0</p>
      </footer>

    </main>
  );
}
