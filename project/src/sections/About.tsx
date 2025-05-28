import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code, Cpu, Brain, Target, ArrowRight } from 'lucide-react';
import { useInView as useInViewFromReactIntersectionObserver } from 'react-intersection-observer';

// Types for the TechChain component
interface TechWord {
  text: string;
  color: string;
}

interface TechChainProps {
  direction?: 'right' | 'left';
  speed?: number;
  offset?: number;
  angle?: number;
  top?: string;
}

// Tech words with their corresponding colors
const techWords = [
  { text: 'React', color: 'from-blue-400 to-cyan-400' },
  { text: 'TypeScript', color: 'from-blue-600 to-blue-400' },
  { text: 'Node.js', color: 'from-green-500 to-emerald-400' },
  { text: 'Python', color: 'from-yellow-400 to-amber-400' },
  { text: 'Three.js', color: 'from-gray-300 to-gray-100' },
  { text: 'WebGL', color: 'from-purple-500 to-indigo-500' },
  { text: 'TensorFlow', color: 'from-orange-500 to-amber-500' },
  { text: 'MongoDB', color: 'from-green-600 to-emerald-500' },
  { text: 'Firebase', color: 'from-amber-500 to-yellow-400' },
  { text: 'Docker', color: 'from-blue-400 to-cyan-400' },
  { text: 'AWS', color: 'from-amber-500 to-orange-500' },
  { text: 'GraphQL', color: 'from-pink-500 to-rose-500' },
  { text: 'Next.js', color: 'from-gray-800 to-gray-600' },
  { text: 'Redux', color: 'from-purple-600 to-violet-500' },
  { text: 'Jest', color: 'from-red-500 to-pink-500' },
  { text: 'Cypress', color: 'from-emerald-400 to-teal-400' }
];

// Simplified TechChain component with CSS animations
const TechChain = ({ 
  direction = 'right', 
  speed = 50, 
  offset = 0, 
  angle = 0,
  top = '0%'
}: TechChainProps) => {
  const [chain, setChain] = useState<TechWord[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize the chain with tech words
  useEffect(() => {
    const containerWidth = 400;
    const wordWidth = 120;
    const wordsNeeded = Math.ceil((containerWidth * 2) / wordWidth);
    
    const newChain: TechWord[] = [];
    for (let i = 0; i < wordsNeeded; i++) {
      newChain.push(techWords[(i + offset) % techWords.length]);
    }
    setChain(newChain);
  }, [offset]);

  // Calculate animation properties
  const angleRad = useMemo(() => (angle * Math.PI) / 180, [angle]);
  const distance = 600; // Fixed distance for simplicity
  const xOffset = Math.cos(angleRad) * distance;
  const yOffset = Math.sin(angleRad) * distance;
  const animationDuration = `${speed}s`;

  const animationStyle = {
    '--x-start': '0px',
    '--y-start': '0px',
    '--x-end': `${direction === 'right' ? -xOffset : xOffset}px`,
    '--y-end': `${direction === 'right' ? yOffset : -yOffset}px`,
    '--duration': animationDuration,
  } as React.CSSProperties;

  return (
    <div 
      ref={containerRef}
      className="absolute h-10 overflow-visible"
      style={{
        top: top,
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(' + angle + 'deg)',
        transformOrigin: 'center center',
        width: '400px',
        opacity: 0.7,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <div 
        className="absolute whitespace-nowrap flex gap-6"
        style={{
          ...animationStyle,
          animation: `move ${animationDuration} linear infinite`,
          animationName: 'move',
          animationDuration: 'var(--duration)',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
        }}
      >
        {chain.map((item, index) => (
          <span 
            key={`${item.text}-${index}`}
            className={`inline-flex items-center h-7 px-3 rounded-full bg-gradient-to-r ${item.color} text-white text-xs font-medium shadow-sm`}
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              opacity: 0.8,
              filter: 'blur(0.5px)'
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes move {
          0% {
            transform: translate(var(--x-start), var(--y-start));
          }
          100% {
            transform: translate(var(--x-end), var(--y-end));
          }
        }
      `}</style>
    </div>
  );
};

interface AboutProps {
  registerSection: (element: HTMLElement | null) => void;
}

const services = [
  {
    icon: <Code size={24} />,
    title: "Web Development",
    description: "Designing and developing responsive, user-friendly web applications using modern technologies like React, Tailwind CSS, and Firebase.",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: <Brain size={24} />,
    title: "AI & ML Integration",
    description: "Building intelligent systems by integrating machine learning models into real-world applications for healthcare, privacy protection, and smart solutions.",
    gradient: "from-green-500 to-teal-600"
  },
  {
    icon: <Cpu size={24} />,
    title: "Embedded Systems & IoT",
    description: "Working with microcontrollers and hardware platforms like FPGA and Arduino to create practical embedded and IoT solutions.",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    icon: <Target size={24} />,
    title: "Problem Solving & Innovation",
    description: "Creating meaningful tech-driven solutions that address real-world challenges with efficiency and creativity.",
    gradient: "from-rose-500 to-pink-600"
  }
];

const About = ({ registerSection }: AboutProps) => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [ref, inView] = useInViewFromReactIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Floating animation for the image
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  useEffect(() => {
    registerSection(sectionRef.current);
  }, [registerSection]);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding bg-stone-900 relative overflow-hidden"
    >
      {/* Tech Chain Background Animation - Behind Photo */}
      <div className="absolute -z-10 pointer-events-none overflow-hidden"
        style={{
          top: '50%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          opacity: 0.6,
          willChange: 'transform, opacity',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        <TechChain 
          key="chain-1"
          direction="right" 
          speed={120} 
          offset={0} 
          angle={45} 
          top="50%" 
        />
        <TechChain 
          key="chain-2"
          direction="left" 
          speed={150} 
          offset={5} 
          angle={-45} 
          top="50%" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/0 via-stone-900/30 to-stone-900/80 rounded-full" style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }} />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="section-heading mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              textShadow: [
                '0 0 10px rgba(var(--primary), 0)',
                '0 0 20px rgba(var(--primary), 0.3)',
                '0 0 10px rgba(var(--primary), 0)'
              ]
            } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: 1,
              textShadow: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          >
            <span className="relative z-10">About Me</span>
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-white/80 mb-6">
                I'm Dinesh Kumar, a passionate tech enthusiast with a strong interest in both software and hardware development. 
                I thrive on building practical solutions that merge creativity with technical precision. My journey in tech 
                began with curiosity and has grown into hands-on experience across fields like web development, machine learning, 
                and embedded systems.
              </p>
              <p className="text-lg text-white/80">
                Over the years, I've worked on diverse projects—ranging from privacy-focused AI tools and FPGA-based hardware 
                designs to sustainable computing and real-time automation systems. I enjoy turning innovative ideas into functional 
                prototypes, whether through clean code, efficient model training, or logical circuit design. Every challenge I take 
                on is a step toward creating smarter, user-friendly, and impactful technology.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="border-2 border-white/10 rounded-lg p-1">
                <motion.div 
                className="aspect-video bg-gradient-to-br from-[rgba(var(--primary),0.2)] to-[rgba(var(--secondary),0.2)] rounded-lg overflow-hidden relative group"
                animate={isInView ? floatingAnimation : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <motion.span 
                    className="text-white font-medium flex items-center gap-2"
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    View Profile <ArrowRight size={16} className="inline" />
                  </motion.span>
                </div>
                <img 
                  src="/dk.jpg" 
                  alt="Dinesh Kumar" 
                  className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              </div>
              <motion.div 
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] rounded-lg -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  delay: 1,
                  duration: 0.8,
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }
                }}
              />
            </motion.div>
          </div>
          
          <motion.h3 
            className="text-2xl font-bold mb-8 gradient-text"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            What I Do
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="p-6 rounded-lg bg-stone-950/50 border border-white/5 hover:border-white/10 transition-colors"
              >
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${service.gradient})`
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <div className="w-11 h-11 rounded-full bg-stone-900 flex items-center justify-center">
                    {service.icon}
                  </div>
                </motion.div>
                <motion.h4 
                  className="text-xl font-medium mb-2 relative z-10"
                  initial={false}
                  animate={{
                    color: hoveredService === index ? '#ffffff' : 'inherit',
                    x: hoveredService === index ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.h4>
                <motion.p 
                  className="text-white/70 relative z-10"
                  initial={false}
                  animate={{
                    opacity: hoveredService === index ? 1 : 0.7,
                    x: hoveredService === index ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.description}
                </motion.p>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"
                  style={{
                    background: `linear-gradient(135deg, ${service.gradient})`,
                  }}
                  initial={false}
                  animate={{
                    opacity: hoveredService === index ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;