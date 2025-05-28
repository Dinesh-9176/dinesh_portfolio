import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileNavProps {
  activeSection: string;
  onNavigation: (sectionId: string) => void;
  onClose: () => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'startup-journey', label: 'Startup Journey' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const MobileNav = ({ activeSection, onNavigation, onClose }: MobileNavProps) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-stone-950 z-50 flex flex-col"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="p-6 flex justify-between items-center border-b border-white/10">
        <h2 className="text-xl font-bold gradient-text">PORTFOLIO</h2>
        <button 
          onClick={onClose}
          className="p-2 text-white"
          aria-label="Close Menu"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 flex flex-col justify-center">
        <ul className="space-y-6 px-6">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <a
                href={`#${item.id}`}
                className={`text-2xl font-medium block py-3 ${
                  activeSection === item.id 
                    ? 'gradient-text' 
                    : 'text-white/70'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigation(item.id);
                }}
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-white/10">
        <p className="text-white/50 text-sm">© 2025 Portfolio</p>
      </div>
    </motion.div>
  );
};

export default MobileNav;