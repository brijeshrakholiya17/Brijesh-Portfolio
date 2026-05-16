import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Hand } from 'lucide-react';
import { Link } from 'react-router-dom';
import AiResumeBuilder1 from '../assets/AiResumeBuilder1.png';
import AiResumeBuilder3 from '../assets/AiResumeBuilder3.png';
import quiz1 from '../assets/quiz1.jpg';
import quiz2 from '../assets/quiz2.jpg';
import wanderlust from '../assets/Wanderlust.jpg';
import OmniMeet1 from '../assets/OmniMeet1.png';
import OmniMeet2 from '../assets/OmniMeet2.png';
import listing from '../assets/screencapture-localhost-8080-listings-678bd4d5b171d626a995ab19-2025-01-18-21_51_59.jpg';

const projects = [
  {
    title: "HireReady -AI Powered Resume Builder",
    description: "Developed AI-integrated MERN application using Gemini API that auto-generates resume content saving 70% manual effort",
    images: [AiResumeBuilder1, AiResumeBuilder3],
    tags: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    liveUrl: "/project",
    githubUrl: "https://github.com/brijeshrakholiya17/ai-resume-builder-project"
  },
  {
    title: "QuizFight - Real-Time Multiplayer Quiz Platform",
    description: "Built real-time multiplayer quiz platform using Socket.IO supporting 50+ concurrent users with live leaderboards.",
    images: [quiz1, quiz2],
    tags: ["React", "Node.js", "Express", "Socket.IO"],
    liveUrl: "/project",
    githubUrl: "#"
  },
  {
    title: "WanderStay - Global home-sharing and rental platform",
    description: "Developed a scalable rental platform using MERN stack handling property search, booking, and secure authentication for 100+ simulated users.",
    images: [wanderlust, listing],
    tags: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    liveUrl: "https://wanderstay-project-jcnv.onrender.com/",
    githubUrl: "https://github.com/brijeshrakholiya17/WanderStay-project"
  },
  {
    title: "OmniMeet – Real-Time Video Conferencing Platform",
    description: "OmniMeet is a production-grade, full-stack video conferencing application engineered to facilitate seamless real-time communication. Built with a focus on low latency and high availability, it enables users to create instant meetings, join via secure codes, and collaborate using HD video, crystal-clear audio, and real-time chat.",
    images: [OmniMeet2, OmniMeet1],
    tags: ["React", "Node.js", "Express", "WebRTC", "Socket.IO"],
    liveUrl: "https://omnimeet-app.onrender.com/",
    githubUrl: "https://github.com/brijeshrakholiya17/OmniMeet-Real-Time-Video-Conferencing"
  }
];

// Constants for framer motion swiping
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// Premium spring animation variants for the sliding effect
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};

export default function Projects() {
  // Track index and direction for each project carousel
  const [carouselState, setCarouselState] = useState(
    projects.map(() => ({ index: 0, direction: 0 }))
  );

  const switchImage = (projectIndex: number, newDirection: 'next' | 'prev') => {
    setCarouselState(prev => {
      const newState = [...prev];
      const current = newState[projectIndex].index;
      const total = projects[projectIndex].images.length;
      const dir = newDirection === 'next' ? 1 : -1;
      const nextIndex = newDirection === 'next'
        ? (current + 1) % total
        : (current - 1 + total) % total;
        
      newState[projectIndex] = { index: nextIndex, direction: dir };
      return newState;
    });
  };

  const jumpToImage = (projectIndex: number, imageIndex: number) => {
    setCarouselState(prev => {
      const newState = [...prev];
      const current = newState[projectIndex].index;
      if (current === imageIndex) return newState; 
      
      const dir = imageIndex > current ? 1 : -1;
      newState[projectIndex] = { index: imageIndex, direction: dir };
      return newState;
    });
  };

  return (
    <section id="projects" className="py-16 md:py-32 relative bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-heading font-bold text-center mb-10 md:mb-24 uppercase max-w-5xl mx-auto leading-none"
        >
          Here's a glimpse of <br className="hidden md:block"/> some exciting <span className="inline-block px-2">👨‍💻</span> projects I've done
        </motion.h2>

        <div className="flex flex-col gap-10 md:gap-12 lg:gap-24 mb-12 md:mb-16">
          {projects.map((project, i) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i % 2 * 0.1 }}
              className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-5 md:gap-8 lg:gap-16 items-center group bg-gray-50/50 lg:bg-transparent border border-black/5 lg:border-none rounded-3xl md:rounded-[2.5rem] lg:rounded-none overflow-hidden lg:overflow-visible transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 lg:hover:shadow-none`}
            >
              <div className="w-full lg:w-1/2 relative">
                {/* 
                  Mobile: aspect-video, Object-contain to ensure 100% width is completely visible. 
                  Desktop: aspect-4/3, Object-cover to maintain original look 
                */}
                <div className="relative w-full aspect-video md:aspect-4/3 rounded-t-3xl md:rounded-[2.5rem] overflow-hidden border-b lg:border border-black/10 shadow-lg md:shadow-2xl bg-[#0f172a] touch-pan-y">
                  
                  <AnimatePresence initial={false} custom={carouselState[i].direction}>
                     <motion.div
                       key={carouselState[i].index}
                       custom={carouselState[i].direction}
                       variants={slideVariants}
                       initial="enter"
                       animate="center"
                       exit="exit"
                       drag="x"
                       dragConstraints={{ left: 0, right: 0 }}
                       dragElastic={1}
                       onDragEnd={(e, { offset, velocity }) => {
                         const swipe = swipePower(offset.x, velocity.x);
                         if (swipe < -swipeConfidenceThreshold) {
                           switchImage(i, 'next');
                         } else if (swipe > swipeConfidenceThreshold) {
                           switchImage(i, 'prev');
                         }
                       }}
                       className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0 flex items-center justify-center"
                     >
                        <img
                          src={project.images[carouselState[i].index]}
                          alt={`${project.title} screenshot`}
                          loading="lazy"
                          className="w-full h-full object-contain md:object-cover transition-transform duration-700 ease-out md:hover:scale-105 pointer-events-none"
                        />
                     </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-linear-to-t from-black/20 to-transparent pointer-events-none z-10" />

                  {/* Hide tag on smaller screens entirely */}
                  <div className="hidden md:inline-flex absolute top-5 left-5 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-widest text-white border border-white/10 backdrop-blur-xl shadow-xl z-20">
                    <span className="font-semibold">Live Preview</span>
                    <span className="text-white/60">·</span>
                    <span>{carouselState[i].index + 1}/2</span>
                  </div>

                  {/* Mobile Premium Swipe Indicator */}
                  <div className="md:hidden absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full z-20 text-white shadow-xl pointer-events-none animate-pulse">
                    <Hand className="w-3.5 h-3.5" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">Swipe</span>
                  </div>

                  {/* Controls hidden on Mobile/Tablet */}
                  <button
                    type="button"
                    onClick={() => switchImage(i, 'prev')}
                    className="hidden lg:inline-flex absolute left-5 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white shadow-xl transition hover:bg-black hover:border-white z-20"
                    aria-label="Previous image"
                  >
                    <ArrowRight className="w-4 h-4 -rotate-180" />
                  </button>

                  <button
                    type="button"
                    onClick={() => switchImage(i, 'next')}
                    className="hidden lg:inline-flex absolute right-5 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white shadow-xl transition hover:bg-black hover:border-white z-20"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="absolute left-1/2 bottom-3 md:bottom-5 -translate-x-1/2 flex items-center gap-2 z-20">
                    {project.images.map((_, imageIndex) => (
                      <button
                        key={imageIndex}
                        type="button"
                        onClick={() => jumpToImage(i, imageIndex)}
                        className={`h-2 md:h-2.5 w-2 md:w-2.5 rounded-full transition-all duration-300 ${carouselState[i].index === imageIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Show image ${imageIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Reduced paddings and fonts for a compact, auto-height mobile card */}
              <div className="w-full lg:w-1/2 flex flex-col items-start p-5 sm:p-6 md:p-8 lg:p-0 h-auto">
                <h4 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 md:mb-6 text-black group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h4>
                
                <p className="text-gray-500 text-sm sm:text-base md:text-xl leading-relaxed mb-5 md:mb-8 max-w-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 md:px-5 md:py-2 rounded-full border border-black/10 text-[10px] md:text-xs font-semibold text-gray-600 bg-white lg:bg-gray-50 group-hover:border-black/20 transition-colors uppercase tracking-wide shadow-sm lg:shadow-none">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center pt-5 md:pt-8 border-t border-black/5 w-full lg:max-w-sm mt-auto">
                  <Link to="/projects" className="group/btn flex items-center justify-between font-bold text-black hover:text-accent transition-colors w-full">
                    <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-wide">View Project Detailed</span>
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-black/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary group-hover/btn:text-black transition-all shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5 md:w-5 md:h-5" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-16">
          <Link to="/projects">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-primary text-black rounded-full font-bold text-xs md:text-base uppercase tracking-wide overflow-hidden hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              <span className="relative z-10">View All Projects</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}