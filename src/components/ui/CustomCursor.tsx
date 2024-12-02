'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const cursorControls = useAnimation();
  const orbitControls = useAnimation();
  const lastTimeRef = useRef(Date.now());
  const lastPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const rotationRef = useRef(0);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize controls after mount
  useEffect(() => {
    if (!isMounted) return;
    
    cursorControls.set({ scale: 1 });
    orbitControls.set({ scale: 1 });
  }, [cursorControls, orbitControls, isMounted]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateTrails = useCallback((currentPosition: CursorPosition, currentVelocity: { x: number, y: number }) => {
    if (!isVisible || !isMounted) return;

    const speed = Math.sqrt(currentVelocity.x * currentVelocity.x + currentVelocity.y * currentVelocity.y);
    const maxTrails = Math.min(Math.floor(speed / 5), 5);
    
    if (maxTrails > 0) {
      rotationRef.current += 1;
      const newTrails = Array.from({ length: maxTrails }, (_, i) => ({
        x: currentPosition.x,
        y: currentPosition.y,
        opacity: 0.3 - (i * 0.05),
        rotation: rotationRef.current + (i * 15),
        scale: 1 - (i * 0.1)
      }));
      setTrails(newTrails);
    } else {
      setTrails([]);
    }
  }, [isVisible, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const updatePosition = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = Math.max(currentTime - lastTimeRef.current, 1);
      
      const newVelocity = {
        x: (e.clientX - lastPositionRef.current.x) / deltaTime * 16,
        y: (e.clientY - lastPositionRef.current.y) / deltaTime * 16
      };

      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      updateTrails(newPosition, newVelocity);

      lastTimeRef.current = currentTime;
      lastPositionRef.current = newPosition;
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrails([]);
    };

    const handleMouseDown = () => {
      if (!isMounted) return;
      setIsClicking(true);
      if (isMounted) {
        cursorControls.start({
          scale: 0.8,
          transition: { duration: 0.2 }
        }).catch((error) => console.error('Error during animation start:', error));
      }
    };

    const handleMouseUp = () => {
      if (!isMounted) return;
      setIsClicking(false);
      if (isMounted) {
        cursorControls.start({
          scale: isHovering ? 1.5 : 1,
          transition: { duration: 0.2 }
        }).catch((error) => console.error('Error during animation start:', error));
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorControls, isHovering, updateTrails, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverableElement = target.closest('a, button, [role="button"]');
      
      if (isHoverableElement !== null) {
        setIsHovering(true);
        if (isMounted) {
          cursorControls.start({
            scale: 1.5,
            transition: { duration: 0.2 }
          }).catch((error) => console.error('Error during animation start:', error));
        }
      } else {
        setIsHovering(false);
        if (isMounted) {
          cursorControls.start({
            scale: isClicking ? 0.8 : 1,
            transition: { duration: 0.2 }
          }).catch((error) => console.error('Error during animation start:', error));
        }
      }
    };

    document.addEventListener('mouseover', handleElementHover);
    return () => document.removeEventListener('mouseover', handleElementHover);
  }, [cursorControls, isClicking, isMounted]);

  if (isMobile || !isMounted) return null;

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
              initial={{ scale: 1 }}
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
