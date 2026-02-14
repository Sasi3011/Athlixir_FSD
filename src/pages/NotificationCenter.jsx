import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../context/NotificationContext';
import {
    Bell,
    CheckCheck,
    Trash2,
    ArrowLeft,
    MessageSquare,
    Award,
    Briefcase,
    Calendar,
    AlertCircle,
    Heart
} from 'lucide-react';

const NotificationCenter = () => {
    const navigate = useNavigate();
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification
    } = useNotifications();

    const getIcon = (type) => {
        switch (type) {
            case 'message':
                return <MessageSquare size={20} />;
            case 'verification':
                return <Award size={20} />;
            case 'opportunity':
                return <Briefcase size={20} />;
            case 'event':
                return <Calendar size={20} />;
            case 'injury':
                return <AlertCircle size={20} />;
            case 'funding':
                return <Heart size={20} />;
            default:
                return <Bell size={20} />;
        }
    };

    const getColorClass = (color) => {
        const colors = {
            blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            green: 'bg-green-500/10 text-green-500 border-green-500/20',
            purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
            orange: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            red: 'bg-red-500/10 text-red-500 border-red-500/20',
            yellow: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
        };
        return colors[color] || colors.blue;
    };

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const diff = now - new Date(timestamp);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return new Date(timestamp).toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-4xl font-black text-white">Notifications</h1>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-primary/50 transition-all"
                            >
                                <CheckCheck size={16} />
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-gray-400">
                            {unreadCount > 0 ? (
                                <>
                                    You have <span className="text-primary font-bold">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
                                </>
                            ) : (
                                'You\'re all caught up!'
                            )}
                        </p>
                    </div>
                </div>

                {/* Notifications List */}
                {notifications.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="text-gray-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No notifications yet</h3>
                        <p className="text-gray-400">When you get notifications, they'll show up here</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {notifications.map((notification) => (
                                <motion.div
                                    key={notification.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className={`
                    bg-white/5 border rounded-2xl p-5 transition-all cursor-pointer
                    ${notification.read
                                            ? 'border-white/5 hover:border-white/10'
                                            : 'border-primary/20 bg-primary/5 hover:border-primary/30'
                                        }
                  `}
                                    onClick={() => !notification.read && markAsRead(notification.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`
                      p-3 rounded-xl border flex items-center justify-center shrink-0
                      ${getColorClass(notification.color)}
                    `}>
                                            {getIcon(notification.type)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-1">
                                                <h3 className="font-bold text-white">{notification.title}</h3>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    {!notification.read && (
                                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteNotification(notification.id);
                                                        }}
                                                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-2">{notification.message}</p>
                                            <span className="text-xs text-gray-500 font-medium">
                                                {formatTimestamp(notification.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationCenter;
