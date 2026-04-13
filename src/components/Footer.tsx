import { motion } from "motion/react";
import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-bg-dark pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/logo.svg" alt="Aspirella Logo" className="h-12 w-auto" />
            </div>
            <p className="text-brand-secondary max-w-sm leading-relaxed">
              Engineering excellence for the next generation of aerospace and automotive innovation. 
              Precision-driven documentation and lifecycle management.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-6 uppercase text-xs tracking-widest text-white/50">Services</h4>
            <ul className="space-y-4 text-brand-secondary text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Technical Documentation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">CAD Drafting</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Vehicle Lifecycle Management</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6 uppercase text-xs tracking-widest text-white/50">Company</h4>
            <ul className="space-y-4 text-brand-secondary text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-xs text-white/30 uppercase tracking-widest">
          <p>© 2026 Aspirella Technologies. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:bg-white/10 transition-all">
              <Linkedin size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:bg-white/10 transition-all">
              <Twitter size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:bg-white/10 transition-all">
              <Facebook size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:bg-white/10 transition-all">
              <Instagram size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
