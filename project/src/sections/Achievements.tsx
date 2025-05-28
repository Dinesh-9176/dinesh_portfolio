import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Award, Medal, Trophy, Star, X } from 'lucide-react';

interface AchievementsProps {
  registerSection: (element: HTMLElement | null) => void;
}

interface AchievementType {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
  longDescription: string;
  year: string;
  image: string;
  tags: string[];
}

const achievements: AchievementType[] = [
  {
    id: 1,
    icon: <Trophy size={24} />,
    title: "Best Technical Entrepreneur Award",
    description: "Awarded in association day by CSE Department for outstanding technical entrepreneurship.",
    longDescription: "Recognized for demonstrating exceptional technical entrepreneurship skills and innovative thinking in the field of computer science during the department's annual association day.",
    year: "2025",
    image: "/ach/technical_ent.jpg",
    tags: ["Entrepreneurship", "Technical Excellence", "Leadership"]
  },
  {
    id: 2,
    icon: <Award size={24} />,
    title: "Chairperson Memento - Space 4.0",
    description: "Recognized for contributions to the Space 4.0 national seminar organized by ACS Space Technology Centre.",
    longDescription: "Honored with the Chairperson's memento for significant contributions to the success of the Space 4.0 national seminar, which brought together experts in space technology and innovation.",
    year: "2025",
    image: "/ach/chair.jpg",
    tags: ["Space Technology", "Leadership", "Event Management"]
  },
  {
    id: 3,
    icon: <Medal size={24} />,
    title: "Organizing Committee Award - Space 4.0",
    description: "Recognized for outstanding contribution in organizing the Space 4.0 event by ACS Space Technology Centre.",
    longDescription: "Awarded for exceptional organizational skills and dedication in coordinating the Space 4.0 event, which facilitated knowledge sharing and collaboration in space technology.",
    year: "2025",
    image: "/ach/space_org.jpg",
    tags: ["Event Management", "Teamwork", "Space Technology"]
  },
  {
    id: 4,
    icon: <Star size={24} />,
    title: "Student Lecture & Organizing Award",
    description: "Delivered a lecture on 'Data Preparation and Preprocessing in ML' and received an organizing award.",
    longDescription: "Conducted an informative session on crucial aspects of machine learning data preparation and was recognized for outstanding contribution to organizing the event.",
    year: "2025",
    image: "/ach/stu_lec.jpg",
    tags: ["Machine Learning", "Public Speaking", "Education"]
  },
  {
    id: 5,
    icon: <Trophy size={24} />,
    title: "Software Hackathon - 3rd Prize",
    description: "Won 3rd prize in Bengaluru (team of three) with a cash prize of 10K at Presidency University.",
    longDescription: "Competed against numerous talented teams to secure 3rd place in a challenging software hackathon, showcasing problem-solving skills and technical expertise in a team setting.",
    year: "2025",
    image: "/ach/soft_hac.jpg",
    tags: ["Hackathon", "Teamwork", "Problem Solving"]
  },
  {
    id: 6,
    icon: <Award size={24} />,
    title: "NCICT National Conference - Best Paper",
    description: "1st prize and Best Paper Award for 'PII Detection Using Named Entity Recognition (NER): A Deep Learning Approach'.",
    longDescription: "Presented innovative research on privacy protection through advanced NLP techniques, earning top honors at the national conference for the paper's technical depth and practical applications.",
    year: "2025",
    image: "/ach/ncict.jpg",
    tags: ["Research", "NLP", "Deep Learning", "Privacy"]
  },
  {
    id: 7,
    icon: <Medal size={24} />,
    title: "Paper Presentation - 1st Prize",
    description: "1st prize at Meenakshi College of Engineering for 'A Simplified FPGA Development Platform with an Integrated IDE'.",
    longDescription: "Awarded first place for presenting an innovative approach to FPGA development that simplifies the learning curve for VLSI education through an integrated development environment.",
    year: "2025",
    image: "/ach/2-hack.jpg",
    tags: ["FPGA", "VLSI", "Research", "Education"]
  },
  {
    id: 8,
    icon: <Trophy size={24} />,
    title: "2-Hour Hackathon - 2nd Prize",
    description: "Won 2nd prize in an intensive 2-hour hackathon organized by Alpha College of Engineering.",
    longDescription: "Demonstrated rapid problem-solving and coding skills to develop a working solution within the tight timeframe, earning second place among competitive participants.",
    year: "2025",
    image: "/ach/2nd_place.jpg",
    tags: ["Hackathon", "Quick Thinking", "Problem Solving"]
  },
  {
    id: 9,
    icon: <Star size={24} />,
    title: "1-Minute Mic - 1st Prize",
    description: "Won 1st prize in the One Minute Mic event (idea pitch) at Dr. MGR Educational and Research Institute.",
    longDescription: "Effectively communicated an innovative idea within the challenging one-minute format, impressing judges with clarity, creativity, and potential impact.",
    year: "2025",
    image: "/ach/one_min.jpg",
    tags: ["Public Speaking", "Pitching", "Innovation"]
  },
  {
    id: 10,
    icon: <Award size={24} />,
    title: "Intel Hackathon - Top 25 Teams",
    description: "Ranked among Top 25 teams (300+ teams, 1000+ participants) with innovative AI solutions.",
    longDescription: "Competed against elite participants to develop AI-driven solutions for real-world challenges, earning recognition in the top 2% of all competing teams.",
    year: "2024",
    image: "/ach/intel.jpg",
    tags: ["AI", "Hackathon", "Innovation"]
  },
  {
    id: 12,
    icon: <Trophy size={24} />,
    title: "Incubatee at Dr. Abdul Kalam COIE",
    description: "Received two lakhs seed funding for an innovative project at the incubation center.",
    longDescription: "Selected as an incubatee at the prestigious Dr. Abdul Kalam Centre of Innovation and Entrepreneurship, receiving seed funding to develop and scale an innovative technology solution.",
    year: "2023-present",
    image: "/ach/incubate.jpg",
    tags: ["Entrepreneurship", "Innovation", "Startup"]
  },
  {
    id: 13,
    icon: <Award size={24} />,
    title: "ACS Space Technology Center - Member",
    description: "Contributing to advancements in space and aviation-related technology solutions.",
    longDescription: "Active member of the ACS Space Technology Center, collaborating on cutting-edge projects and research in space and aviation technology, contributing to innovative solutions in the field.",
    year: "2024-Present",
    image: "/ach/dk.jpg",
    tags: ["Space Technology", "Research", "Innovation"]
  },
  {
    id: 14,
    icon: <Star size={24} />,
    title: "PALS Workshop at IIT Madras",
    description: "Participated in a 3-day residential workshop at IIT Madras on engineering and innovation.",
    longDescription: "Gained valuable insights during the PALS Residential Student Workshop at IIT Madras, including sessions on 'Thinking Like an Engineer' by Prof. M.S. Sivakumar, research-driven startups, and innovation. Successfully presented and received feedback on a project during the evaluation session.",
    year: "2025",
    image: "/ach/pals.jpg",
    tags: ["Workshop", "IIT Madras", "Learning"]
  }
];

const Achievements = ({ registerSection }: AchievementsProps) => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    registerSection(sectionRef.current);
  }, [registerSection]);

  const openModal = (achievement: AchievementType) => {
    setSelectedAchievement(achievement);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedAchievement(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal when clicking outside content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  
  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className="section-padding bg-stone-900"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-12">Achievements</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:translate-x-[-0.5px]"></div>
            
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className={`relative mb-12 md:mb-24 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0 md:mr-auto' : 'md:pl-12 md:ml-auto md:mr-0'
                } w-full md:w-[calc(50%-24px)]`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-8px] md:left-auto md:right-[-32px] top-0 w-4 h-4 rounded-full bg-[rgb(var(--primary))] z-10">
                  <div className="absolute inset-0 rounded-full bg-[rgb(var(--primary))] animate-ping opacity-50"></div>
                </div>
                
                <div className="pl-8 md:pl-0">
                  <div 
                    className="bg-stone-950/50 rounded-lg p-6 border border-white/5 hover:border-white/10 transition-all transform hover:translate-y-[-4px] cursor-pointer group"
                    onClick={() => openModal(achievement)}
                  >
                    <div className={`flex items-center gap-4 mb-4 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.2)] to-[rgba(var(--secondary),0.2)] flex items-center justify-center text-[rgb(var(--primary))]">
                        {achievement.icon}
                      </div>
                      <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                        <h4 className="text-xl font-medium">{achievement.title}</h4>
                        <span className="text-white/50">{achievement.year}</span>
                      </div>
                    </div>
                    <p className="text-white/70">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 p-8 rounded-lg bg-gradient-to-br from-[rgba(var(--primary),0.1)] to-[rgba(var(--secondary),0.1)] border border-white/5"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">Skills Recognition</h3>
            <p className="text-lg text-white/80 mb-6">
              Beyond formal achievements, I've received recognition for my expertise in:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["WebGL", "3D Visualization", "Interactive Animations", "UI/UX Design", "Performance Optimization", "Creative Coding"].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-[rgb(var(--primary))]"></div>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Achievement Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-stone-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-white/10"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Achievement Image */}
              <div className="h-64 md:h-80 w-full relative overflow-hidden rounded-t-xl">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${selectedAchievement.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#000000'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.2)] to-[rgba(var(--secondary),0.2)] flex items-center justify-center text-[rgb(var(--primary))]">
                      {selectedAchievement.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedAchievement.title}</h3>
                      <span className="text-white/70">{selectedAchievement.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Content */}
              <div className="p-6 md:p-8">
                <p className="text-lg text-white/80 mb-6">{selectedAchievement.longDescription}</p>
                
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAchievement.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-[rgb(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;