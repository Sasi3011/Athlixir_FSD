import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Users, GraduationCap, Calendar, Briefcase, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GlobalSearch Component
 * Universal search across Athletes, Academies, Events, and Opportunities
 */
const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        athletes: [],
        academies: [],
        events: [],
        opportunities: []
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // Mock data for search
    const mockData = {
        athletes: [
            { id: 1, name: 'Rajesh Kumar', sport: 'Cricket', level: 'State Champion', location: 'Chennai' },
            { id: 2, name: 'Priya Sharma', sport: 'Athletics', level: 'National Player', location: 'Mumbai' },
            { id: 3, name: 'Arjun Singh', sport: 'Football', level: 'District Level', location: 'Delhi' }
        ],
        academies: [
            { id: 1, name: 'Elite Sports Academy', sport: 'Multi-Sport', location: 'Bangalore', rating: 4.8 },
            { id: 2, name: 'Champions Cricket Academy', sport: 'Cricket', location: 'Chennai', rating: 4.9 },
            { id: 3, name: 'Future Stars Football', sport: 'Football', location: 'Mumbai', rating: 4.7 }
        ],
        events: [
            { id: 1, name: 'State Championship 2024', sport: 'Cricket', date: '2024-03-15', location: 'Chennai' },
            { id: 2, name: 'Inter-District Marathon', sport: 'Athletics', date: '2024-03-20', location: 'Mumbai' },
            { id: 3, name: 'Youth League Finals', sport: 'Football', date: '2024-04-01', location: 'Delhi' }
        ],
        opportunities: [
            { id: 1, title: 'Cricket Trials - Under 19', type: 'Trial', sport: 'Cricket', location: 'Chennai' },
            { id: 2, title: 'Football Scholarship Program', type: 'Scholarship', sport: 'Football', location: 'Mumbai' },
            { id: 3, title: 'Sponsorship Available', type: 'Sponsorship', sport: 'Athletics', location: 'Bangalore' }
        ]
    };

    // Handle search
    useEffect(() => {
        if (query.length < 2) {
            setResults({ athletes: [], academies: [], events: [], opportunities: [] });
            return;
        }

        setLoading(true);

        // Simulate API call with timeout
        const timer = setTimeout(() => {
            const lowerQuery = query.toLowerCase();

            const filteredResults = {
                athletes: mockData.athletes.filter(a =>
                    a.name.toLowerCase().includes(lowerQuery) ||
                    a.sport.toLowerCase().includes(lowerQuery)
                ),
                academies: mockData.academies.filter(a =>
                    a.name.toLowerCase().includes(lowerQuery) ||
                    a.sport.toLowerCase().includes(lowerQuery)
                ),
                events: mockData.events.filter(e =>
                    e.name.toLowerCase().includes(lowerQuery) ||
                    e.sport.toLowerCase().includes(lowerQuery)
                ),
                opportunities: mockData.opportunities.filter(o =>
                    o.title.toLowerCase().includes(lowerQuery) ||
                    o.sport.toLowerCase().includes(lowerQuery)
                )
            };

            setResults(filteredResults);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Keyboard shortcut (Ctrl/Cmd + K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleResultClick = (type, id) => {
        setIsOpen(false);
        setQuery('');

        // Navigate based on type
        switch (type) {
            case 'athlete':
                navigate(`/athlete/public/${id}`);
                break;
            case 'academy':
                navigate(`/user/academies`); // TODO: Add academy detail page
                break;
            case 'event':
                navigate(`/user/events`);
                break;
            case 'opportunity':
                navigate(`/user/opportunities`);
                break;
            default:
                break;
        }
    };

    const totalResults = results.athletes.length + results.academies.length +
        results.events.length + results.opportunities.length;

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
            >
                <Search className="text-gray-400 group-hover:text-white transition-colors" size={18} />
                <span className="text-gray-400 text-sm hidden md:block">Search...</span>
                <kbd className="hidden md:block px-2 py-0.5 bg-white/10 rounded text-xs text-gray-500">⌘K</kbd>
            </button>

            {/* Search Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Search Box */}
                        <motion.div
                            ref={searchRef}
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#0A0A0A] border border-white/20 rounded-3xl shadow-2xl z-50 overflow-hidden"
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 p-4 border-b border-white/10">
                                <Search className="text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search athletes, academies, events, opportunities..."
                                    className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                                    autoFocus
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="text-gray-400" size={18} />
                                </button>
                            </div>

                            {/* Results */}
                            <div className="max-h-[60vh] overflow-y-auto">
                                {query.length < 2 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <Search className="mx-auto mb-3" size={32} />
                                        <p>Type at least 2 characters to search</p>
                                    </div>
                                ) : loading ? (
                                    <div className="p-8 text-center">
                                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        <p className="text-gray-400 mt-3">Searching...</p>
                                    </div>
                                ) : totalResults === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <Search className="mx-auto mb-3" size={32} />
                                        <p>No results found for "{query}"</p>
                                    </div>
                                ) : (
                                    <div className="p-4 space-y-4">
                                        {/* Athletes */}
                                        {results.athletes.length > 0 && (
                                            <div>
                                                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                                                    <Users size={14} />
                                                    Athletes ({results.athletes.length})
                                                </h3>
                                                {results.athletes.map((athlete) => (
                                                    <button
                                                        key={athlete.id}
                                                        onClick={() => handleResultClick('athlete', athlete.id)}
                                                        className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all text-left"
                                                    >
                                                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                                            <Users className="text-blue-500" size={18} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-white font-medium truncate">{athlete.name}</p>
                                                            <p className="text-xs text-gray-500">{athlete.sport} • {athlete.level}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Academies */}
                                        {results.academies.length > 0 && (
                                            <div>
                                                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                                                    <GraduationCap size={14} />
                                                    Academies ({results.academies.length})
                                                </h3>
                                                {results.academies.map((academy) => (
                                                    <button
                                                        key={academy.id}
                                                        onClick={() => handleResultClick('academy', academy.id)}
                                                        className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all text-left"
                                                    >
                                                        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                                                            <GraduationCap className="text-orange-500" size={18} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-white font-medium truncate">{academy.name}</p>
                                                            <p className="text-xs text-gray-500">{academy.sport} • {academy.location}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Events */}
                                        {results.events.length > 0 && (
                                            <div>
                                                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    Events ({results.events.length})
                                                </h3>
                                                {results.events.map((event) => (
                                                    <button
                                                        key={event.id}
                                                        onClick={() => handleResultClick('event', event.id)}
                                                        className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all text-left"
                                                    >
                                                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                                            <Calendar className="text-purple-500" size={18} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-white font-medium truncate">{event.name}</p>
                                                            <p className="text-xs text-gray-500">{event.sport} • {event.date}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Opportunities */}
                                        {results.opportunities.length > 0 && (
                                            <div>
                                                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                                                    <Briefcase size={14} />
                                                    Opportunities ({results.opportunities.length})
                                                </h3>
                                                {results.opportunities.map((opp) => (
                                                    <button
                                                        key={opp.id}
                                                        onClick={() => handleResultClick('opportunity', opp.id)}
                                                        className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all text-left"
                                                    >
                                                        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                                                            <Briefcase className="text-green-500" size={18} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-white font-medium truncate">{opp.title}</p>
                                                            <p className="text-xs text-gray-500">{opp.type} • {opp.sport}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer Tip */}
                            <div className="p-3 border-t border-white/10 bg-white/5">
                                <p className="text-xs text-gray-500 text-center">
                                    Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">ESC</kbd> to close
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default GlobalSearch;
