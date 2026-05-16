import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: "Foysal Khan",
    role: "CEO of Web Page Design",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    text: "Working with Moskur was an absolute pleasure. Their attention to detail and commitment to delivering exceptional web solutions is truly commendable."
  },
  {
    name: "Sarah Jenkins",
    role: "Director at Creative Co.",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    text: "It is rare to find a developer who truly understands design. They translated our complex Figma files into pixel-perfect React code without missing a beat."
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager at TechFlow",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    text: "Reliable, incredibly fast, and always thinking two steps ahead. They didn't just write code; they helped us architect our entire application for future scale."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 relative bg-white text-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 text-center relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-heading font-bold mb-12 md:mb-20 uppercase leading-tight md:leading-none"
        >
          Don't just take my <br className="hidden md:block"/> <span className="inline-block px-1">😊</span> word for it.
        </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center justify-between">
          
          {/* Left Navigation Arrows (Desktop) */}
          <div className="hidden md:flex flex-col gap-4">
            <button 
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <ArrowUp className="w-5 h-5 text-black" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border border-black bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* 
            Auto-height Carousel Grid: 
            Using a grid with [grid-area:1/1] ensures the container naturally 
            stretches to fit the tallest testimonial text, without clipping or bouncing.
          */}
          <div className="flex-1 w-full max-w-4xl mx-auto relative grid items-center">
            {/* Removed mode="wait" so the entering/exiting grids overlap and hold the parent height */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="[grid-area:1/1] flex flex-col items-center justify-center px-2 sm:px-4 py-4"
              >
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-600 leading-relaxed md:leading-relaxed max-w-3xl mb-8 md:mb-12">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex flex-col items-center gap-5 md:gap-6">
                  <div className="text-center">
                    <h5 className="font-bold text-base sm:text-lg text-black">
                      {testimonials[currentIndex].name}, <span className="font-normal text-gray-500">{testimonials[currentIndex].role}</span>
                    </h5>
                  </div>
                  
                  <div className="flex gap-3 md:gap-4 items-center h-20">
                     {testimonials.map((t, idx) => (
                       <img 
                         key={idx}
                         src={t.image} 
                         alt={t.name}
                         className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 object-cover transition-all duration-500 ease-out ${idx === currentIndex ? 'border-primary ring-4 ring-primary/20 scale-110 md:scale-125 z-10' : 'border-transparent opacity-40 blur-[1px] md:blur-[2px] scale-90'}`}
                       />
                     ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Pagination Dots (Desktop) */}
          <div className="hidden md:flex flex-col gap-4">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => {
                   setDirection(idx > currentIndex ? 1 : -1);
                   setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-black scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
        </div>

        {/* Mobile controls (Horizontal Row) */}
        <div className="flex justify-center items-center gap-6 sm:gap-8 mt-10 sm:mt-12 md:hidden">
          <button 
            onClick={() => paginate(-1)} 
            className="p-3 sm:p-3.5 border border-black/20 rounded-full hover:bg-black/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black"/>
          </button>
          
          <div className="flex gap-2.5 sm:gap-3 items-center">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                   setDirection(idx > currentIndex ? 1 : -1);
                   setCurrentIndex(idx);
                }}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-black scale-125' : 'bg-gray-300'}`} 
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => paginate(1)} 
            className="p-3 sm:p-3.5 border border-black bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5"/>
          </button>
        </div>

      </div>
    </section>
  );
}