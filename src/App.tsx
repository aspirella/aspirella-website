import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Roadmap from "./components/Roadmap";
import ProductGallery from "./components/ProductGallery";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion, useScroll, useSpring } from "motion/react";
import { Toaster } from "sonner";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-bg-dark selection:bg-brand-accent selection:text-white">
      <Toaster position="top-center" expand={false} richColors closeButton />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        {/* Expertise Section (Brief) */}
        <section id="about" className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-between items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-2xl font-display font-bold tracking-widest">AEROSPACE</span>
              <span className="text-2xl font-display font-bold tracking-widest">AUTOMOTIVE</span>
              <span className="text-2xl font-display font-bold tracking-widest">DEFENSE</span>
              <span className="text-2xl font-display font-bold tracking-widest">MANUFACTURING</span>
            </div>
          </div>
        </section>

        <Services />
        <Process />
        <div id="careers">
          <Roadmap />
        </div>
        <ProductGallery />
        <TechStack />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
