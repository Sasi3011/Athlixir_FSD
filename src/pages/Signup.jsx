import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, ShieldCheck, Loader2, Trophy, Users, Target } from "lucide-react";
import Logo from "../components/Logo";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Signup = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/athlete/dashboard");
        }
    }, [user, navigate]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "athlete"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await updateProfile(userCredential.user, {
                displayName: formData.fullName
            });

            // Store role locally for the portal demo
            localStorage.setItem(`role_${userCredential.user.uid}`, formData.role);

            console.log("User created successfully with role:", formData.role);
            navigate("/athlete/dashboard");
        } catch (err) {
            console.error(err);
            setError(err.message.replace("Firebase: ", ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
                    alt="Athlete Training"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/75" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

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
                className="w-full max-w-[700px] px-6 relative z-10"
            >
                <div className="flex flex-col items-center mb-6">
                    <Link to="/">
                        <Logo iconOnly={true} className="mb-4 scale-125" />
                    </Link>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase text-center leading-tight tracking-[0.05em]">Join the Ecosystem</h1>
                    <p className="text-gray-400 text-center text-[10px] font-black uppercase tracking-[0.3em]">
                        Create your verified <span className="text-primary font-bold">digital profile</span>
                    </p>
                </div>

                <div className="flex flex-col md:flex-row bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {/* Vertical Role Switcher */}
                    <div className="w-full md:w-32 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 flex md:flex-col justify-around md:justify-center p-4 gap-4">
                        {[
                            { id: 'athlete', label: 'Athlete', icon: Trophy },
                            { id: 'coach', label: 'Coach', icon: Target },
                            { id: 'user', label: 'User', icon: Users }
                        ].map((role) => (
                            <button
                                key={role.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, role: role.id })}
                                className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl transition-all flex-1 md:flex-none ${formData.role === role.id
                                    ? "bg-primary text-white shadow-[0_0_20px_rgba(255,87,34,0.3)]"
                                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                                    }`}
                            >
                                <role.icon size={24} className="mb-2" />
                                <span className="text-[9px] font-black uppercase tracking-widest">{role.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Form Area */}
                    <div className="flex-1 p-8 md:p-10">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Full Identity Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-base"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Secure Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="name@email.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-base"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Access Key</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-base"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Confirm Key</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                                            <ShieldCheck size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all text-base"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.5)] flex items-center justify-center gap-3 group mt-6 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Create Profile
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="mt-8 text-center text-gray-500 text-sm font-medium tracking-wide">
                    Already an Athlete?{" "}
                    <Link to="/login" className="text-primary font-black hover:text-orange-400 transition-colors uppercase ml-1">
                        Acccess Portal
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
