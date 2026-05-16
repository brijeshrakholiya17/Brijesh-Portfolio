import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

const timelineData = [
  {
    type: "Education",
    title: "XII Science (CBSE)",
    company: "Sarvodaya Secondary School, Pal",
    period: "2023",
    description: "Completed higher secondary education in the Science stream with a strong academic aggregate of 81%.",
    skills: ["Score: 81%", "Science Stream", "CBSE"]
  },
  {
    type: "Education",
    title: "Computer Engineering",
    company: "LDRP Institute of Technology, Gandhinagar",
    period: "Jul '23 - Jun '27",
    description: "Pursuing Bachelor's degree in Computer Engineering with a current CGPA of 8.16.",
    skills: ["CGPA: 8.16", "Computer Science", "Engineering"]
  },
  {
    type: "Certification",
    title: "Full Stack Web Development - Delta 3.0",
    company: "Apna College",
    period: "March 2024",
    description: "Comprehensive training program covering modern full-stack web development, including frontend, backend, and database technologies.",
    skills: ["Full Stack", "Web Development", "Delta 3.0"]
  },
  {
    type: "Certification",
    title: "Python for Data Science (4-Week Course)",
    company: "NPTEL",
    period: "July 2025",
    description: "Successfully completed intensive certification covering Python programming foundations and its applications in Data Science.",
    skills: ["Python", "Data Science", "NPTEL"]
  },
  {
    type: "Experience",
    title: "Front-End Web Development Intern",
    company: "AICTE & Edunet Foundation",
    period: "August 2025 (6 Weeks)",
    description: "Developed responsive web applications using modern frontend technologies. Collaborated in a team environment following agile practices.",
    skills: ["Frontend Technologies", "Responsive Design", "Agile Practices", "Web Development"]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const dotY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-surface text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-[56px] font-heading font-bold text-center mb-24 md:mb-32 uppercase leading-none max-w-4xl mx-auto text-white"
        >
          My <span className="inline-block px-1">🚀</span> Journey <br className="hidden md:block"/> So Far
        </motion.h2>

        <div className="relative mx-auto min-h-75" ref={containerRef}>
          {/* Main timeline track */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2 rounded-full hidden sm:block"></div>
          
          {/* Animated progress line */}
          <motion.div 
            className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] origin-top bg-linear-to-b from-primary to-accent md:-translate-x-1/2 z-10 rounded-full hidden sm:block"
            style={{ scaleY: smoothProgress }}
          />

          {/* Animated moving dot */}
          <motion.div
            className="absolute left-[30px] md:left-1/2 w-5 h-5 rounded-full bg-black border-4 border-primary shadow-[0_0_20px_rgba(198,255,0,0.8)] z-20 hidden sm:block delay-75"
            style={{ 
              top: dotY,
              x: "-50%",
              marginTop: "-10px"
            }}
          />

          <div className="flex flex-col gap-16 md:gap-32">
            {timelineData.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative w-full flex flex-col md:flex-row justify-between items-start">
                  
                  {/* Left spacer for zig-zag on desktop */}
                  {!isEven && <div className="hidden md:block w-[45%]"></div>}

                  {/* Content card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    className={`w-full sm:pl-20 md:pl-0 md:w-[45%] ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}
                  >
                    <div className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-500 hover:border-white/20">
                      <div className={`flex flex-col gap-2 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        
                        <div className={`flex flex-col md:flex-row gap-3 items-center mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                           <span className="inline-block px-4 py-1.5 bg-primary text-black rounded-full text-xs font-bold uppercase tracking-widest group-hover:scale-105 transition-transform">
                             {item.period}
                           </span>
                           <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                             {item.type}
                           </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        
                        <h4 className="text-xl md:text-2xl text-gray-400 font-medium mb-4">
                          {item.company}
                        </h4>
                        
                        <p className={`text-gray-400 leading-relaxed text-base md:text-lg mb-8 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                          {item.description}
                        </p>
                        
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          {item.skills.map(skill => (
                            <span 
                              key={skill} 
                              className="px-4 py-1.5 bg-black/50 rounded-full text-xs uppercase tracking-wide font-semibold text-gray-300 border border-white/5 hover:border-primary/50 hover:text-primary transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right spacer for zig-zag on desktop */}
                  {isEven && <div className="hidden md:block w-[45%]"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}