import { useEffect, useState } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  useEffect(() => {
    // Check if device has coarse pointer (touch screen)
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    
    // Only show custom cursor on non-touch devices
    if (hasCoarsePointer) return;
    
    setHidden(false);
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    const linkElements = document.querySelectorAll('a, button');
    linkElements.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      linkElements.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);
  
  if (hidden) return null;
  
  return (
    <>
      <div
        className={`cursor cursor-dot ${clicked ? 'bg-white' : 'bg-white'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: clicked ? 'scale(0.5)' : 'scale(1)',
        }}
      />
      <div
        className={`cursor cursor-outline ${linkHovered ? 'cursor-hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${clicked ? 'scale(0.8)' : 'scale(1)'}`,
        }}
      />
    </>
  );
};

export default Cursor;