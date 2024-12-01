"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalWindow = ({ isOpen, onClose, title, children }: ModalWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      setPosition({
        x: window.innerWidth / 4,
        y: window.innerHeight / 4,
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: position.x,
            y: position.y,
            width: isMaximized ? '100vw' : '50vw',
            height: isMaximized ? '100vh' : '50vh',
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          drag={!isMaximized}
          dragConstraints={{
            top: 0,
            left: 0,
            right: window.innerWidth - (isMaximized ? window.innerWidth : 600),
            bottom: window.innerHeight - (isMaximized ? window.innerHeight : 400),
          }}
          onDragEnd={(_, info) => {
            setPosition({
              x: position.x + info.offset.x,
              y: position.y + info.offset.y,
            });
          }}
          className={cn(
            'fixed z-50 overflow-hidden rounded-lg bg-gray-900/95 shadow-xl backdrop-blur-lg',
            isMinimized ? 'h-12 w-64' : '',
            isMaximized ? 'h-screen w-screen' : ''
          )}
        >
          {/* Window Title Bar */}
          <div className="flex h-12 items-center justify-between border-b border-gray-800 px-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600"
                />
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600"
                />
              </div>
              <span className="ml-4 text-sm text-gray-300">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-gray-300"
              >
                <FiMinus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-gray-400 hover:text-gray-300"
              >
                {isMaximized ? (
                  <FiMinimize2 className="h-4 w-4" />
                ) : (
                  <FiMaximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-300"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Window Content */}
          {!isMinimized && (
            <div className="h-full overflow-auto p-6">
              {children}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalWindow;
