import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial 
        color="#5654ff"
        wireframe
        emissive="#5654ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const Scene = () => {
  const { viewport } = useThree();
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AnimatedSphere />
      <Stars 
        radius={viewport.width * 2} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0}
      />
    </>
  );
};

interface HomeProps {
  registerSection: (element: HTMLElement | null) => void;
}

const Home = ({ registerSection }: HomeProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['TECH ENTHUSIAST', 'SOFTWARE DEVELOPER', 'HARDWARE HOBBYIST', 'MACHINE LEARNING ENTHUSIAST'];
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  useEffect(() => {
    registerSection(sectionRef.current);
  }, [registerSection]);
  
  useEffect(() => {
    if (currentWordIndex >= words.length) {
      setCurrentWordIndex(0);
      return;
    }
    
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex <= currentWord.length) {
        setCurrentText(currentWord.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
        setTypingSpeed(150);
      } else if (isDeleting && currentIndex >= 0) {
        setCurrentText(currentWord.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
        setTypingSpeed(100);
      } else if (isDeleting) {
        setIsDeleting(false);
        setCurrentWordIndex(prev => (prev + 1) % words.length);
        setTypingSpeed(500);
      } else {
        setIsDeleting(true);
        setTypingSpeed(2000);
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentWordIndex, words]);
  
  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="canvas-container">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-6 z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2 
            className="text-lg md:text-xl text-white/70 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            CREATIVE DEVELOPER
          </motion.h2>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="gradient-text text-5xl md:text-7xl lg:text-8xl">Dinesh Kumar</span>
            <br />
            <span className="text-white text-3xl md:text-5xl lg:text-6xl">{currentText}</span>
            <span className="animate-pulse text-white text-3xl md:text-5xl lg:text-6xl">|</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Bringing ideas to life through code, design, and 3D animations.
            Specializing in immersive web experiences and interactive applications.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a href="#contact" className="button button-primary w-full sm:w-auto">
              Get in Touch
            </a>
            <a href="/my-work" className="button button-outline w-full sm:w-auto">
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="float-animation">
          <svg width="24" height="38" viewBox="0 0 24 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="36" rx="11" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
            <circle className="animate-bounce" cx="12" cy="12" r="4" fill="white" fillOpacity="0.5"/>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;