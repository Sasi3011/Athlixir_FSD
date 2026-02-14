import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

/**
 * SuccessAnimation Component
 * Animated success/error feedback for user actions
 */
const SuccessAnimation = ({
    type = 'success', // 'success' | 'error' | 'warning' | 'info'
    message,
    onClose,
    autoClose = true,
    duration = 3000
}) => {
    const configs = {
        success: {
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            text: 'text-green-500',
            icon: Check
        },
        error: {
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            text: 'text-red-500',
            icon: X
        },
        warning: {
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20',
            text: 'text-yellow-500',
            icon: '⚠️'
        },
        info: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            text: 'text-blue-500',
            icon: 'ℹ️'
        }
    };

    const config = configs[type];
    const Icon = config.icon;

    // Auto close after duration
    if (autoClose && onClose) {
        setTimeout(() => {
            onClose();
        }, duration);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`
        ${config.bg} ${config.border} border rounded-2xl p-4 
        flex items-center gap-3 shadow-2xl backdrop-blur-sm
      `}
        >
            {/* Animated Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 15,
                    delay: 0.1
                }}
                className={`
          w-10 h-10 ${config.bg} border ${config.border} rounded-xl 
          flex items-center justify-center shrink-0
        `}
            >
                {typeof Icon === 'string' ? (
                    <span className="text-xl">{Icon}</span>
                ) : (
                    <Icon className={config.text} size={20} />
                )}
            </motion.div>

            {/* Message */}
            <div className="flex-1">
                <p className={`font-bold ${config.text}`}>{message}</p>
            </div>

            {/* Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className={`
            p-1.5 hover:bg-white/10 rounded-lg transition-all
            ${config.text} opacity-60 hover:opacity-100
          `}
                >
                    <X size={16} />
                </button>
            )}

            {/* Progress Bar */}
            {autoClose && (
                <motion.div
                    className={`absolute bottom-0 left-0 h-1 ${config.text.replace('text-', 'bg-')} rounded-b-2xl`}
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: duration / 1000, ease: 'linear' }}
                />
            )}
        </motion.div>
    );
};

/**
 * Toast Container Component
 * Container for displaying multiple toasts
 */
export const ToastContainer = ({ toasts = [], onRemove }) => {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3 max-w-md">
            {toasts.map((toast) => (
                <SuccessAnimation
                    key={toast.id}
                    type={toast.type}
                    message={toast.message}
                    onClose={() => onRemove(toast.id)}
                    autoClose={toast.autoClose}
                    duration={toast.duration}
                />
            ))}
        </div>
    );
};

export default SuccessAnimation;
