import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, Search, Send, User, CheckCheck,
    Phone, Video, MoreVertical, X, Image as ImageIcon,
    Smile, Plus, Filter, Info, MapPin, ShieldCheck
} from "lucide-react";

const CoachMessages = () => {
    const [selectedChat, setSelectedChat] = useState(1);

    // Using simple icons for avatar placeholders
    const chats = [
        { id: 1, name: "Rahul Sharma", role: "Athlete", lastMsg: "Check the updated drills for tomorrow", time: "10:45 AM", unread: 2, status: "online", verified: true },
        { id: 2, name: "Academy Admin", role: "Management", lastMsg: "The facility audit is complete", time: "Yesterday", unread: 0, status: "offline", verified: true },
        { id: 3, name: "Vikram Singh", role: "Athlete", lastMsg: "Sponsorship proposal received", time: "Mon", unread: 0, status: "online", verified: true },
        { id: 4, name: "Elite Scout Hub", role: "Discovery", lastMsg: "New talent node identified", time: "Sun", unread: 0, status: "offline", verified: true },
    ];

    const messages = [
        { id: 1, sender: "other", text: "Greetings, following up on the latest performance index for the squad.", time: "10:30 AM" },
        { id: 2, sender: "me", text: "The index is surging. Specifically the Sprint nodes are at 94% consistency.", time: "10:32 AM" },
        { id: 3, sender: "other", text: "Impressive. Should we schedule a deep audit for Rahul and Vikram?", time: "10:35 AM" },
        { id: 4, sender: "me", text: "Yes, initialize node sync. Checking schedules now.", time: "10:45 AM" },
    ];

    return (
        <div className="h-[calc(100vh-10rem)] flex overflow-hidden bg-black/40 border border-white/5 rounded-[3rem]">
            {/* Sidebar: Chat List */}
            <div className="w-full lg:w-96 border-r border-white/5 flex flex-col h-full bg-white/[0.01]">
                <div className="p-8">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-6 italic">Secure <span className="text-primary NOT-italic">Inbox</span></h2>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find node..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-bold"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide px-4 space-y-2 pb-8">
                    {chats.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all group ${selectedChat === chat.id
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "text-gray-400 hover:bg-white/5"
                                }`}
                        >
                            <div className="relative">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black border ${selectedChat === chat.id ? "bg-white/20 border-white/20" : "bg-black/40 border-white/10"}`}>
                                    {chat.name.charAt(0)}
                                </div>
                                {chat.status === "online" && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full" />
                                )}
                            </div>
                            <div className="flex-1 text-left overflow-hidden">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`text-sm font-black uppercase truncate flex items-center gap-1 ${selectedChat === chat.id ? "text-white" : "text-white group-hover:text-primary transition-colors"}`}>
                                        {chat.name}
                                        {chat.verified && <ShieldCheck size={12} className={selectedChat === chat.id ? "text-white" : "text-primary"} />}
                                    </span>
                                    <span className={`text-[8px] font-bold uppercase ${selectedChat === chat.id ? "text-white/60" : "text-gray-600"}`}>{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className={`text-[10px] font-medium truncate ${selectedChat === chat.id ? "text-white/80" : "text-gray-500"}`}>{chat.lastMsg}</p>
                                    {chat.unread > 0 && (
                                        <span className="bg-primary text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full scale-125">{chat.unread}</span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="hidden lg:flex flex-1 flex-col bg-white/[0.005]">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-3xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary font-black border border-white/10">
                            {chats.find(c => c.id === selectedChat)?.name.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">{chats.find(c => c.id === selectedChat)?.name}</h3>
                                <ShieldCheck size={14} className="text-primary fill-primary/10" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Node Discovery Active</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/10"><Phone size={18} /></button>
                        <button className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/10"><Video size={18} /></button>
                        <button className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/10"><MoreVertical size={18} /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] space-y-2 ${msg.sender === "me" ? "items-end" : "items-start"}`}>
                                <div className={`p-5 rounded-[2rem] text-sm font-medium tracking-tight leading-relaxed shadow-xl ${msg.sender === "me"
                                        ? "bg-primary text-white rounded-tr-none shadow-primary/10"
                                        : "bg-white/5 border border-white/10 text-gray-300 rounded-tl-none border-white/5"
                                    }`}>
                                    {msg.text}
                                </div>
                                <div className={`flex items-center gap-2 px-2 ${msg.sender === "me" ? "flex-reverse" : ""}`}>
                                    <span className="text-[8px] font-bold text-gray-600 uppercase italic">{msg.time}</span>
                                    {msg.sender === "me" && <CheckCheck size={12} className="text-primary" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-8 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[2rem] p-3 pl-6 focus-within:border-primary/50 transition-all">
                        <button className="text-gray-500 hover:text-primary transition-colors"><Smile size={20} /></button>
                        <button className="text-gray-500 hover:text-primary transition-colors"><ImageIcon size={20} /></button>
                        <input
                            type="text"
                            placeholder="Type an encrypted message..."
                            className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-gray-700 font-medium"
                        />
                        <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-[1.05] transition-all shadow-lg shadow-primary/20">
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <p className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] italic flex items-center gap-2">
                            End-to-end encrypted hub <ShieldCheck size={10} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachMessages;
