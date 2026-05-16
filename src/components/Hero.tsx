import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-24 lg:pb-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-accent/20 rounded-full blur-[120px] mix-blend-screen opacity-50 block"></div>
      <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-50 block"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        <div className="flex flex-col items-start pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary relative">
              <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></span>
            </span>
            <span className="text-sm font-medium text-muted">Available for new opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[1.1] mb-6"
          >
            Brijesh K.<br />
            <span className="text-gradient-purple">Rakholiya</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted max-w-lg mb-10 leading-relaxed"
          >
            I'm a full-stack engineer blending Apple-level minimalism with scalable architecture to build world-class SaaS products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-center gap-6 mt-8"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-black rounded-full font-bold overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="text-xl rotate-15 block relative z-10">👋</span>
              <span className="relative z-10 uppercase tracking-wide text-sm">Let's Talk</span>
            </a>
            
            <a
              href={`${import.meta.env.BASE_URL}Brijesh_Rakholiya_Web_Dev_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-white hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              <div className="w-12.5 h-12.5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors text-primary bg-primary/10">
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="uppercase tracking-wide text-sm">Download CV</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-6 mt-16 pb-4 border-b border-white/10 w-full max-w-sm"
          >
            <span className="text-sm text-white font-bold uppercase tracking-wide">Follow Me:</span>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Brijeshrakholiya17" className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-black hover:scale-110 transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/brijeshrakholiya17" className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-black hover:scale-110 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://wa.me/9773069019" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-black hover:scale-110 transition-all duration-300">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right side visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative lg:h-150 flex items-center justify-center mt-12 lg:mt-0"
        >
          {/* Profile Picture Card */}
          <div className="relative w-full max-w-105 aspect-4/5 mx-auto">
            {/* Background glowing effects */}
            <div className="absolute inset-0 bg-linear-to-tr from-accent to-primary/20 rounded-4xl rotate-3 opacity-40 blur-2xl animate-pulse-slow"></div>
            
            {/* The Image Container */}
            <div className="absolute inset-0 rounded-4xl glass p-2 border border-white/10 shadow-2xl hover:-translate-y-2 transition-transform duration-500 z-10 group overflow-hidden">
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-surface flex items-center justify-center">
                {/* 
                  NOTE: Replace the src below with your uploaded profile picture path 
                  (e.g., "/profile.jpg" if you drop it into the public folder) 
                */}
                <img 
                  src="https://i.ibb.co/PGmJpDRQ/my-PIC.jpg" 
                  alt="Developer Profile"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle gradient overlay at the bottom for premium feel */}
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-80"></div>
              </div>
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 sm:-right-6 lg:-right-8 top-12 sm:top-16 lg:top-24 p-2 sm:p-3 lg:p-4 glass rounded-xl lg:rounded-2xl border border-white/10 z-20 shadow-xl flex items-center gap-2 sm:gap-3 backdrop-blur-2xl"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold font-heading text-xs lg:text-base">
                2+
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-bold text-white mb-0.5">Years</div>
                <div className="text-[10px] sm:text-xs text-muted">Experience</div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-2 sm:-left-6 lg:-left-12 bottom-12 sm:bottom-16 lg:bottom-24 p-2 sm:p-3 lg:p-4 glass rounded-xl lg:rounded-2xl border border-white/10 z-20 shadow-xl flex items-center gap-2 sm:gap-3 backdrop-blur-2xl"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-bold text-white mb-0.5">Full Stack</div>
                <div className="text-[10px] sm:text-xs text-muted">Developer</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}