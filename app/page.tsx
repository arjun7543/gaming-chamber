'use client';

import { useState } from 'react'; // Added useState
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// --- IMPORTS ---
import HeroScene from '@/components/3d/HeroScene';
import TournamentGrid from '@/components/sections/TournamentGrid';
import Features from '@/components/sections/Features';
import JoinNetwork from '@/components/sections/JoinNetwork';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal'; // Make sure this file exists!

// --- ANIMATION CONFIG ---
const glitchVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    x: [0, -1, 1, -0.5, 0.5, 0],
    skewX: [0, 2, -2, 1, 0],
    textShadow: ["0px 0px 0px rgba(0,0,0,0)", "-2px 0px 0px rgba(255,0,0,0.5), 2px 0px 0px rgba(0,255,255,0.5)", "0px 0px 0px rgba(0,0,0,0)"],
    transition: {
      x: { repeat: Infinity, duration: 0.2, repeatType: "mirror", ease: "linear" },
      skewX: { repeat: Infinity, duration: 0.25, repeatType: "mirror", ease: "linear" },
      textShadow: { repeat: Infinity, duration: 0.3, repeatType: "mirror" }
    }
  },
  hover: { scale: 1.1, color: '#00ff88', textShadow: "0px 0px 15px rgba(0,255,136,1)", transition: { duration: 0.1 } }
};

const InteractiveLetter = ({ letter, index }: { letter: string, index: number }) => {
  const randomDuration = 0.2 + Math.random() * 0.1;
  return (
    <motion.span
      variants={glitchVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="hover"
      transition={{
        x: { repeat: Infinity, duration: randomDuration, repeatType: "mirror" },
        skewX: { repeat: Infinity, duration: randomDuration + 0.05, repeatType: "mirror" },
        opacity: { duration: 0.5, delay: index * 0.05 }
      }}
      className="inline-block cursor-pointer relative"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
};

const WordWrapper = ({ text, className }: { text: string, className?: string }) => (
  <div className={`flex justify-center flex-wrap ${className} pointer-events-auto`}>
    {text.split("").map((char, i) => (
      <InteractiveLetter key={`${char}-${i}`} index={i} letter={char} />
    ))}
  </div>
);

export default function Home() {
  // --- STATE FOR AUTH MODAL ---
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const scrollToTournaments = () => {
    document.getElementById('tournaments')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative w-full min-h-screen bg-black overflow-x-hidden"> 
      
      {/* 1. BACKGROUND LAYER (Fixed Position) */}
      <div className="fixed inset-0 z-0">
        <HeroScene />
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* FLOATING LOGIN BUTTON (Top Right) */}
        <div className="fixed top-6 right-6 z-50 pointer-events-auto">
            <button 
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 md:px-6 md:py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-white hover:bg-green-500/20 hover:border-green-500 hover:text-green-400 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
                System Login
            </button>
        </div>

        {/* HERO SECTION */}
        <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-0">
             <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center justify-center mb-6 w-full max-w-[95vw]">
              <WordWrapper text="GAMING" className="text-5xl md:text-8xl font-black tracking-tighter text-gray-200" />
              <WordWrapper text="CHAMBER" className="text-5xl md:text-8xl font-black tracking-tighter text-[#a855f7]" />
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, textShadow: ["0 0 5px #00ff88", "0 0 20px #00ff88", "0 0 5px #00ff88"] }}
              transition={{ opacity: { duration: 1 }, textShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
              className="mt-4 text-sm md:text-2xl text-white font-light tracking-[0.2em] pointer-events-auto max-w-[90%] md:max-w-none leading-relaxed text-center"
            >
              Enter the Chamber. Compete. Conquer.
            </motion.p>
            
            <button onClick={scrollToTournaments} className="pointer-events-auto group mt-12 flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-green-500/20 hover:border-green-500 transition-all duration-300">
              <span className="font-bold tracking-wider text-xs md:text-base group-hover:text-green-400 transition-colors">EXPLORE TOURNAMENTS</span>
              <ArrowRight className="w-4 h-4 md:w-5 group-hover:translate-x-1 group-hover:text-green-400 transition-all" />
            </button>
            
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 text-white/50"
            >
                <ChevronDown className="w-6 h-6 md:w-8" />
            </motion.div>
        </section>

        <TournamentGrid />
        <Features />
        <JoinNetwork />
        <Footer />
        
        {/* --- AUTH MODAL (Controlled by State) --- */}
        <div className="pointer-events-auto">
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </div>

      </div>
    </main>
  );
}