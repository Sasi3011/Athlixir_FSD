import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { motion } from 'framer-motion';

/**
 * NotificationBell Component
 * Displays notification icon with unread count badge
 * Used in portal layouts
 */
const NotificationBell = () => {
    const navigate = useNavigate();
    const { unreadCount } = useNotifications();

    return (
        <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-white/10 rounded-xl transition-all group"
            title="Notifications"
        >
            <Bell className="text-gray-400 group-hover:text-white transition-colors" size={20} />

            {unreadCount > 0 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-primary rounded-full flex items-center justify-center"
                >
                    <span className="text-[10px] font-black text-black px-1">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                </motion.div>
            )}
        </button>
    );
};

export default NotificationBell;
