import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

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
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            text: 'text-amber-500',
            icon: AlertTriangle
        },
        info: {
            bg: 'bg-sky-500/10',
            border: 'border-sky-500/20',
            text: 'text-sky-500',
            icon: Info
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`relative overflow-hidden ${config.bg} ${config.border} border rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg backdrop-blur-sm min-w-[240px] max-w-sm`}
        >
            <div className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${config.bg} ${config.border} border`}>
                <Icon className={config.text} size={16} />
            </div>
            <p className={`flex-1 text-sm font-medium text-white/95`}>{message}</p>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 p-1 text-white/50 hover:text-white/90 rounded transition-colors"
                    aria-label="Close"
                >
                    <X size={14} />
                </button>
            )}
            {autoClose && (
                <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 ${config.text.replace('text-', 'bg-')}`}
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
