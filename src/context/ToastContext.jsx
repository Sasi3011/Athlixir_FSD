import { createContext, useContext, useState } from 'react';
import { ToastContainer } from '../components/SuccessAnimation';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = ({ type = 'success', message, autoClose = true, duration = 3000 }) => {
        const id = Date.now();
        const newToast = { id, type, message, autoClose, duration };

        setToasts(prev => [...prev, newToast]);

        // Auto remove if autoClose is true
        if (autoClose) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Convenient methods
    const success = (message, options = {}) => addToast({ type: 'success', message, ...options });
    const error = (message, options = {}) => addToast({ type: 'error', message, ...options });
    const warning = (message, options = {}) => addToast({ type: 'warning', message, ...options });
    const info = (message, options = {}) => addToast({ type: 'info', message, ...options });

    const value = {
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};
