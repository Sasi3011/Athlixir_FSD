import { useState } from "react";
import { motion } from "framer-motion";
import {
    MessageSquare, Search, Send, MoreVertical,
    Image, Paperclip, CheckCheck, Phone,
    Video, Info, Trophy, Target, ShieldCheck
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Messages = () => {
    const { user } = useAuth();
    const [activeChat, setActiveChat] = useState(1);
    const [messageInput, setMessageInput] = useState("");

    const chats = [
        {
            id: 1,
            name: "Coach Rahul",
            role: "Head Coach",
            lastMessage: "Make sure you log the morning session intensity.",
            time: "10:45 AM",
            unread: 2,
            online: true,
            icon: Target
        },
        {
            id: 2,
            name: "Team Scouting Hub",
            role: "Verified Agent",
            lastMessage: "Your profile is under review for the next trials.",
            time: "Yesterday",
            unread: 0,
            online: false,
            icon: ShieldCheck
        },
        {
            id: 3,
            name: "Athlixir Support",
            role: "Platform Admin",
            lastMessage: "Your identity verification is now complete.",
            time: "Monday",
            unread: 0,
            online: true,
            icon: Trophy
        }
    ];

    const messages = [
        { id: 1, sender: "Coach Rahul", text: "Are you ready for the mock match tomorrow?", time: "10:30 AM", isMe: false },
        { id: 2, sender: "Me", text: "Yes coach. Logged the training hours in the portal already.", time: "10:32 AM", isMe: true },
        { id: 3, sender: "Coach Rahul", text: "Excellent. I checked your recovery chart, looks like the ACL stress is down by 40%.", time: "10:40 AM", isMe: false },
        { id: 4, sender: "Coach Rahul", text: "Make sure you log the morning session intensity.", time: "10:45 AM", isMe: false },
    ];

    return (
        <div className="h-[calc(100vh-12rem)] flex bg-black/40 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
            {/* Left Sidebar - Chat List */}
            <div className="w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col bg-white/[0.01]">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                            <MessageSquare className="text-primary" size={20} /> Identity Comms
                        </h2>
                        <span className="p-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black">{chats.reduce((a, b) => a + b.unread, 0)} NEW</span>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find Identity..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-xs text-white outline-none focus:border-primary/50 transition-all font-bold uppercase tracking-widest"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
                    <div className="space-y-2">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat.id)}
                                className={`p-4 rounded-3xl cursor-pointer transition-all border flex items-center gap-4 group ${activeChat === chat.id
                                        ? "bg-primary/10 border-primary/30"
                                        : "bg-transparent border-transparent hover:bg-white/5"
                                    }`}
                            >
                                <div className="relative">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all ${activeChat === chat.id ? "bg-primary text-white" : "bg-white/5 text-gray-400 group-hover:bg-white/10"
                                        }`}>
                                        <chat.icon size={28} />
                                    </div>
                                    {chat.online && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-[#050505]"></div>
                                    )}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-sm font-black text-white uppercase italic truncate">{chat.name}</h4>
                                        <span className="text-[9px] font-bold text-gray-500 uppercase">{chat.time}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium truncate group-hover:text-gray-400 transition-colors">{chat.lastMessage}</p>
                                </div>
                                {chat.unread > 0 && (
                                    <div className="w-5 h-5 bg-primary rounded-lg flex items-center justify-center text-[9px] font-black text-white">{chat.unread}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Area - Active Chat */}
            <div className="flex-1 flex flex-col relative bg-black/20">
                {/* Chat Header */}
                <header className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-black">
                            <Target size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Coach Rahul</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Active Syncing</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-white transition-all"><Phone size={18} /></button>
                        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-white transition-all"><Video size={18} /></button>
                        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-white transition-all"><MoreVertical size={18} /></button>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                    <div className="text-center">
                        <span className="px-4 py-1.5 bg-white/5 rounded-full text-[9px] font-black text-gray-600 uppercase tracking-widest border border-white/5">Digital Encryption Active</span>
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] space-y-2 ${msg.isMe ? "items-end" : "items-start"}`}>
                                <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed ${msg.isMe
                                        ? "bg-primary text-white rounded-tr-none shadow-xl shadow-primary/10"
                                        : "bg-white/5 border border-white/5 text-gray-300 rounded-tl-none"
                                    }`}>
                                    {msg.text}
                                </div>
                                <div className={`flex items-center gap-2 px-2 ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
                                    <span className="text-[9px] font-bold text-gray-600 uppercase">{msg.time}</span>
                                    {msg.isMe && <CheckCheck size={12} className="text-primary" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[2rem] p-2 pr-4 focus-within:border-primary/50 transition-all">
                        <div className="flex gap-1 md:gap-2 pl-4">
                            <button className="p-2 text-gray-500 hover:text-white transition-colors"><Paperclip size={20} /></button>
                            <button className="p-2 text-gray-500 hover:text-white transition-colors"><Image size={20} /></button>
                        </div>
                        <input
                            type="text"
                            placeholder="Message ecosystem identity..."
                            className="flex-1 bg-transparent py-4 text-sm text-white placeholder:text-gray-700 outline-none font-medium"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-orange-600 transform hover:scale-105 active:scale-95 transition-all">
                            <Send size={20} className="ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
