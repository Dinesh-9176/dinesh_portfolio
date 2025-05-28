import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  onNavigation: (sectionId: string) => void;
  onToggleMobileNav: () => void;
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

const Navbar = ({ activeSection, onNavigation, onToggleMobileNav }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${
        scrolled ? 'bg-stone-950/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-xl font-bold gradient-text" 
          onClick={(e) => {
            e.preventDefault();
            onNavigation('home');
          }}
        >
          PORTFOLIO
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative px-1 py-2 transition-colors duration-300 ${
                    activeSection === item.id 
                      ? 'gradient-text font-medium' 
                      : 'text-white/70 hover:text-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigation(item.id);
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={onToggleMobileNav}
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;