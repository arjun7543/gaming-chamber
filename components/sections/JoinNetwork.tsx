'use client';
import { motion } from 'framer-motion';
import { Disc, Zap, ArrowUpRight } from 'lucide-react';

export default function JoinNetwork() {
  return (
    <section className="relative z-20 w-full h-screen flex flex-col items-center justify-end pb-32 pointer-events-none">
      
      <div className="pointer-events-auto text-center z-10">
        
        {/* GLITCH HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">
              Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Link</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg tracking-[0.5em] uppercase">
              // Access the private network
            </p>
        </motion.div>

        {/* MASSIVE BUTTONS */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            
            {/* 1. DISCORD BUTTON */}
            <motion.a 
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-64 h-20 bg-[#5865F2] hover:bg-[#4752C4] flex items-center justify-center gap-4 clip-path-slant transition-all"
            >
                <Disc className="w-8 h-8 text-white animate-spin-slow" />
                <span className="text-xl font-black uppercase tracking-wider text-white">Discord</span>
                <div className="absolute inset-0 border-2 border-white/20 group-hover:border-white/50 clip-path-slant" />
            </motion.a>

            {/* 2. REGISTER BUTTON */}
            <motion.a 
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-64 h-20 bg-green-500 hover:bg-green-400 flex items-center justify-center gap-4 clip-path-slant transition-all shadow-[0_0_30px_rgba(0,255,136,0.3)]"
            >
                <Zap className="w-8 h-8 text-black fill-current" />
                <span className="text-xl font-black uppercase tracking-wider text-black">Register</span>
                <ArrowUpRight className="w-6 h-6 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>

        </div>

        {/* FOOTER TEXT */}
        <div className="mt-16 text-gray-600 text-xs font-mono uppercase tracking-widest">
            System Status: <span className="text-green-500">Online</span> • Ping: <span className="text-green-500">12ms</span>
        </div>

      </div>
    </section>
  );
}