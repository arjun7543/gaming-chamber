'use client';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Youtube, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
      
      {/* 1. BACKGROUND GRID EFFECT */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12">
        
        {/* LEFT: BRANDING */}
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              Gaming <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Chamber</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              The elite battleground for competitive gamers. 
              Compete, earn, and ascend the ranks.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-mono text-green-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                SYSTEM OPERATIONAL
            </div>
        </div>

        {/* CENTER: LINKS */}
        <div className="flex gap-16 text-sm text-gray-400 font-bold uppercase tracking-wider">
            <div className="flex flex-col gap-4">
                <a href="#" className="hover:text-white transition-colors">Tournaments</a>
                <a href="#" className="hover:text-white transition-colors">Leaderboard</a>
                <a href="#" className="hover:text-white transition-colors">Winners</a>
            </div>
            <div className="flex flex-col gap-4">
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
        </div>

        {/* RIGHT: SOCIALS */}
        <div className="flex flex-col gap-6">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm">Connect</h3>
            <div className="flex gap-4">
                {[Twitter, Instagram, Youtube, MessageCircle].map((Icon, i) => (
                    <motion.a 
                        key={i}
                        href="#"
                        whileHover={{ y: -5, color: '#00ff88' }}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors"
                    >
                        <Icon className="w-5 h-5" />
                    </motion.a>
                ))}
            </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
        <p>© 2026 GAMING CHAMBER. ALL RIGHTS RESERVED.</p>
        <p className="flex items-center gap-1 mt-2 md:mt-0">
            ENGINEERED WITH <Heart className="w-3 h-3 text-red-500 fill-current" /> BY <span className="text-white">Arjun_Rathore</span>
        </p>
      </div>
    </footer>
  );
}