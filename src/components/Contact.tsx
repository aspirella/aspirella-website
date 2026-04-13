import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  MapPin, 
  Linkedin, 
  CheckCircle2, 
  Send, 
  Loader2, 
  Check, 
  X,
  Globe,
  Mail,
  ArrowRight,
  Phone,
  Facebook,
  Twitter,
  ChevronDown,
  AlertCircle
} from "lucide-react";

const SERVICES = ["CAD", "IETM", "IT", "Training"] as const;

const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters"),
  email: z.string()
    .email("Please enter a valid company email")
    .refine((email) => {
      const genericDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
      const domain = email.split('@')[1];
      return !genericDomains.includes(domain?.toLowerCase());
    }, {
      message: "Please use a professional company email address",
    }),
  service: z.enum(SERVICES, "Please select a service interest"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long (max 1000 characters)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const FloatingInput = ({ 
  label, 
  id, 
  type = "text", 
  register, 
  error,
  value,
  isValid
}: { 
  label: string; 
  id: keyof ContactFormData; 
  type?: string; 
  register: any; 
  error?: string;
  value?: string;
  isValid?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <div className="relative">
          <input
            {...register(id)}
            type={type}
            id={id}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              register(id).onBlur(e);
            }}
            className={`w-full bg-white/5 border-b-2 px-3 py-3 pt-5 md:px-4 md:py-4 md:pt-6 outline-none transition-all duration-300 rounded-t-lg
              ${error ? "border-red-500/50 focus:border-red-500" : isValid ? "border-green-500/50 focus:border-green-500" : "border-white/10 focus:border-purple-500"}
              ${isFocused || hasValue ? "bg-white/10" : "bg-white/5"}
            `}
          />
          <label
            htmlFor={id}
            className={`absolute left-3 md:left-4 transition-all duration-300 pointer-events-none
              ${isFocused || hasValue ? "top-1.5 md:top-2 text-[10px] md:text-xs text-purple-400 font-bold uppercase tracking-widest" : "top-4 md:top-5 text-sm md:text-base text-slate-400"}
              ${error ? "text-red-400" : isValid ? "text-green-400" : ""}
            `}
          >
            {label}
          </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <AlertCircle className="text-red-500" size={16} />
              </motion.div>
            ) : isValid ? (
              <motion.div key="valid" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <Check className="text-green-500" size={16} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <div className="min-h-[24px] mt-1">
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20 w-fit"
            >
              <AlertCircle size={10} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FloatingSelect = ({ 
  label, 
  id, 
  options, 
  register, 
  error,
  value,
  isValid
}: { 
  label: string; 
  id: keyof ContactFormData; 
  options: string[]; 
  register: any; 
  error?: string;
  value?: string;
  isValid?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <div className="relative">
          <select
            {...register(id)}
            id={id}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              register(id).onBlur(e);
            }}
            className={`w-full bg-white/5 border-b-2 px-3 py-3 pt-5 md:px-4 md:py-4 md:pt-6 outline-none transition-all duration-300 rounded-t-lg appearance-none cursor-pointer
              ${error ? "border-red-500/50 focus:border-red-500" : isValid ? "border-green-500/50 focus:border-green-500" : "border-white/10 focus:border-purple-500"}
              ${isFocused || hasValue ? "bg-white/10" : "bg-white/5"}
            `}
          >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-slate-900 text-white">
              {opt}
            </option>
          ))}
        </select>
        <label
          htmlFor={id}
          className={`absolute left-3 md:left-4 transition-all duration-300 pointer-events-none
            ${isFocused || hasValue ? "top-1.5 md:top-2 text-[10px] md:text-xs text-purple-400 font-bold uppercase tracking-widest" : "top-4 md:top-5 text-sm md:text-base text-slate-400"}
            ${error ? "text-red-400" : isValid ? "text-green-400" : ""}
          `}
        >
          {label}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <AlertCircle className="text-red-500" size={16} />
              </motion.div>
            ) : isValid ? (
              <motion.div key="valid" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <Check className="text-green-500" size={16} />
              </motion.div>
            ) : (
              <motion.div key="chevron" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ChevronDown className="text-slate-500" size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="min-h-[24px] mt-1">
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20 w-fit"
            >
              <AlertCircle size={10} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FloatingTextarea = ({ 
  label, 
  id, 
  register, 
  error,
  value,
  isValid
}: { 
  label: string; 
  id: keyof ContactFormData; 
  register: any; 
  error?: string;
  value?: string;
  isValid?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <div className="relative">
          <textarea
            {...register(id)}
            id={id}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              register(id).onBlur(e);
            }}
            rows={4}
            className={`w-full bg-white/5 border-b-2 px-3 py-3 pt-5 md:px-4 md:py-4 md:pt-6 outline-none transition-all duration-300 rounded-t-lg resize-none
              ${error ? "border-red-500/50 focus:border-red-500" : isValid ? "border-green-500/50 focus:border-green-500" : "border-white/10 focus:border-purple-500"}
              ${isFocused || hasValue ? "bg-white/10" : "bg-white/5"}
            `}
          />
          <label
            htmlFor={id}
            className={`absolute left-3 md:left-4 transition-all duration-300 pointer-events-none
              ${isFocused || hasValue ? "top-1.5 md:top-2 text-[10px] md:text-xs text-purple-400 font-bold uppercase tracking-widest" : "top-4 md:top-5 text-sm md:text-base text-slate-400"}
              ${error ? "text-red-400" : isValid ? "text-green-400" : ""}
            `}
          >
            {label}
          </label>
        <div className="absolute right-4 top-8 pointer-events-none">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <AlertCircle className="text-red-500" size={16} />
              </motion.div>
            ) : isValid ? (
              <motion.div key="valid" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <Check className="text-green-500" size={16} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <div className="min-h-[24px] mt-1">
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20 w-fit"
            >
              <AlertCircle size={10} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ParticleBackground = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-purple-500/20 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const formValues = watch();
  const selectedService = formValues.service;

  const messageLabel = React.useMemo(() => {
    switch (selectedService) {
      case "CAD":
        return "Describe your CAD project needs...";
      case "IETM":
        return "Detail your IETM requirements...";
      case "IT":
        return "Outline your IT project scope...";
      case "Training":
        return "Specify your training needs...";
      default:
        return "How can we help?";
    }
  }, [selectedService]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Quote request sent successfully!");
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Failed to send request. Please try again.");
    }
  };

  const onInvalid = () => {
    toast.error("Please fix the errors in the form.", {
      description: "Ensure all required fields are filled correctly."
    });
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-20 md:py-32 bg-slate-950 relative overflow-hidden"
    >
      {/* Animated Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Moving Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(to right, #9333ea 1px, transparent 1px), linear-gradient(to bottom, #9333ea 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)',
          }}
        >
          <motion.div 
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px']
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: 'inherit',
              backgroundSize: 'inherit'
            }}
          />
        </div>

        {/* Floating Particles */}
        <ParticleBackground />

        {/* Mouse Spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(147, 51, 234, 0.15), transparent 80%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="text-purple-500 font-bold text-xs uppercase tracking-widest mb-4 block"
            >
              Get in Touch
            </motion.span>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter mb-8"
            >
              Let's Engineer Your <br />
              <span className="text-slate-500">Next Success.</span>
            </motion.h2>

            <div className="space-y-8 mb-12">
              {[
                { icon: <MapPin size={24} />, title: "Our Location", desc: "Hyderabad, India | Global Support" },
                { icon: <Mail size={24} />, title: "Email Us", desc: "contact@aspirella.com" },
                { 
                  icon: <Globe size={24} />, 
                  title: "Connect With Us", 
                  content: (
                    <div className="flex gap-3">
                      {[
                        { icon: <Linkedin size={18} />, href: "#" },
                        { icon: <Facebook size={18} />, href: "#" },
                        { icon: <Twitter size={18} />, href: "#" }
                      ].map((social, i) => (
                        <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:bg-white/10 transition-all">
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  )
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    {item.desc ? <p className="text-slate-400">{item.desc}</p> : item.content}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.a 
                href="tel:+914012345678" 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20"
              >
                <Phone size={20} />
                Call Us: +91 40 1234 5678
              </motion.a>
              <motion.a 
                href="mailto:contact@aspirella.com" 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all"
              >
                <Mail size={20} className="text-purple-400" />
                Email Support
              </motion.a>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "circOut" } }
              }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 relative z-10">
                <Globe size={18} className="text-purple-400" />
                Why Work With Us?
              </h4>
              <ul className="space-y-4 relative z-10">
                {[
                  "24/7 Global Technical Support",
                  "ISO 9001:2015 Certified Quality",
                  "Precision Engineered Solutions",
                  "Industry-Leading Turnaround Time"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                    <CheckCircle2 size={16} className="text-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1], // Custom cubic bezier for premium feel
              delay: 0.3 
            }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-purple-500/10 blur-3xl rounded-full -z-10 animate-pulse" />
            
            <div className="glass-card p-6 md:p-12 border-slate-800 shadow-2xl shadow-purple-500/5">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit, onInvalid)}
                    className="space-y-1"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                      <FloatingInput 
                        label="Full Name" 
                        id="name" 
                        register={register} 
                        error={errors.name?.message} 
                        value={formValues.name}
                        isValid={dirtyFields.name && !errors.name}
                      />
                      <FloatingInput 
                        label="Company Email" 
                        id="email" 
                        type="email" 
                        register={register} 
                        error={errors.email?.message} 
                        value={formValues.email}
                        isValid={dirtyFields.email && !errors.email}
                      />
                    </div>
                    
                    <FloatingSelect 
                      label="Service Interest" 
                      id="service" 
                      options={["CAD", "IETM", "IT", "Training"]} 
                      register={register} 
                      error={errors.service?.message} 
                      value={formValues.service}
                      isValid={dirtyFields.service && !errors.service}
                    />

                    <FloatingTextarea 
                      label={messageLabel} 
                      id="message" 
                      register={register} 
                      error={errors.message?.message} 
                      value={formValues.message}
                      isValid={dirtyFields.message && !errors.message}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden relative
                        ${isSubmitting ? "bg-purple-600/50 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 hover:scale-[1.02] active:scale-[0.98]"}
                        text-white shadow-lg shadow-purple-500/20
                      `}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2 className="animate-spin" size={20} />
                            Sending...
                          </motion.div>
                        ) : (
                          <motion.div
                            key="idle"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Send size={18} />
                            Request a Quote
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                      >
                        <Check className="text-green-500" size={40} />
                      </motion.div>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
                      Message Received!
                    </h3>
                    <p className="text-slate-400 mb-8">
                      Thank you for reaching out. Our engineering team will review your request and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-purple-400 font-bold hover:text-purple-300 transition-colors flex items-center gap-2 mx-auto"
                    >
                      Send another message <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
