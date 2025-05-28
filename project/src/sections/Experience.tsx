import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Building, Calendar } from 'lucide-react';

interface ExperienceProps {
  registerSection: (element: HTMLElement | null) => void;
}

const experiences = [
  {
    title: "Store Manager",
    company: "Anbu Florence Juice Gallery",
    period: "Jan 2023 - Present",
    description: "Oversaw daily operations, handled customer service, and ensured smooth inventory and staff coordination. Contributed to branding efforts, optimized store layout for better service flow, and introduced digital promotions using WhatsApp and Instagram.",
    technologies: ["Business Operations", "Customer Service", "Inventory Management", "Team Leadership", "Digital Marketing"]
  },
  {
    title: "Co-Founder & Co-CEO",
    company: "MODDIK India Private Limited",
    period: "Present",
    description: "Co-founded and currently leading operations at MODDIK India, specializing in PCB design and fabrication. Responsible for business strategy, client relations, and technical oversight.",
    technologies: ["PCB Design", "Entrepreneurship", "Business Development", "Team Management", "Electronics"]
  },
  {
    title: "CNC & Lathe Training",
    company: "SEkkot Engineering Export India Private Limited",
    period: "2022 - One Month Training",
    description: "Completed intensive training in CNC and lathe machine operations, gaining hands-on experience in precision engineering and manufacturing processes.",
    technologies: ["CNC Machining", "Lathe Operations", "Precision Engineering", "Manufacturing", "Technical Training"]
  }
];

const Experience = ({ registerSection }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    registerSection(sectionRef.current);
  }, [registerSection]);
  
  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="section-padding"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-12">Experience</h2>
          
          <div className="grid grid-cols-1 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className="bg-stone-900 rounded-lg p-6 border border-white/5 hover:border-white/10 transition-all transform hover:translate-y-[-4px]"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.2)] to-[rgba(var(--secondary),0.2)] flex items-center justify-center text-[rgb(var(--primary))]">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                    <div className="flex items-center gap-2 text-white/70">
                      <Building size={16} />
                      <span>{experience.company}</span>
                      <span className="mx-2">•</span>
                      <Calendar size={16} />
                      <span>{experience.period}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/80 mb-4">{experience.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-stone-950 rounded-full text-sm text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col md:flex-row items-center justify-center bg-stone-900 rounded-lg p-8 mt-12 gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.2)] to-[rgba(var(--secondary),0.2)] flex items-center justify-center text-[rgb(var(--primary))]">
              <Briefcase size={32} />
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 gradient-text">Open to Opportunities</h3>
              <p className="text-white/80">
                I'm always interested in hearing about new projects and opportunities.
                Let's collaborate and create something amazing together!
              </p>
            </div>
            
            <a href="#contact" className="button button-primary mt-4 md:mt-0 w-full md:w-auto md:ml-auto">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;