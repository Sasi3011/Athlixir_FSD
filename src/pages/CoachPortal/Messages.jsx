import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, Search, Send, User, CheckCheck,
    Phone, Video, MoreVertical, X, Image as ImageIcon,
    Smile, Plus, Filter, Info, MapPin
} from "lucide-react";

const CoachMessages = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");

    const chats = [
        { id: 1, name: "Rahul Sharma", role: "Athlete", lastMsg: "Coach, check my sprint log.", time: "10:45 AM", unread: 2, status: "online" },
        { id: 2, name: "Dr. Varma", role: "Medical Admin", lastMsg: "MRI report for Vikram Singh is ready.", time: "09:30 AM", unread: 0, status: "offline" },
        { id: 3, name: "Elite Academy Support", role: "Academy", lastMsg: "Travel logistics for next meet.", time: "Yesterday", unread: 0, status: "online" },
        { id: 4, name: "Priya Mani", role: "Athlete", lastMsg: "Recovery feel better today.", time: "Yesterday", unread: 0, status: "away" },
        { id: 5, name: "Coach Sankar", role: "Senior Coach", lastMsg: "Let's review the squad stats.", time: "Mon", unread: 0, status: "offline" },
    ];

    const messages = [
        { id: 1, text: "Hey Rahul, I saw the logs. Great improvement on the first 10m.", sender: "coach", time: "10:50 AM" },
        { id: 2, text: "Thanks Coach! Should I focus on the explosive starts tomorrow?", sender: "athlete", time: "10:52 AM" },
        { id: 3, text: "Exactly. 5 sets of 20m bursts. Keep focus on the arm drive.", sender: "coach", time: "10:55 AM" },
    ];

    return (
        <div className="h-[calc(100vh-140px)] flex gap-8 pb-10">
            {/* Sidebar: Chat List */}
            <div className={`lg:w-[400px] flex flex-col bg-black/40 border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-500 ${selectedChat ? 'hidden lg:flex' : 'flex w-full'}`}>
                {/* Search Header */}
                <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black uppercase tracking-tight text-white italic">Protocol <span className="text-primary NOT-italic">Secure Chat</span></h2>
                        <button className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all">
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Find connection..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-bold"
                        />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto scrollbar-hide py-4">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`px-8 py-6 flex items-center gap-5 cursor-pointer transition-all border-l-4 ${selectedChat?.id === chat.id
                                    ? 'bg-primary/5 border-primary'
                                    : 'border-transparent hover:bg-white/[0.02]'
                                }`}
                        >
                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-600/10 flex items-center justify-center text-primary font-black border border-primary/20 text-lg">
                                    {chat.name.charAt(0)}
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-[#080808] ${chat.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                        chat.status === 'away' ? 'bg-orange-500' : 'bg-gray-700'
                                    }`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-sm font-black text-white uppercase tracking-tight truncate">{chat.name}</h3>
                                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[11px] text-gray-500 truncate uppercase tracking-tight">{chat.lastMsg}</p>
                                    {chat.unread > 0 && (
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[9px] font-black text-white shadow-lg shadow-primary/20">
                                            {chat.unread}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Content Panel */}
            <div className={`flex-1 flex flex-col bg-black/40 border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-500 ${!selectedChat ? 'hidden lg:flex' : 'flex'}`}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <button
                                    onClick={() => setSelectedChat(null)}
                                    className="lg:hidden p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white mr-2"
                                >
                                    <X size={20} />
                                </button>
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/20">
                                    {selectedChat.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-tight">{selectedChat.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${selectedChat.status === 'online' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active {selectedChat.role} Node</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-primary transition-all">
                                    <Phone size={18} />
                                </button>
                                <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-primary transition-all">
                                    <Video size={18} />
                                </button>
                                <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-white transition-all">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide bg-[#050505]/30">
                            <div className="text-center">
                                <span className="px-5 py-1.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-600 italic">
                                    End-to-End Secure Channel Established
                                </span>
                            </div>

                            {messages.map((m) => (
                                <div key={m.id} className={`flex ${m.sender === 'coach' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] space-y-2`}>
                                        <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed ${m.sender === 'coach'
                                                ? 'bg-primary text-white rounded-tr-none shadow-xl shadow-primary/10'
                                                : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                                            }`}>
                                            {m.text}
                                        </div>
                                        <div className={`flex items-center gap-2 ${m.sender === 'coach' ? 'justify-end' : 'justify-start'}`}>
                                            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic">{m.time}</span>
                                            {m.sender === 'coach' && <CheckCheck size={12} className="text-primary" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input Container */}
                        <div className="p-8 border-t border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[2.5rem] p-3 focus-within:border-primary/50 transition-all">
                                <button className="p-4 text-gray-500 hover:text-primary transition-colors">
                                    <Plus size={20} />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Input strategic directive..."
                                    className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-gray-700 font-bold"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className="flex items-center gap-1">
                                    <button className="p-3 text-gray-500 hover:text-white transition-colors">
                                        <Smile size={20} />
                                    </button>
                                    <button className="p-3 text-gray-500 hover:text-white transition-colors">
                                        <ImageIcon size={20} />
                                    </button>
                                    <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all ml-2 group">
                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                        <div className="w-24 h-24 bg-primary/10 rounded-[3rem] flex items-center justify-center text-primary mb-10 border border-primary/20 shadow-2xl shadow-primary/10">
                            <MessageSquare size={48} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight italic mb-3">Athlixir <span className="text-primary NOT-italic">Secure Comms</span></h2>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest max-w-sm leading-relaxed">
                            Select a node from the sidebar to establish a secure encrypted communication channel with athletes or administrators.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoachMessages;
