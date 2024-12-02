'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import Toast from '@/components/ui/Toast';
import { ToastType } from '@/components/ui/Toast';

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback((message: string, type: ToastType) => {
    setMessage(message);
    setType(type);
    setIsVisible(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={message}
        type={type}
        isVisible={isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}
