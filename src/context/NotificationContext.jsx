import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Load notifications on mount
    useEffect(() => {
        // Simulate loading notifications
        // TODO: Replace with actual API call
        const mockNotifications = [
            {
                id: 1,
                type: 'verification',
                title: 'Profile Verified',
                message: 'Your athlete profile has been successfully verified!',
                timestamp: new Date(Date.now() - 3600000),
                read: false,
                icon: '✓',
                color: 'blue'
            },
            {
                id: 2,
                type: 'opportunity',
                title: 'New Opportunity',
                message: 'A new trial opportunity has been posted in your area.',
                timestamp: new Date(Date.now() - 7200000),
                read: false,
                icon: '💼',
                color: 'green'
            },
            {
                id: 3,
                type: 'message',
                title: 'New Message',
                message: 'You have received a message from Coach Sharma.',
                timestamp: new Date(Date.now() - 86400000),
                read: true,
                icon: '💬',
                color: 'purple'
            },
            {
                id: 4,
                type: 'event',
                title: 'Event Reminder',
                message: 'Your registered event "State Championship" starts tomorrow.',
                timestamp: new Date(Date.now() - 172800000),
                read: false,
                icon: '📅',
                color: 'orange'
            }
        ];

        setNotifications(mockNotifications);
        updateUnreadCount(mockNotifications);
    }, []);

    const updateUnreadCount = (notifs) => {
        const count = notifs.filter(n => !n.read).length;
        setUnreadCount(count);
    };

    const markAsRead = (notificationId) => {
        setNotifications(prev => {
            const updated = prev.map(n =>
                n.id === notificationId ? { ...n, read: true } : n
            );
            updateUnreadCount(updated);
            return updated;
        });
    };

    const markAllAsRead = () => {
        setNotifications(prev => {
            const updated = prev.map(n => ({ ...n, read: true }));
            updateUnreadCount(updated);
            return updated;
        });
    };

    const deleteNotification = (notificationId) => {
        setNotifications(prev => {
            const updated = prev.filter(n => n.id !== notificationId);
            updateUnreadCount(updated);
            return updated;
        });
    };

    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            read: false,
            timestamp: new Date(),
            ...notification
        };
        setNotifications(prev => {
            const updated = [newNotification, ...prev];
            updateUnreadCount(updated);
            return updated;
        });
    };

    const value = {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
