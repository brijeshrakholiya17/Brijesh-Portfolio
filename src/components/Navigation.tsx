import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', href: '/#home' },
  { name: 'About me', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Reviews', href: '/#testimonials' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          isScrolled ? 'py-4 bg-surface/90 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/#home" className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary skew-x-[-15deg]"></div>
              <span className="text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-white">My Portfolio.</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-10">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className="text-sm font-medium text-white/70 hover:text-white hover:font-bold transition-all"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-white/70 hover:text-white hover:font-bold transition-all"
                    >
                      {item.name}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              <Link
                to="/#contact"
                className="px-6 py-2.5 rounded-full bg-primary text-black font-bold uppercase tracking-wide text-xs hover:scale-105 transition-transform inline-block"
              >
                Contact Me
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <Link to="/#home" className="flex items-center gap-2 text-white">
                <div className="w-4 h-4 bg-primary skew-x-[-15deg]"></div>
                <span className="text-base font-heading font-bold uppercase tracking-tight">My portfolio.</span>
              </Link>
              <button
                className="text-white p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-3xl font-heading font-bold hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-3xl font-heading font-bold hover:text-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
