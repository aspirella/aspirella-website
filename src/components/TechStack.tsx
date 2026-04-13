import React from "react";
import { motion } from "motion/react";
import { Code2, Box, Cloud, Github, Cpu, Database } from "lucide-react";

interface TechLogo {
  name: string;
  url: string;
  brandColor: string;
}

const techLogos: TechLogo[] = [
  { name: "React", url: "https://cdn.simpleicons.org/react/61DAFB", brandColor: "#61DAFB" },
  { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/white", brandColor: "#ffffff" },
  { name: "Tailwind CSS", url: "https://cdn.simpleicons.org/tailwindcss/06B6D4", brandColor: "#06B6D4" },
  { name: "Framer Motion", url: "https://cdn.simpleicons.org/framer/0055FF", brandColor: "#0055FF" },
  { name: "Three.js", url: "https://cdn.simpleicons.org/threedotjs/white", brandColor: "#ffffff" },
  { name: "WebGL", url: "https://cdn.simpleicons.org/webgl/990000", brandColor: "#990000" },
  { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/339933", brandColor: "#339933" },
  { name: "AWS", url: "https://cdn.simpleicons.org/amazonaws/232F3E", brandColor: "#FF9900" },
  { name: "GitHub", url: "https://cdn.simpleicons.org/github/white", brandColor: "#ffffff" },
  { name: "SolidWorks", url: "https://cdn.simpleicons.org/solidworks/DA291C", brandColor: "#DA291C" },
  { name: "AutoCAD", url: "https://cdn.simpleicons.org/autodesk/white", brandColor: "#0696D7" },
  { name: "TypeScript", url: "https://cdn.simpleicons.org/typescript/3178C6", brandColor: "#3178C6" },
];

interface Category {
  title: string;
  icon: React.ReactNode;
  tools: string[];
  color: string;
}

const categories: Category[] = [
  {
    title: "Frontend Engineering",
    icon: <Code2 className="text-purple-400" />,
    tools: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    color: "rgba(147, 51, 234, 0.5)",
  },
  {
    title: "3D & CAD Visualization",
    icon: <Box className="text-purple-400" />,
    tools: ["Three.js", "WebGL", "AutoCAD", "SolidWorks", "Blender"],
    color: "rgba(99, 102, 241, 0.5)",
  },
  {
    title: "Backend & Cloud",
    icon: <Cloud className="text-orange-400" />,
    tools: ["Node.js", "AWS", "GitHub", "PostgreSQL", "Docker"],
    color: "rgba(249, 115, 22, 0.5)",
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-32 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-500 font-bold text-xs uppercase tracking-widest mb-4 block"
          >
            Our Arsenal
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white mb-6">
            The Tech Behind <span className="text-slate-500">Precision.</span>
          </h2>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative flex overflow-x-hidden border-y border-white/5 py-12 bg-white/[0.01]">
        <div className="flex animate-infinite-scroll whitespace-nowrap">
          {[...techLogos, ...techLogos].map((logo, index) => (
            <div
              key={index}
              className="mx-12 flex items-center justify-center group cursor-pointer"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="h-12 w-auto grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <span className="ml-4 text-slate-500 font-display font-bold tracking-widest uppercase text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 relative group overflow-hidden"
              style={{
                boxShadow: `0 0 20px -10px ${category.color}`,
              }}
            >
              {/* Animated background glow */}
              <div 
                className="absolute -inset-24 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl rounded-full -z-10"
                style={{ backgroundColor: category.color }}
              />

              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  {category.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool, toolIndex) => (
                  <span
                    key={toolIndex}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
