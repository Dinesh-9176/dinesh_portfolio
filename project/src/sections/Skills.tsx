import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { X } from 'lucide-react';
import SkillCategorySphere from '../components/three/SkillCategorySphere';

interface Skill {
  name: string;
  level: number;
}

interface Category {
  name: string;
  skills: Skill[];
}

interface SkillsProps {
  registerSection: (element: HTMLElement | null) => void;
}

const categories: Category[] = [
  {
    name: "AI & Machine Learning",
    skills: [
      { name: "Python", level: 95 },
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "scikit-learn", level: 90 },
      { name: "Natural Language Processing", level: 85 },
      { name: "Computer Vision", level: 80 },
    ]
  },
  {
    name: "Data Science & Analytics",
    skills: [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 90 },
      { name: "Data Visualization", level: 85 },
      { name: "SQL", level: 90 },
      { name: "Data Preprocessing", level: 95 },
      { name: "Big Data Tools", level: 75 },
    ]
  },
  {
    name: "Software Development",
    skills: [
      { name: "Python", level: 95 },
      { name: "Java", level: 85 },
      { name: "C++", level: 80 },
      { name: "Git & Version Control", level: 90 },
      { name: "Docker", level: 80 },
      { name: "RESTful APIs", level: 85 },
    ]
  },
  {
    name: "Web Development",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "HTML5/CSS3", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 80 },
    ]
  },
  {
    name: "Embedded & Hardware",
    skills: [
      { name: "FPGA Development", level: 85 },
      { name: "VLSI Design", level: 80 },
      { name: "Embedded C", level: 80 },
      { name: "Arduino", level: 75 },
      { name: "Raspberry Pi", level: 80 },
      { name: "IoT Technologies", level: 75 },
    ]
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 80 },
      { name: "Google Cloud", level: 75 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 70 },
      { name: "CI/CD Pipelines", level: 75 },
      { name: "Linux/Unix", level: 85 },
    ]
  },
  {
    name: "Research & Innovation",
    skills: [
      { name: "Academic Research", level: 90 },
      { name: "Technical Writing", level: 85 },
      { name: "Problem Solving", level: 95 },
      { name: "Innovation Management", level: 85 },
      { name: "Project Management", level: 80 },
      { name: "Public Speaking", level: 85 },
    ]
  },
  {
    name: "Entrepreneurship",
    skills: [
      { name: "Startup Development", level: 85 },
      { name: "Product Management", level: 80 },
      { name: "Pitching Ideas", level: 90 },
      { name: "Business Strategy", level: 75 },
      { name: "Team Leadership", level: 85 },
      { name: "Innovation", level: 90 },
    ]
  }
];

// Color palette for different skill categories
const categoryColors: Record<string, string> = {
  'AI & Machine Learning': '#FF6B6B',
  'Data Science & Analytics': '#4ECDC4',
  'Software Development': '#45B7D1',
  'Web Development': '#96CEB4',
  'Embedded & Hardware': '#FFEEAD',
  'Cloud & DevOps': '#D4A5A5',
  'Research & Innovation': '#A2D7D8',
  'Entrepreneurship': '#FFD166'
};

const Skills = ({ registerSection }: SkillsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const handleCardClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  useEffect(() => {
    registerSection(sectionRef.current);
  }, [registerSection]);

  // Handle category hover for future enhancements
  // const handleCategoryHover = (categoryName: string | null) => {
  //   setSelectedCategory(categoryName);
  // };
  
  return (
    <>
      <section 
        id="skills" 
        ref={sectionRef}
        className="section-padding relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading mb-12 text-center">Skills</h2>
            
            <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto text-center">
              I've cultivated a diverse skill set spanning AI/ML, software development, and hardware engineering.
              My expertise enables me to bridge the gap between cutting-edge research and practical implementation,
              creating innovative solutions from concept to deployment.
            </p>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 cursor-pointer group overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 20,
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.2, 0.8, 0.2, 1]
                  }}
                  onClick={() => handleCardClick(category.name)}
                  style={{
                    border: `1px solid ${categoryColors[category.name]}20`,
                    boxShadow: `0 4px 30px ${categoryColors[category.name]}10`
                  }}
                >
                  <div className="relative z-10">
                    <h3 
                      className="text-xl font-bold mb-3 transition-all duration-300"
                      style={{ color: categoryColors[category.name] }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                      {category.skills.length} skills
                    </p>
                    
                    <div className="space-y-2.5">
                      {category.skills.slice(0, 3).map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" 
                               style={{ backgroundColor: categoryColors[category.name] }} />
                          <span className="text-sm text-white/80 truncate">{skill.name}</span>
                        </div>
                      ))}
                      {category.skills.length > 3 && (
                        <div className="text-xs text-white/50 mt-1">
                          +{category.skills.length - 3} more
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <div className="flex items-center text-sm text-white/60 group-hover:text-white/80 transition-colors">
                        <span>View Details</span>
                        <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div 
                    className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10"
                    style={{ backgroundColor: categoryColors[category.name] }}
                  />
                  <div 
                    className="absolute -left-5 -bottom-5 w-20 h-20 rounded-full opacity-5"
                    style={{ backgroundColor: categoryColors[category.name] }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Modal for 3D Sphere View */}
            <AnimatePresence>
              {isModalOpen && selectedCategory && (
                <motion.div 
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeModal}
                >
                  <motion.div 
                    className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      border: `1px solid ${categoryColors[selectedCategory]}30`,
                      boxShadow: `0 0 40px ${categoryColors[selectedCategory]}20`
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col">
                      {/* Header */}
                      <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <h3 
                          className="text-2xl font-bold"
                          style={{ color: categoryColors[selectedCategory] }}
                        >
                          {selectedCategory}
                        </h3>
                        <button 
                          onClick={closeModal}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors"
                          aria-label="Close"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 overflow-auto">
                        <div className="h-full min-h-[400px] lg:min-h-0">
                          <Canvas>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={0.8} />
                            <pointLight position={[-10, -10, -10]} intensity={0.2} />
                            <SkillCategorySphere 
                              skills={categories.find(c => c.name === selectedCategory)?.skills.map(s => s.name) || []}
                              color={categoryColors[selectedCategory]}
                              position={[0, 0, 0]}
                              scale={1.2}
                            />
                            <OrbitControls 
                              enableZoom={false}
                              autoRotate
                              autoRotateSpeed={0.8}
                            />
                          </Canvas>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-medium mb-4">Skills</h4>
                            <div className="space-y-4">
                              {categories
                                .find(c => c.name === selectedCategory)
                                ?.skills.map((skill, index) => (
                                  <div key={index} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span>{skill.name}</span>
                                      <span className="text-white/60">{skill.level}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full rounded-full"
                                        style={{
                                          width: `${skill.level}%`,
                                          background: `linear-gradient(90deg, ${categoryColors[selectedCategory]}, ${categoryColors[selectedCategory]}cc)`
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-medium mb-4">Description</h4>
                            <p className="text-white/80 text-sm">
                              {selectedCategory === 'AI & Machine Learning' && 'Specialized in developing intelligent systems using modern machine learning techniques and frameworks.'}
                              {selectedCategory === 'Data Science & Analytics' && 'Expert in extracting insights from complex datasets and creating data-driven solutions.'}
                              {selectedCategory === 'Software Development' && 'Skilled in building robust and scalable software applications across multiple platforms.'}
                              {selectedCategory === 'Web Development' && 'Proficient in creating responsive and interactive web applications with modern frameworks.'}
                              {selectedCategory === 'Embedded & Hardware' && 'Experience in developing low-level systems and working with hardware components.'}
                              {selectedCategory === 'Cloud & DevOps' && 'Knowledgeable in cloud infrastructure and CI/CD pipelines for efficient deployments.'}
                              {selectedCategory === 'Research & Innovation' && 'Passionate about exploring new technologies and pushing the boundaries of what\'s possible.'}
                              {selectedCategory === 'Entrepreneurship' && 'Experience in building and scaling startups from the ground up.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          

          

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Skills;