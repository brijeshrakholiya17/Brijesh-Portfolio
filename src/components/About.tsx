import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type StatItem = {
  label: string;
  value: string;
};

const parseCountValue = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits ? Number(digits) : 0;
};

const parseCountSuffix = (value: string) => {
  return value.replace(/\d/g, '');
};

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const target = parseCountValue(value);
  const suffix = parseCountSuffix(value);

  useEffect(() => {
    if (!ref.current || started) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    let startTime = 0;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.round(progress * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-black mb-2">
      {count}
      {suffix}
    </div>
  );
}

export default function About() {
  const stats: StatItem[] = [
    { label: 'Years Experience', value: '02+' },
    { label: 'Hours Spent Building & Learning', value: '300+' },
    { label: 'Full-Stack Projects Built', value: '2+' },
    { label: 'DSA problems solved', value: '75+' },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium leading-normal md:leading-[1.6] text-center max-w-5xl mx-auto"
        >
          👋 Hello! I'm an ambitious web developer with <span className="text-accent uppercase font-bold border-b-[3px] border-accent pb-1">2+ years of experience</span> in the field. I thrive on turning imaginative ideas into digital realities, constantly seeking innovative ways to blend design and technology. I possess a strong foundation in <span className="text-accent uppercase font-bold border-b-[3px] border-accent pb-1">Front-End</span> and <span className="text-accent uppercase font-bold border-b-[3px] border-accent pb-1">Back-End</span> development, as well as a keen eye for responsive interfaces.
        </motion.h3>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 max-w-5xl mx-auto border-t border-black/10 pt-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp value={stat.value} />
              <div className="text-gray-500 font-medium tracking-wide uppercase text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
