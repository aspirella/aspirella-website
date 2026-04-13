import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { FileText, Truck, Box, Cpu, GraduationCap, ArrowRight } from "lucide-react";
import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  index: number;
}

const ServiceCard = ({ title, description, icon, className = "", index }: ServiceCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group h-full ${className}`}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 transition-colors duration-500 group-hover:border-purple-500/50 overflow-hidden">
        {/* Border Beam / Inner Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-[-2px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-border-beam" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(147,51,234,0.1),transparent_80%)]" />
        </div>

        <div className="relative h-full p-8 flex flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
          <div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          <div className="mt-6">
            <button className="flex items-center gap-2 text-sm font-bold text-purple-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              Learn More <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="services" className="py-32 bg-bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-500 font-bold text-xs uppercase tracking-widest mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight text-white"
          >
            Specialized Solutions for <br />
            <span className="text-slate-500">High-Stakes Industries.</span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]"
        >
          {/* Technical Documentation (Wide 2x1) */}
          <ServiceCard
            index={0}
            title="Technical Documentation"
            description="Precision-driven manuals and compliance data for aerospace systems and automotive platforms."
            icon={<FileText size={24} />}
            className="md:col-span-2"
          />

          {/* CAD Drafting (Standard 1x1) */}
          <ServiceCard
            index={1}
            title="CAD Drafting"
            description="High-fidelity 2D/3D modeling and structural engineering support for mechanical assemblies."
            icon={<Box size={24} />}
            className="md:col-span-1"
          />

          {/* Vehicle Lifecycle Management (Tall 1x2) */}
          <ServiceCard
            index={2}
            title="Vehicle Lifecycle Management"
            description="End-to-end data integrity and fleet analytics for automotive platforms from concept to retirement."
            icon={<Truck size={24} />}
            className="md:col-span-1 md:row-span-2"
          />

          {/* IT Solutions (Standard 1x1) */}
          <ServiceCard
            index={3}
            title="IT Solutions"
            description="Custom software and infrastructure for engineering data management and secure cloud distribution."
            icon={<Cpu size={24} />}
            className="md:col-span-1"
          />

          {/* Training & Support (Wide 2x1) */}
          <ServiceCard
            index={4}
            title="Training & Support"
            description="Specialized technical training programs and continuous engineering support for global teams."
            icon={<GraduationCap size={24} />}
            className="md:col-span-2"
          />
        </motion.div>
      </div>
    </section>
  );
}
