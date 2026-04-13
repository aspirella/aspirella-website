import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, FileText, Box, Activity, ChevronRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Magnetic from "./Magnetic";

const services = [
  {
    id: "tech-doc",
    title: "Technical Documentation",
    description: "Precision-engineered manuals and documentation for complex aerospace and automotive systems.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-purple-400 to-violet-500",
    accent: "text-purple-400",
  },
  {
    id: "cad-drafting",
    title: "CAD Drafting",
    description: "High-fidelity 2D and 3D drafting solutions that bridge the gap between concept and manufacturing.",
    icon: <Box className="w-6 h-6" />,
    color: "from-fuchsia-400 to-purple-500",
    accent: "text-emerald-400",
  },
  {
    id: "vlm",
    title: "Vehicle Lifecycle Management",
    description: "Comprehensive management strategies ensuring optimal performance from prototype to end-of-life.",
    icon: <Activity className="w-6 h-6" />,
    color: "from-purple-400 to-pink-500",
    accent: "text-purple-400",
  },
];

export default function Hero() {
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col pt-24 overflow-hidden bg-bg-dark">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[140px] rounded-full animate-mesh" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[140px] rounded-full animate-mesh [animation-delay:4s]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: Math.random() * 1000 }}
              animate={{ 
                y: [null, -1000],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="lg:col-span-7 text-left">
            <motion.div variants={fadeUpVariants} className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/10 group cursor-default">
              <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-secondary group-hover:text-white transition-colors">
                Engineering Excellence 2026
              </span>
            </motion.div>

            <div className="mb-8 relative">
              <motion.h1 
                variants={fadeUpVariants}
                className="text-5xl md:text-7xl xl:text-8xl font-display font-bold leading-[1.1] tracking-tight text-white mb-4"
              >
                Elevating <br />
                <span className="text-gradient">Automotive Standards</span>
              </motion.h1>
              
              <motion.div 
                variants={fadeUpVariants}
                className="h-24 md:h-32 flex flex-col justify-center overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentService}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-3xl md:text-5xl font-display font-medium bg-clip-text text-transparent bg-gradient-to-r ${services[currentService].color}`}
                  >
                    {services[currentService].title}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.p 
              variants={fadeUpVariants}
              className="text-lg md:text-xl text-brand-secondary font-light leading-relaxed mb-10 max-w-2xl"
            >
              Aspirella bridges the gap between complex engineering and seamless documentation. 
              We provide high-end technical solutions for the world's most demanding automotive and aerospace leaders.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-5">
              <Magnetic>
                <button className="px-8 py-4 bg-white text-bg-dark font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-3 group">
                  Start Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Magnetic>
              <Magnetic>
                <button className="px-8 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all flex items-center gap-2">
                  Our Capabilities <ChevronRight size={18} />
                </button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Visual Element */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              variants={fadeUpVariants}
              className="relative aspect-square max-w-[500px] mx-auto"
            >
              {/* Decorative Rings */}
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-12 border border-brand-accent/20 rounded-full animate-[pulse_4s_ease-in-out_infinite]" />

              {/* Central Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentService}
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.2, opacity: 0, rotate: 10 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="relative z-10 w-48 h-48 md:w-64 md:h-64 glass-card flex flex-col items-center justify-center p-8 text-center group"
                  >
                    <div className={`mb-6 p-4 rounded-2xl bg-white/5 ${services[currentService].accent} transition-colors duration-500`}>
                      {services[currentService].icon}
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-2">
                      {services[currentService].title}
                    </h3>
                    <p className="text-xs text-brand-secondary leading-tight">
                      {services[currentService].description}
                    </p>
                    
                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20" />
                    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20" />
                    <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Micro-labels */}
              <div className="absolute top-0 right-0 p-4">
                <div className="text-[8px] font-mono uppercase tracking-widest text-white/30 vertical-rl rotate-180">
                  Precision Engineering // v2.0.26
                </div>
              </div>
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-[8px] font-mono uppercase tracking-widest text-white/30">
                  System Status: Optimal
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Bottom Rail */}
      <div className="absolute bottom-0 left-0 right-0 h-24 border-t border-white/5 flex items-center overflow-hidden bg-white/[0.01]">
        <div className="flex whitespace-nowrap animate-infinite-scroll">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {services.map((s) => (
                <div key={s.id} className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-white/20">0{services.indexOf(s) + 1}</span>
                  <span className="text-xs font-display font-bold tracking-widest text-white/40 uppercase">{s.title}</span>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
