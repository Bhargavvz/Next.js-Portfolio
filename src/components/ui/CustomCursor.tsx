'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface Trail {
  x: number;
  y: number;
  opacity: number;
  rotation: number;
  scale: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  const cursorControls = useAnimation();
  const orbitControls = useAnimation();
  const lastTimeRef = useRef(Date.now());
  const lastPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      setRotation(prev => prev + 1);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = Math.max(currentTime - lastTimeRef.current, 1);
      
      const newVelocity = {
        x: (e.clientX - lastPositionRef.current.x) / deltaTime * 16,
        y: (e.clientY - lastPositionRef.current.y) / deltaTime * 16
      };
      
      setVelocity(newVelocity);
      setPosition({ x: e.clientX, y: e.clientY });
      
      const speed = Math.sqrt(newVelocity.x * newVelocity.x + newVelocity.y * newVelocity.y);
      
      if (speed > 0.5) {
        const newTrails = Array.from({ length: 4 }).map((_, i) => ({
          x: position.x + (newVelocity.x * i * -1.5),
          y: position.y + (newVelocity.y * i * -1.5),
          opacity: 1 - (i * 0.2),
          rotation: Math.atan2(newVelocity.y, newVelocity.x) * (180 / Math.PI),
          scale: 1 - (i * 0.15)
        }));
        
        setTrails(prev => [...newTrails, ...prev].slice(0, 6));
      }
      
      lastTimeRef.current = currentTime;
      lastPositionRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Animate orbit speed based on cursor velocity
      const orbitSpeed = Math.min(Math.max(speed * 0.5, 2), 8);
      orbitControls.start({
        rotate: 360,
        transition: { duration: orbitSpeed, ease: "linear", repeat: Infinity }
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      cursorControls.start({
        scale: 0.8,
        transition: { duration: 0.2, type: "spring", stiffness: 300, damping: 15 }
      });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      cursorControls.start({
        scale: isHovering ? 1.5 : 1,
        transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 10 }
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.matches('a, button, [role="button"], [data-cursor-pointer]');
      setIsHovering(isClickable);
      
      if (isClickable) {
        cursorControls.start({
          scale: 1.5,
          transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 10 }
        });
      } else {
        cursorControls.start({
          scale: 1,
          transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 10 }
        });
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [position, isHovering, cursorControls, orbitControls]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {trails.map((trail, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 pointer-events-none"
              initial={{ opacity: trail.opacity, scale: trail.scale }}
              animate={{ opacity: 0, scale: trail.scale * 0.8 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                transform: `translate(${trail.x - 12}px, ${trail.y - 12}px) rotate(${trail.rotation}deg)`,
              }}
            >
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                    className="fill-purple-500/20"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none"
            animate={{
              x: position.x - 12,
              y: position.y - 12,
            }}
            transition={{
              type: "spring",
              stiffness: 1000,
              damping: 50,
              mass: 0.2,
              restSpeed: 0.001
            }}
          >
            <motion.div
              animate={cursorControls}
              className="relative w-6 h-6"
            >
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                <defs>
                  <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf">
                      <animate
                        attributeName="stop-color"
                        values="#2dd4bf; #0ea5e9; #8b5cf6; #2dd4bf"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#0ea5e9">
                      <animate
                        attributeName="stop-color"
                        values="#0ea5e9; #8b5cf6; #2dd4bf; #0ea5e9"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#8b5cf6">
                      <animate
                        attributeName="stop-color"
                        values="#8b5cf6; #2dd4bf; #0ea5e9; #8b5cf6"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                  <filter id="star-glow">
                    <feGaussianBlur stdDeviation="1" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                  fill="url(#star-gradient)"
                  filter="url(#star-glow)"
                />
              </svg>
              
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full opacity-30">
                  <path
                    d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                    className="fill-white"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
