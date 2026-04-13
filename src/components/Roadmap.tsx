import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Box, FileText, Wrench, RotateCcw } from "lucide-react";

interface RoadmapStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  side: "left" | "right";
}

const steps: RoadmapStep[] = [
  {
    title: "Concept & CAD Design",
    description: "Transforming ideas into precision 3D models with advanced engineering simulations.",
    icon: <Box size={24} />,
    side: "left",
  },
  {
    title: "Technical Documentation",
    description: "Authoring smart, interactive manuals and IETMs tailored for aerospace and automotive standards.",
    icon: <FileText size={24} />,
    side: "right",
  },
  {
    title: "Operational Support",
    description: "Real-time guidance for maintenance and repairs, ensuring maximum fleet uptime and safety.",
    icon: <Wrench size={24} />,
    side: "left",
  },
  {
    title: "End-of-Life & Recycling",
    description: "Sustainable management and data archiving for the final stages of the vehicle lifecycle.",
    icon: <RotateCcw size={24} />,
    side: "right",
  },
];

const RoadmapItem = ({ step, index, progress }: { step: RoadmapStep; index: number; progress: any; key?: React.Key }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Calculate if this specific item is "active" based on overall scroll progress
  // Each step takes roughly 0.25 of the total progress (0 to 1)
  const stepStart = index * 0.25;
  const stepEnd = (index + 1) * 0.25;
  
  const isActive = useTransform(progress, [stepStart, stepEnd], [0, 1]);
  const opacity = useTransform(progress, [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(progress, [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, scale }}
      className={`relative flex items-center justify-between mb-32 last:mb-0 w-full ${
        step.side === "left" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div className={`w-[45%] ${step.side === "left" ? "text-right pr-12" : "text-left pl-12"}`}>
        <motion.div
          initial={{ opacity: 0, x: step.side === "left" ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight">
            {step.title}
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      </div>

      {/* Node */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          className="w-14 h-14 rounded-full bg-slate-900 border-2 flex items-center justify-center relative"
          style={{
            borderColor: useTransform(progress, [stepStart, stepEnd], ["#1e293b", "#9333ea"]),
            boxShadow: useTransform(
              progress,
              [stepStart, stepEnd],
              ["0 0 0px rgba(147,51,234,0)", "0 0 20px rgba(147,51,234,0.5)"]
            ),
          }}
        >
          {/* Pulsing background for active state */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500/20"
            style={{
              scale: useTransform(progress, [stepStart, stepEnd], [0.8, 1.5]),
              opacity: useTransform(progress, [stepStart, stepEnd - 0.05, stepEnd], [0, 0.4, 0]),
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="z-10"
            style={{
              color: useTransform(progress, [stepStart, stepEnd], ["#475569", "#a855f7"]),
              filter: useTransform(
                progress,
                [stepStart, stepEnd],
                ["brightness(1)", "brightness(1.5) drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))"]
              ),
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {step.icon}
          </motion.div>
          
          {/* Active indicator ring */}
          <motion.div 
            className="absolute -inset-1 rounded-full border-2 border-purple-400/50"
            style={{ 
              opacity: isActive,
              scale: useTransform(progress, [stepStart, stepEnd], [0.9, 1.1])
            }}
          />
        </motion.div>
      </div>

      {/* Spacer for the other side */}
      <div className="w-[45%]" />
    </motion.div>
  );
};

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} id="roadmap" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-slate-800/50 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-500 font-bold text-xs uppercase tracking-widest mb-4 block"
          >
            The Journey
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white">
            Vehicle Lifecycle <span className="text-slate-500">Roadmap.</span>
          </h2>
        </div>

        <div className="relative">
          {/* SVG Progress Line */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-4 pointer-events-none z-10"
            viewBox="0 0 4 1000"
            preserveAspectRatio="none"
          >
            {/* Background track */}
            <path
              d="M 2 0 L 2 1000"
              fill="none"
              strokeWidth="2"
              stroke="#1e293b"
              className="opacity-50"
            />
            {/* Main progress line */}
            <motion.path
              d="M 2 0 L 2 1000"
              fill="none"
              strokeWidth="2"
              stroke="#9333ea"
              style={{
                pathLength,
                filter: "drop-shadow(0 0 5px rgba(147,51,234,0.5))",
              }}
            />
            {/* Glowing active segment */}
            <motion.path
              d="M 2 0 L 2 1000"
              fill="none"
              strokeWidth="4"
              stroke="#a855f7"
              className="opacity-30"
              style={{
                pathLength,
                filter: "blur(4px) drop-shadow(0 0 12px rgba(168, 85, 247, 1))",
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Roadmap Steps */}
          <div className="relative">
            {steps.map((step, index) => (
              <RoadmapItem key={index} step={step} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
