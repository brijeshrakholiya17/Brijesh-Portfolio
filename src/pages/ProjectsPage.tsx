import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AiResumeBuilder1 from '../assets/AiResumeBuilder1.png';
import AiResumeBuilder3 from '../assets/AiResumeBuilder3.png';
import quiz1 from '../assets/quiz1.jpg';
import quiz2 from '../assets/quiz2.jpg';
import wanderlust from '../assets/Wanderlust.jpg';
import listing from '../assets/screencapture-localhost-8080-listings-678bd4d5b171d626a995ab19-2025-01-18-21_51_59.jpg';
import OmniMeet1 from '../assets/OmniMeet1.png';
import OmniMeet2 from '../assets/OmniMeet2.png';
import MacbookScroll from '../components/MacbookScroll';

const allProjects = [
  {
    title: "HireReady -AI Powered Resume Builder",
    description: "Developed AI-integrated MERN application using Gemini API that auto-generates resume content saving 70% manual effort",
    images: [AiResumeBuilder1, AiResumeBuilder3],
    tags: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    liveUrl: "/projects",
    githubUrl: "https://github.com/brijeshrakholiya17/ai-resume-builder-project"
  },
  {
    title: "QuizFight - Real-Time Multiplayer Quiz Platform",
    description: "Built real-time multiplayer quiz platform using Socket.IO supporting 50+ concurrent users with live leaderboards.",
    images: [quiz1, quiz2],
    tags: ["React", "Node.js", "Express", "Socket.IO"],
    liveUrl: "/projects",
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

// Animation constants for swipe gestures
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// Premium spring-physics slide variants
const slideVariants: any = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.05,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.4, ease: "easeOut" }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    scale: 0.95,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.4, ease: "easeIn" }
    }
  })
};

interface CarouselState {
  index: number;
  direction: number;
}

export default function ProjectsPage() {
  const location = useLocation();
  
  const [carouselState, setCarouselState] = useState<CarouselState[]>(
    allProjects.map(() => ({ index: 0, direction: 0 }))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isExternalLink = (url: string) => /^https?:\/\//.test(url);

  const switchImage = (projectIndex: number, newDirection: 'next' | 'prev') => {
    setCarouselState(prev => {
      const newState = [...prev];
      const current = newState[projectIndex].index;
      const total = allProjects[projectIndex].images.length;
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
    <>
      <div className="hidden lg:block">
        <MacbookScroll />
      </div>
      <div className="pt-32 pb-24 min-h-screen bg-white text-black relative">

      <div className="absolute inset-x-0 top-0 h-24 md:h-42 bg-linear-to-b from-black to-transparent pointer-events-none z-10 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black font-semibold text-sm uppercase tracking-wide group mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-heading font-bold uppercase leading-none tracking-tight">
            All <br/> <span className="text-gray-300">Projects</span>
          </h1>
        </motion.div>

        <div className="flex flex-col gap-24">
          {allProjects.map((project, i) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center group relative`}
            >
              
              <div className="w-full lg:w-[60%] relative">
                 <div className="w-full aspect-4/3 rounded-4xl overflow-hidden bg-gray-100 shadow-xl border border-black/5 relative">
                   <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                   
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
                       className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
                     >
                       <img
                         src={project.images[carouselState[i].index]}
                         alt={`${project.title} carousel image ${carouselState[i].index + 1}`}
                         className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                         draggable="false"
                       />
                     </motion.div>
                   </AnimatePresence>

                   <button
                     type="button"
                     onClick={() => switchImage(i, 'prev')}
                     className="absolute left-5 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white shadow-xl transition hover:bg-black hover:border-white z-20"
                     aria-label="Previous image"
                   >
                     <ArrowLeft className="w-5 h-5" />
                   </button>

                   <button
                     type="button"
                     onClick={() => switchImage(i, 'next')}
                     className="absolute right-5 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white shadow-xl transition hover:bg-black hover:border-white z-20"
                     aria-label="Next image"
                   >
                     <ArrowRight className="w-5 h-5" />
                   </button>

                   <div className="absolute left-1/2 bottom-5 -translate-x-1/2 flex items-center gap-2 z-20">
                     {project.images.map((_, imageIndex) => (
                       <button
                         key={imageIndex}
                         type="button"
                         onClick={() => jumpToImage(i, imageIndex)}
                         className={`h-2.5 w-2.5 rounded-full transition-colors ${carouselState[i].index === imageIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}`}
                         aria-label={`Show image ${imageIndex + 1}`}
                       />
                     ))}
                   </div>
                 </div>
              </div>

              {/* Floating animated decoration - Now positioned safely in the row gap */}
              <div className="hidden lg:flex items-center justify-center w-0 relative z-30">
                <div className="absolute w-24 h-24 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 scale-50 group-hover:scale-100 bg-white/80 backdrop-blur-md pointer-events-none shadow-xl">
                   <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-[spin_5s_linear_infinite]">
                     <ArrowUpRight className="w-8 h-8 text-black" />
                   </div>
                </div>
              </div>

              <div className="w-full lg:w-[40%] flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-black/10 text-[10px] sm:text-xs font-bold text-black bg-gray-50 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-black group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-10">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href={project.liveUrl}
                    target={isExternalLink(project.liveUrl) ? '_blank' : undefined}
                    rel={isExternalLink(project.liveUrl) ? 'noopener noreferrer' : undefined}
                    className="group/btn flex items-center gap-4 font-bold text-black hover:text-accent transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <span className="text-sm uppercase tracking-wide">Live Demo</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target={isExternalLink(project.githubUrl) ? '_blank' : undefined}
                    rel={isExternalLink(project.githubUrl) ? 'noopener noreferrer' : undefined}
                    className="group/github-btn flex items-center gap-4 font-bold text-black hover:text-accent transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover/github-btn:bg-black group-hover/github-btn:text-white transition-all">
                      <Github className="w-5 h-5" />
                    </div>
                    <span className="text-sm uppercase tracking-wide">GitHub</span>
                  </a>
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}