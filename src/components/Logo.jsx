import React from 'react';

const Logo = ({ className = "", iconOnly = false }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="relative group flex items-center justify-center">
                {/* Glow effect behind the logo icon */}
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,87,34,0.4)]">
                        {/* Geometric stylized 'A' */}
                        <path
                            d="M50 10 L90 90 L70 90 L50 45 L30 90 L10 90 Z"
                            fill="url(#logo-gradient)"
                        />
                        {/* Visual accent/break */}
                        <path
                            d="M50 10 L50 45 L30 90 L10 90 Z"
                            fill="white"
                            fillOpacity="0.15"
                        />

                        <defs>
                            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FF5722" />
                                <stop offset="100%" stopColor="#FF8A65" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {!iconOnly && (
                <span className="text-2xl font-black tracking-tight text-white uppercase sm:block hidden">
                    Athl<span className="text-primary">ixir</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
