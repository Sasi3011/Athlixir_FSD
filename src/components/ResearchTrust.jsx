import { motion } from 'framer-motion';
import { ArrowRight, Microscope, Quote } from 'lucide-react';

const ResearchTrust = () => {
    return (
        <section id="research" className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                {/* Left Side Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[550px] border border-white/10 group"
                >
                    <img
                        src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80"
                        alt="Athlete Analyzing Data"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                    {/* Floating Info Card */}
                    <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <div className="flex items-center space-x-3 mb-2">
                            <Microscope className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Evidence Based</span>
                        </div>
                        <p className="text-white font-medium text-sm leading-relaxed">
                            Validated through grassroots interviews and performance case studies.
                        </p>
                    </div>
                </motion.div>

                {/* Right Side Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10"
                >
                    <div className="inline-flex px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold uppercase tracking-[0.25em] mb-4 text-primary backdrop-blur-sm">
                        Research & Trust
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
                        Built on <span className="text-gray-500">Real</span> <br />
                        Data Science.
                    </h2>

                    <div className="relative p-10 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl overflow-hidden group">
                        <Quote className="absolute -top-4 -right-4 w-24 h-24 text-primary/10 group-hover:text-primary/20 transition-colors" />

                        <p className="text-lg md:text-xl font-light italic text-gray-300 leading-snug mb-6 relative z-10">
                            “70% of Indian athletes lack verified digital profiles. Only 2% use tracking tools. Athlixir changes that trajectory.”
                        </p>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-[1px] bg-primary" />
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                Validated Market Research 2024
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed font-light max-w-lg">
                        We aren't just building an app; we're building a standard for athletic excellence across Tier-2 and Tier-3 cities.
                    </p>

                    <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:border-primary hover:text-primary transition-all text-xs uppercase tracking-widest flex items-center space-x-3 group w-fit">
                        <span>Read Case Studies</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ResearchTrust;
