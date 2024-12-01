'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false,
});

interface CursorWrapperProps {
  children?: React.ReactNode;
}

const CursorWrapper: React.FC<CursorWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Add no-cursor class to html element
    document.documentElement.classList.add('no-cursor');
    
    return () => {
      // Remove no-cursor class on cleanup
      document.documentElement.classList.remove('no-cursor');
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
        <CustomCursor />
      </div>
      {children}
    </>
  );
};

export default CursorWrapper;
