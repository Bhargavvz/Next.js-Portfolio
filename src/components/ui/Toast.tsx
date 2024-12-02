import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    textColor: 'text-green-500',
    iconColor: 'text-green-500',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    textColor: 'text-red-500',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    textColor: 'text-yellow-500',
    iconColor: 'text-yellow-500',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-500',
    iconColor: 'text-blue-500',
  },
};

const Toast = ({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) => {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${config.bgColor} ${config.borderColor} shadow-lg backdrop-blur-sm`}
          >
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
            <p className={`text-sm font-medium ${config.textColor}`}>{message}</p>
            <button
              onClick={onClose}
              className={`ml-2 hover:${config.textColor} transition-colors`}
            >
              <XCircle className="w-4 h-4 opacity-50 hover:opacity-100" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
