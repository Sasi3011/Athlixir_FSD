import { motion } from 'framer-motion';

/**
 * EmptyState Component
 * Displays friendly empty states with icon, title, description, and optional action
 */
const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    className = ''
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-16 px-6 ${className}`}
        >
            {Icon && (
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-gray-500" size={32} />
                </div>
            )}

            <h3 className="text-2xl font-black text-white mb-3">{title}</h3>

            {description && (
                <p className="text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
                    {description}
                </p>
            )}

            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all inline-flex items-center gap-2"
                >
                    {actionLabel}
                </button>
            )}
        </motion.div>
    );
};

export default EmptyState;
