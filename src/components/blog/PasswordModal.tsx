'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Loader2 } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordModal = ({ isOpen, onClose, onSubmit }: PasswordModalProps) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (isOpen) {
      setDigits(['', '', '', '', '', '']);
      setIsError(false);
      setIsLoading(false);
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
      setIsLoading(true);
      onSubmit(password);
      // Reset on error
      if (password !== "070605") {
        setIsError(true);
        setIsLoading(false);
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
      setIsLoading(true);
      onSubmit(password);
      if (password !== "070605") {
        setIsError(true);
        setIsLoading(false);
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md p-8 bg-gradient-to-br from-gray-900/95 to-black border border-purple-500/30 rounded-2xl shadow-[0_0_50px_0_rgba(168,85,247,0.15)] backdrop-blur-xl"
          >
            {/* Close button with hover effect */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-block p-4 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl mb-6 ring-1 ring-purple-500/30"
              >
                <Lock className="w-8 h-8 text-purple-400" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-3"
              >
                Enter Vault Code
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400"
              >
                Enter the 6-digit code to access the vault
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-3 mb-8"
            >
              {digits.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.4 }}
                  className={`relative ${isError ? 'animate-shake' : ''}`}
                >
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="password"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleDigitChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-16 text-2xl font-mono text-center bg-black/50 border-2 ${
                      isError ? 'border-red-500 shadow-[0_0_10px_0_rgba(239,68,68,0.5)]' : 
                      digit ? 'border-purple-500 shadow-[0_0_10px_0_rgba(168,85,247,0.3)]' : 
                      'border-purple-500/20'
                    } rounded-xl focus:border-purple-500 focus:shadow-[0_0_15px_0_rgba(168,85,247,0.5)] focus:outline-none text-white transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    disabled={isLoading}
                  />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: digit ? 1 : 0 }}
                    className={`absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transform origin-left`}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-1 mb-6">
              {digits.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.6 }}
                  className={`w-8 h-1 rounded-full transition-colors duration-300 ${
                    digit ? 'bg-purple-500' : 'bg-purple-500/20'
                  }`}
                />
              ))}
            </div>

            {/* Error message with animation */}
            <AnimatePresence mode="wait">
              {isError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-center font-medium"
                >
                  Incorrect code. Please try again.
                </motion.p>
              )}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-purple-400"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;
