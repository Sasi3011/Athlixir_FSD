import { motion } from 'framer-motion';
import { Target, TrendingUp, Users } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] z-0" />
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] z-0" />

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                {/* Left Side Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold uppercase tracking-[0.25em] mb-4 text-primary backdrop-blur-sm">
                        About Athlixir
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] text-white tracking-tight">
                        Bringing Trust, <br />
                        Technology & <br />
                        <span className="text-gray-500">Opportunity.</span>
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed font-light max-w-xl">
                        Athlixir is a digital ecosystem built for athletes from Tier-2 and Tier-3 cities.
                        We help athletes build <span className="text-white font-medium">verified profiles</span>, track performance, prevent injuries, and connect with mentors — all in one unified platform.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                <Target className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Precision</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">Verified data that scouts and academies can actually trust.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                <TrendingUp className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Growth</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">AI-driven analytics to identify and fix performance gaps.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(255,87,34,0.4)] text-sm uppercase tracking-widest hover:scale-105">
                            Learn More
                        </button>
                    </div>
                </motion.div>

                {/* Right Side Cards */}
                <div className="relative h-[550px] w-full flex items-center justify-center lg:justify-end">
                    {/* Floating Main Image */}
                    <motion.div
                        className="absolute top-0 right-1/4 w-72 h-96 rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
                            alt="Athlete Training"
                            className="object-cover w-full h-full transition-all duration-700 transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-1">Training</span>
                            <p className="font-bold text-lg text-white">Train Smarter.</p>
                        </div>
                    </motion.div>

                    {/* Secondary Floating Image */}
                    <motion.div
                        className="absolute bottom-0 right-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl z-20 border border-white/10"
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80"
                            alt="Verified Profile"
                            className="object-cover w-full h-full transition-all duration-700 transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-1">Ecosystem</span>
                            <p className="font-bold text-lg text-white">Real Impact.</p>
                        </div>
                    </motion.div>

                    {/* Decorative Glass Card */}
                    <motion.div
                        className="absolute top-1/2 -left-4 z-30 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl w-48"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="flex items-center space-x-3 mb-3">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Community</span>
                        </div>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-gray-800">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-3 font-medium">Join 2k+ Athletes</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
