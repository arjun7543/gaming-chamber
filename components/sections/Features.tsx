'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Users, Trophy } from 'lucide-react';

const FEATURES = [
  { id: 1, title: "Sentinel Anti-Cheat", desc: "Kernel-level monitoring ensures zero tolerance.", icon: <Shield className="w-8 h-8 text-green-500" />, color: "border-green-500/50" },
  { id: 2, title: "Velocity Payouts", desc: "Winnings transferred via UPI within 60 seconds.", icon: <Zap className="w-8 h-8 text-yellow-400" />, color: "border-yellow-500/50" },
  { id: 3, title: "Neural Community", desc: "Join 10,000+ elite operatives in our network.", icon: <Users className="w-8 h-8 text-purple-500" />, color: "border-purple-500/50" },
  { id: 4, title: "Global Leaderboards", desc: "Rank up seasonally for invitation-only events.", icon: <Trophy className="w-8 h-8 text-red-500" />, color: "border-red-500/50" }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll Progress (Used ONLY for Desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // LAYOUT SWITCH: 
    // Mobile: 'h-auto' (Normal height based on content)
    // Desktop: 'md:h-[300vh]' (Tall height to create scroll space)
    <section ref={containerRef} className="relative z-20 w-full h-auto md:h-[300vh] pointer-events-none">
      
      {/* WRAPPER SWITCH:
          Mobile: 'relative' (Scrolls naturally)
          Desktop: 'md:sticky md:top-0' (Pins to screen)
      */}
      <div className="relative md:sticky md:top-0 w-full h-auto md:h-screen flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-4 md:px-12 pointer-events-auto py-20 md:py-0">
        
        {/* --- HEADING SIDE --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center mb-12 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="pl-6 border-l-4 border-white/20"
            >
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2 leading-none">
                  System <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Architec</span>
                </h2>
                <p className="text-gray-400 uppercase tracking-widest text-xs md:text-sm mt-4 font-mono">
                  // Protocol v2.0 Loaded
                </p>
            </motion.div>
        </div>

        {/* --- CARDS SIDE --- */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 relative md:min-h-[400px]">
           {FEATURES.map((f, i) => {
             // Desktop Animation Ranges
             const startRange = i * 0.25;
             const endRange = startRange + 0.25;
             
             return (
               <div key={f.id}>
                  {/* MOBILE CARD (Uses standard whileInView) */}
                  <div className="block md:hidden">
                    <MobileCard feature={f} index={i} />
                  </div>

                  {/* DESKTOP CARD (Uses Scroll Progress) */}
                  <div className="hidden md:block">
                    <DesktopCard feature={f} progress={scrollYProgress} range={[startRange, endRange]} />
                  </div>
               </div>
             );
           })}
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENT: MOBILE (Simple Fade In) ---
const MobileCard = ({ feature, index }: { feature: any, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`relative p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 ${feature.color} border-l-4 transition-all hover:bg-white/5 shadow-xl`}
  >
      <div className="flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              {feature.icon}
          </div>
          <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-xs font-medium tracking-wide">{feature.desc}</p>
          </div>
      </div>
  </motion.div>
);

// --- SUB-COMPONENT: DESKTOP (Scroll Linked) ---
const DesktopCard = ({ feature, progress, range }: { feature: any, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, [range[0], range[0] + 0.1], [0, 1]); 
  const y = useTransform(progress, [range[0], range[0] + 0.1], [50, 0]);
  
  return (
    <motion.div 
      style={{ opacity, y }}
      className={`relative p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 ${feature.color} border-l-4 transition-all hover:bg-white/5`}
    >
      <div className="flex items-center gap-6">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              {feature.icon}
          </div>
          <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-xs font-medium tracking-wide">{feature.desc}</p>
          </div>
      </div>
    </motion.div>
  );
};