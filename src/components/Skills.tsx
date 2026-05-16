import { motion } from 'motion/react';
import { Code2, Database, Layout, Server, Settings, Smartphone } from 'lucide-react';

const skillCategories = [
  {
    title: "Front-end Development",
    icon: Layout,
    description: "Building responsive, accessible, and performant user interfaces.",
    skills: ["React.js", "TypeScript", "Tailwind CSS","BootStrap","Framer Motion", "JavaScript", "HTML", "CSS"]
  },
  {
    title: "Back-end Development",
    icon: Server,
    description: "Designing scalable APIs and robust server-side logic.",
    skills: ["Node.js", "Express", "Python","REST APIs","JWT", "OAuth"]
  },
  {
    title: "Database Management",
    icon: Database,
    description: "Structuring and optimizing data storage solutions.",
    skills: ["MongoDB", "Redis","MySQL"]
  },
  {
    title: "Tools & Testing",
    icon: Code2,
    description: "Ensuring code quality and streamlined workflows.",
    skills: ["Git","GitHub", "Vite","WebSocket","Postman"]
  },
  {
    title: "Programming Languages",
    icon: Smartphone,
    description: "Proficient in multiple programming languages for diverse applications.",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C","C++", "AI integration"]
  },
  {
    title: "Others",
    icon: Smartphone,
    description: "Additional skills and technologies I have experience with.",
    skills: ["Passport.js", "Clerk", "Strapi CMS", "Gemini API", "EmailJS"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative bg-white text-black border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-[56px] font-heading font-bold text-center mb-16 md:mb-24 uppercase max-w-4xl mx-auto leading-none"
        >
          I specialize in a <br className="hidden md:block"/> range of <span className="inline-block px-2">💪</span> skills
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 md:p-10 rounded-4xl bg-white border border-black/10 shadow-sm hover:shadow-xl hover:bg-primary hover:border-primary transition-all duration-300 group flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl border border-black/10 flex items-center justify-center mb-8 group-hover:border-black/20 group-hover:bg-black/5 transition-colors duration-300">
                <category.icon className="w-6 h-6 text-black" strokeWidth={1.5} />
              </div>
              <h4 className="text-2xl font-heading font-bold mb-4 text-black">{category.title}</h4>
              <p className="text-base text-gray-500 mb-8 leading-relaxed group-hover:text-black/70 transition-colors flex-1">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span 
                    key={skill}
                    className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full border border-black/10 text-gray-600 group-hover:border-black/20 group-hover:text-black transition-colors bg-white/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
