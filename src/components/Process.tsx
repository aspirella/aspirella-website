import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    title: "Design & Analysis",
    description: "Initial engineering review and data extraction from CAD models and technical specifications.",
    details: ["CAD Data Extraction", "System Analysis", "Compliance Review"]
  },
  {
    title: "Digital Authoring",
    description: "Transformation of complex data into interactive, user-friendly digital documentation and manuals.",
    details: ["Interactive Manuals", "3D Illustrations", "XML/S1000D Standard"]
  },
  {
    title: "Lifecycle Support",
    description: "Continuous management and updates of technical data throughout the vehicle's operational life.",
    details: ["Data Integrity", "Fleet Updates", "Maintenance Tracking"]
  },
  {
    title: "Global Delivery",
    description: "Secure distribution of technical assets to global stakeholders and maintenance crews.",
    details: ["Cloud Distribution", "Multi-platform Access", "Real-time Sync"]
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="py-32 bg-bg-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-500 font-bold text-xs uppercase tracking-widest mb-4 block"
          >
            Our Methodology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter"
          >
            Engineering <span className="text-white/30">Roadmap.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line Background */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5" />
          
          {/* Animated Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500 via-violet-500 to-purple-500 origin-top z-10"
          />

          <div className="space-y-40">
            {steps.map((step, i) => (
              <StepItem 
                key={step.title} 
                step={step} 
                index={i} 
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index, progress }: { step: typeof steps[0], index: number, progress: any, key?: string }) {
  const isEven = index % 2 === 0;
  
  // Calculate when this specific point should "light up"
  const threshold = index / (steps.length - 1);
  const isActive = useTransform(progress, (p: number) => p >= threshold);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Central Point */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
        <motion.div
          style={{
            backgroundColor: useTransform(progress, [threshold - 0.1, threshold], ["#1e293b", "#9333ea"]),
            boxShadow: useTransform(progress, [threshold - 0.1, threshold], ["0px 0px 0px rgba(147,51,234,0)", "0px 0px 20px rgba(147,51,234,0.5)"]),
          }}
          className="w-4 h-4 rounded-full border-4 border-bg-dark"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute top-1/2 left-6 -translate-y-1/2 whitespace-nowrap hidden md:block"
        >
          <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            COORD_0{index + 1} // {Math.floor(Math.random() * 1000)}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${isEven ? "md:text-right" : "md:col-start-2"}`}
      >
        <div className={`glass-card p-8 inline-block max-w-md ${isEven ? "md:mr-12" : "md:ml-12"}`}>
          <span className="text-purple-400 font-mono text-xs mb-2 block">PHASE_0{index + 1}</span>
          <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {step.description}
          </p>
          <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
            {step.details.map((detail) => (
              <span key={detail} className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider text-white/50 border border-white/5">
                {detail}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
