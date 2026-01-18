'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link'; // Added Import

// --- MOCK DATA ---
const TOURNAMENTS = [
  { id: "bgmi-yuddh-s1", title: "YUDDH: S1", game: "BGMI", date: "Feb 15", pool: "₹50,000", fee: "₹100", status: "live", type: "SQUAD" },
  { id: "sniper-fury", title: "Sniper's Fury", game: "BGMI", date: "Feb 20", pool: "₹10,000", fee: "₹50", status: "open", type: "SOLO" },
  { id: "valo-weekends", title: "Valo Weekends", game: "Valorant", date: "Mar 01", pool: "₹25,000", fee: "FREE", status: "closed", type: "5v5" },
  { id: "midnight-brawl", title: "Midnight Brawl", game: "CS2", date: "Mar 05", pool: "₹5,000", fee: "₹20", status: "open", type: "1v1" },
  { id: "apex-arena", title: "Apex Legends: Arena", game: "Apex", date: "Mar 10", pool: "₹15,000", fee: "₹80", status: "open", type: "TRIO" },
  { id: "codm-mayhem", title: "Mobile Mayhem", game: "CODM", date: "Mar 12", pool: "₹8,000", fee: "FREE", status: "open", type: "SQUAD" },
  { id: "tekken-iron", title: "Tekken Iron Fist", game: "Tekken 8", date: "Mar 20", pool: "₹20,000", fee: "₹200", status: "open", type: "1v1" },
  { id: "ow-showdown", title: "Cyberpunk Showdown", game: "Overwatch", date: "Mar 25", pool: "₹12,000", fee: "₹150", status: "open", type: "6v6" },
];

export default function TournamentGrid() {
  const [showModal, setShowModal] = useState(false);
  
  // --- SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

  const displayedTournaments = TOURNAMENTS.slice(0, 3);

  return (
    <section id="tournaments" className="relative z-20 w-full py-32 px-4 md:px-12 pointer-events-none">
      
      {/* Hide Scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto pointer-events-auto ml-auto md:w-2/3 lg:w-1/2"> 
        <motion.h2 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl font-black uppercase tracking-tighter mb-12 text-right border-r-4 border-green-500 pr-4 text-white"
        >
          Active <span className="text-green-500">Deployments</span>
        </motion.h2>

        <div className="flex flex-col gap-4">
          {displayedTournaments.map((t, i) => (
            <TournamentCard key={t.id} t={t} index={i} />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
            <button 
                onClick={() => setShowModal(true)}
                className="group flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/20 rounded-full hover:bg-green-500/20 hover:border-green-500 hover:text-green-400 text-white transition-all duration-300"
            >
                <span className="text-xs font-bold uppercase tracking-widest">Explore All Operations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto"
          >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl h-[80vh] flex flex-col"
            >
                {/* 1. FLOATING CLOSE BUTTON */}
                <button 
                    onClick={() => setShowModal(false)}
                    className="absolute -top-14 right-0 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-red-500/80 hover:border-red-500 transition-all duration-300 shadow-lg z-50 group"
                >
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* 2. GLASS BOX CONTAINER */}
                <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl flex flex-col">
                    
                    {/* Glass Layers */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/90 backdrop-blur-3xl backdrop-saturate-150 z-0" />
                    <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] pointer-events-none z-10" />

                    {/* CONTENT WRAPPER */}
                    <div className="relative z-20 flex flex-col h-full">
                        
                        {/* Static Header (No Scroll) */}
                        <div className="p-8 border-b border-white/10 shrink-0 bg-black/20">
                            <h3 className="text-3xl font-black uppercase tracking-tighter text-white drop-shadow-md">
                                Operation <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Timeline</span>
                            </h3>
                            <p className="text-gray-300 text-sm tracking-widest uppercase mt-1 font-medium">Classified Mission Log</p>
                        </div>

                        {/* SCROLLABLE LIST AREA */}
                        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide p-8 overscroll-contain">
                            <div className="relative border-l-2 border-white/10 ml-3 space-y-8 pl-8 md:pl-12 py-2">
                                {TOURNAMENTS.map((t, i) => (
                                    <div key={t.id} className="relative">
                                        <div className={`absolute -left-[43px] md:-left-[59px] top-10 w-4 h-4 rounded-full border-2 border-white/20 ${t.status === 'live' ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-green-500 shadow-[0_0_10px_#00ff88]'}`} />
                                        <TournamentCard t={t} index={i} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const TournamentCard = ({ t, index }: { t: any, index: number }) => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative w-full bg-black/40 backdrop-blur-md border border-white/5 hover:border-green-500/50 transition-all duration-300 overflow-hidden rounded-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.05)] shrink-0"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

      <div className="flex items-stretch h-24">
        <div className={`w-1 transition-all duration-300 ${t.status === 'live' ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-green-500/50 group-hover:bg-green-400'}`} />
        
        <div className="flex-1 flex items-center justify-between px-4 md:px-6">
            <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                     <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 border border-gray-700 px-1.5 rounded">{t.game}</span>
                     {t.status === 'live' && <span className="text-[10px] font-bold text-red-500 animate-pulse">● LIVE</span>}
                </div>
                <h3 className="text-xl md:text-2xl font-black italic uppercase text-white group-hover:text-green-400 transition-colors tracking-tight truncate">{t.title}</h3>
            </div>

            <div className="hidden sm:flex gap-4 md:gap-8 text-right shrink-0">
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Prize Pool</p>
                    <p className="font-mono text-yellow-400 font-bold">{t.pool}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Entry</p>
                    <p className="font-mono text-white font-bold">{t.fee}</p>
                </div>
            </div>
        </div>

        {/* UPDATED: Register Button is now a Link */}
        <Link 
            href={`/tournament/${t.id}`}
            className="w-16 md:w-24 bg-white/5 flex items-center justify-center border-l border-white/5 group-hover:bg-green-500 group-hover:text-black transition-colors cursor-pointer text-white"
        >
            <span className="text-[10px] md:text-xs font-black uppercase -rotate-90 whitespace-nowrap tracking-widest">Register</span>
        </Link>
      </div>
    </motion.div>
);