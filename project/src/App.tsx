import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Loader from './components/Loader';
import Home from './sections/Home';
import About from './sections/About';
import Testimonials from './sections/Testimonials';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import StartupJourney from './sections/StartupJourney';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Cursor from './components/Cursor';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState('home');
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = 'home';

      Object.entries(sectionsRef.current).forEach(([id, element]) => {
        if (!element) return;
        
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          currentSection = id;
        }
      });

      setActiveSectionId(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Register sections
  const registerSection = (id: string, element: HTMLElement | null) => {
    if (element) {
      sectionsRef.current[id] = element;
    }
  };

  // Handle navigation
  const handleNavigation = (sectionId: string) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileNavOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative bg-stone-950 text-white">
      <Cursor />
      <Navbar 
        activeSection={activeSectionId} 
        onNavigation={handleNavigation} 
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
      />
      
      <AnimatePresence>
        {isMobileNavOpen && (
          <MobileNav 
            activeSection={activeSectionId}
            onNavigation={handleNavigation}
            onClose={() => setIsMobileNavOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <main>
        <Home registerSection={(el) => registerSection('home', el)} />
        <About registerSection={(el) => registerSection('about', el)} />
        <Testimonials registerSection={(el) => registerSection('testimonials', el)} />
        <Skills registerSection={(el) => registerSection('skills', el)} />
        <Achievements registerSection={(el) => registerSection('achievements', el)} />
        <StartupJourney registerSection={(el) => registerSection('startup-journey', el)} />
        <Experience registerSection={(el) => registerSection('experience', el)} />
        <Contact registerSection={(el) => registerSection('contact', el)} />
      </main>
    </div>
  )
};

export default App;