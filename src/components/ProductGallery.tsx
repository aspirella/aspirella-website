import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, Layers, Settings, X, CheckCircle2 } from "lucide-react";

interface Project {
  title: string;
  category: string;
  tag: string;
  description: string;
  fullDescription: string;
  features: string[];
  link: string;
  icon: React.ReactNode;
  imageSeed: string;
}

const projects: Project[] = [
  {
    title: "Chair Installation Guide",
    category: "Consumer Product IETM",
    tag: "Interactive 3D",
    description: "A fully interactive 3D assembly manual designed for consumer-facing products, reducing assembly errors and improving user satisfaction.",
    fullDescription: "Our Chair Installation Guide redefines the assembly experience by replacing static paper manuals with a dynamic, interactive 3D environment. Users can rotate, zoom, and explode components to understand the exact assembly sequence. This project specifically targeted reducing common assembly errors by 40% and decreasing support tickets related to 'missing parts' or 'unclear instructions'.",
    features: [
      "Real-time 3D component manipulation",
      "Step-by-step animated assembly sequences",
      "Interactive parts list with highlighting",
      "Mobile-responsive WebGL interface",
      "Multi-language support integration"
    ],
    link: "https://aspirella.github.io/-chair-installation-manual/",
    icon: <Layers size={20} />,
    imageSeed: "furniture",
  },
  {
    title: "Uponor Vario S Manifold Manual",
    category: "Industrial Engineering Manual",
    tag: "Technical Precision",
    description: "High-precision technical documentation for industrial manifold systems, featuring detailed schematics and maintenance workflows.",
    fullDescription: "The Uponor Vario S Manifold project involved digitizing complex industrial engineering documentation into a searchable, interactive format. We focused on technical precision and ease of access for field technicians. The manual includes interactive schematics where clicking a component reveals its specifications, maintenance history, and replacement part numbers, significantly speeding up on-site troubleshooting.",
    features: [
      "Interactive SVG-based technical schematics",
      "Deep-linkable maintenance procedures",
      "Integrated spare parts catalog",
      "Offline-first PWA capabilities",
      "High-resolution technical illustrations"
    ],
    link: "https://aspirella.github.io/Uponor_Vario_S_manifold_FM/",
    icon: <Settings size={20} />,
    imageSeed: "engineering",
  },
];

const ProjectCard = ({ 
  project, 
  index, 
  onClick 
}: { 
  project: Project; 
  index: number; 
  onClick: () => void;
  key?: React.Key;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      {/* Device Mockup Container */}
      <div className="relative mb-8 perspective-1000">
        <motion.div
          whileHover={{ y: -12, rotateX: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl transition-shadow duration-500 group-hover:shadow-purple-500/10"
        >
          {/* Tablet/Laptop Frame Header */}
          <div className="h-8 bg-slate-800/50 border-b border-white/5 flex items-center px-4 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>

          {/* Mockup Content (Placeholder Image) */}
          <div className="aspect-video relative overflow-hidden bg-slate-950">
            <img
              src={`https://picsum.photos/seed/${project.imageSeed}/1200/800`}
              alt={project.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

            {/* Live Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                Live Preview Available
              </span>
            </div>
          </div>
        </motion.div>

        {/* Background Glow */}
        <div className="absolute -inset-4 bg-purple-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>

      {/* Project Info Card */}
      <div className="glass-card p-8 backdrop-blur-lg bg-slate-900/80 border-white/5 relative z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-purple-400">
            {project.icon}
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {project.category}
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
            {project.tag}
          </span>
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">
          {project.description}
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-white group/btn"
        >
          <span className="relative overflow-hidden">
            View Live Demo
            <span className="absolute bottom-0 left-0 w-full h-px bg-purple-500 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
          </span>
          <ArrowRight size={16} className="text-purple-400 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export default function ProductGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="gallery" className="py-32 bg-bg-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-500 font-bold text-xs uppercase tracking-widest mb-4 block"
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white mb-6">
            Interactive <span className="text-slate-500">Showcase.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explore our latest interactive technical manuals and digital authoring projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-3xl shadow-2xl glass-card"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Modal Image/Mockup */}
                <div className="relative aspect-video lg:aspect-auto bg-slate-950">
                  <img
                    src={`https://picsum.photos/seed/${selectedProject.imageSeed}/1200/800`}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
                </div>

                {/* Modal Content */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 text-purple-400 mb-6">
                    {selectedProject.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      {selectedProject.category}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">
                    {selectedProject.title}
                  </h3>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <ArrowRight size={16} className="text-purple-500" />
                        Project Overview
                      </h4>
                      <p className="text-slate-400 leading-relaxed">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <ArrowRight size={16} className="text-purple-500" />
                        Key Features
                      </h4>
                      <ul className="grid grid-cols-1 gap-3">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                            <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20"
                      >
                        Launch Live Preview
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
