import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';

/**
 * NotFound Component
 * Custom 404 error page with navigation options
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        {/* Large 404 Text */}
                        <h1 className="text-[200px] md:text-[280px] font-black leading-none bg-gradient-to-br from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
                            404
                        </h1>

                        {/* Floating Icon */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="w-24 h-24 bg-white/5 border-2 border-primary/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                                <AlertTriangle className="text-primary" size={48} />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Page Not Found
                    </h2>

                    <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all group"
                        >
                            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                            Go Back
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all group"
                        >
                            <Home className="group-hover:scale-110 transition-transform" size={20} />
                            Home Page
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-gray-500 text-sm mb-4">You might find these helpful:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <QuickLink onClick={() => navigate('/login')} label="Login" />
                            <QuickLink onClick={() => navigate('/portal')} label="Portal" />
                            <QuickLink onClick={() => navigate('/athlete/public/1')} label="Explore Athletes" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const QuickLink = ({ onClick, label }) => (
    <button
        onClick={onClick}
        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-primary/50 transition-all text-sm font-medium"
    >
        {label}
    </button>
);

export default NotFound;
