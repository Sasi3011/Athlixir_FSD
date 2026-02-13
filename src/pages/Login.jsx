import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Logo from "../components/Logo";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/athlete/dashboard");
        }
    }, [user, navigate]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("Logged in successfully");
            navigate("/athlete/dashboard"); // Redirect to athlete portal after login
        } catch (err) {
            console.error(err);
            setError("Invalid email or access key. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Background Image - Matching Hero Section */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1305&auto=format&fit=crop"
                    alt="Athlete Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

            {/* Back to Home Link */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-10 left-6 lg:left-12 z-20"
            >
                <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    <ArrowRight className="rotate-180 text-primary" size={18} />
                    Back to Home
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[480px] px-6 relative z-10"
            >
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <Link to="/">
                        <Logo iconOnly={true} className="mb-4 scale-125" />
                    </Link>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Access Portal</h1>
                    <p className="text-gray-400 text-center text-[10px] font-black uppercase tracking-[0.3em]">
                        Secured Athlixir <span className="text-primary">Data Gate</span>
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Athlete ID / Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="name@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-lg"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Key Access</label>
                                <Link to="/reset-key" className="text-[10px] font-black uppercase tracking-wider text-primary hover:text-orange-400 transition-colors">Reset Key?</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-lg"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.5)] flex items-center justify-center gap-3 group mt-4 uppercase tracking-widest text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Verify Identity
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-10 text-center text-gray-500 text-sm font-medium tracking-wide">
                    New Athlete?{" "}
                    <Link to="/signup" className="text-primary font-black hover:text-orange-400 transition-colors uppercase ml-1">
                        Build Profile
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
