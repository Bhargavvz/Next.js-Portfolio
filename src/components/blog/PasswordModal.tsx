'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordModal = ({ isOpen, onClose, onSubmit }: PasswordModalProps) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (isOpen) {
      setDigits(['', '', '', '', '', '']);
      setIsError(false);
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setIsError(false);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Submit if all digits are filled
    if (index === 5 && value) {
      const password = newDigits.join('');
      onSubmit(password);
      // Reset on error
      if (password !== "070605") {
        setIsError(true);
        setTimeout(() => {
          setDigits(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index]) {
      e.preventDefault();
      if (index > 0) {
        // Move to previous input on backspace if current input is empty
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return; // Only allow digits

    const pastedDigits = pastedData.slice(0, 6).split('');
    const newDigits = [...digits];
    pastedDigits.forEach((digit, index) => {
      if (index < 6) newDigits[index] = digit;
    });
    setDigits(newDigits);
    setIsError(false);

    // Focus last filled input or first empty input
    const lastIndex = Math.min(pastedDigits.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();

    if (pastedDigits.length === 6) {
      const password = pastedDigits.join('');
      onSubmit(password);
      if (password !== "070605") {
        setIsError(true);
        setTimeout(() => {
          setDigits(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md p-8 bg-black/90 border border-purple-500/20 rounded-2xl shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-purple-500/20 rounded-full mb-4">
                <Lock className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Enter Vault Code</h2>
              <p className="text-gray-400">Enter the 6-digit code to access the vault</p>
            </div>

            <div className="flex justify-center gap-3 mb-8">
              {digits.map((digit, index) => (
                <div
                  key={index}
                  className={`relative ${isError ? 'animate-shake' : ''}`}
                >
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="number"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleDigitChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-16 text-2xl text-center bg-black/50 border-2 ${
                      isError ? 'border-red-500' : digit ? 'border-purple-500' : 'border-purple-500/20'
                    } rounded-lg focus:border-purple-500 focus:outline-none text-white transition-colors`}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-purple-500 rounded-full transform origin-left transition-transform duration-300 ${
                    digit ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </div>
              ))}
            </div>

            {isError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-center"
              >
                Incorrect code. Please try again.
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;
