import { Github, Linkedin, Twitter, Instagram, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-surface text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary skew-x-[-15deg]"></div>
          <span className="text-lg font-heading font-bold uppercase tracking-tight text-white">My Portfolio.</span>
        </div>
        
        <p className="text-gray-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Brijesh. All rights reserved.
        </p>

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

      </div>
    </footer>
  );
}
