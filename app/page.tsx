'use client';
import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, Html } from '@react-three/drei';
import Link from 'next/link';
import { Play } from 'lucide-react';
import TournamentGrid from '@/components/sections/TournamentGrid';
import Features from '@/components/sections/Features';

// --- 3D MODEL COMPONENT ---
function HelmetModel() {
  const { scene } = useGLTF('https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.gltf');
  const helmetRef = useRef<any>(null);

  useFrame((state) => {
    if (helmetRef.current) {
      helmetRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      helmetRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Reduced scale slightly so it doesn't block the text */}
      <primitive object={scene} ref={helmetRef} scale={1.6} />
    </Float>
  );
}

// --- LOADING SPINNER ---
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-green-500 text-xs font-mono tracking-widest uppercase">Loading System...</span>
      </div>
    </Html>
  );
}

// --- GLITCH TEXT COMPONENT ---
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
        x: { repeat: Infinity, duration: 0.2, repeatType: "mirror" as const, ease: "linear" },
        skewX: { repeat: Infinity, duration: 0.2, repeatType: "mirror" as const, ease: "linear" },
        textShadow: { repeat: Infinity, duration: 0.2, repeatType: "mirror" as const }
      }
    },
    hover: { scale: 1.05, color: "#00ff88", textShadow: "0 0 10px #00ff88" }
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
  // Modified opacity: Stays visible longer so text doesn't disappear instantly
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-black min-h-screen text-white selection:bg-green-500/30 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* BACKGROUND GRID */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* 3D SCENE */}
        <div className="absolute inset-0 z-10">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
             <ambientLight intensity={0.5} />
             <directionalLight position={[10, 10, 5]} intensity={1} color="#00ff88" />
             <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
             
             <Suspense fallback={<Loader />}>
                {/* CHANGED: 'studio' preset fixes the math warnings in console */}
                <Environment preset="studio" />
                <HelmetModel />
             </Suspense>
          </Canvas>
        </div>

        {/* HERO CONTENT - Increased Z-Index to 50 to ensure visibility */}
        <motion.div 
          style={{ y, opacity }}
          className="relative z-50 text-center space-y-6 max-w-4xl px-4 mt-32 pointer-events-none"
        >
            <div className="flex items-center justify-center gap-2 mb-4">
               <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono rounded-full uppercase tracking-widest animate-pulse">
                  System Online
               </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mix-blend-difference drop-shadow-2xl">
              Enter The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
                <GlitchText text="Chamber" />
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide drop-shadow-md bg-black/40 backdrop-blur-sm p-2 rounded-lg">
              The next-generation eSports ecosystem. Compete in high-stakes tournaments, 
              track your stats, and get paid instantly.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 pointer-events-auto">
               <button onClick={() => document.getElementById('tournaments')?.scrollIntoView({ behavior: 'smooth' })} className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Mission <Play className="w-4 h-4 fill-current" />
                  </span>
                  <div className="absolute inset-0 bg-green-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
               </button>
               
               <Link href="/dashboard" className="px-8 py-4 bg-black/50 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                  Operator Login
               </Link>
            </div>
        </motion.div>
      </section>

      {/* --- SECTIONS --- */}
      <TournamentGrid />
      <Features />
      
      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-600 text-xs uppercase tracking-widest bg-black relative z-20">
        <p>Gaming Chamber © 2026 // System Architecture v1.0</p>
      </footer>

    </main>
  );
}
