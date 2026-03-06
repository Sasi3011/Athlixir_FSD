import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    MessageSquare, Search, Send, MoreVertical,
    Image, Paperclip, CheckCheck, Phone,
    Video, ArrowLeft, SmilePlus
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const CHATS = [
    {
        id: 1, name: "Coach Rahul", role: "Head Coach", avatar: "CR",
        lastMessage: "Make sure you log the morning session intensity.",
        time: "10:45 AM", unread: 2, online: true
    },
    {
        id: 2, name: "Dr. Priya Sharma", role: "Sports Physio", avatar: "PS",
        lastMessage: "Your knee recovery is on track. See you Thursday.",
        time: "9:20 AM", unread: 1, online: true
    },
    {
        id: 3, name: "Team Scouting Hub", role: "Verified Agent", avatar: "SH",
        lastMessage: "Your profile is under review for the next trials.",
        time: "Yesterday", unread: 0, online: false
    },
    {
        id: 4, name: "Athlixir Support", role: "Platform Admin", avatar: "AS",
        lastMessage: "Your identity verification is now complete.",
        time: "Monday", unread: 0, online: true
    },
    {
        id: 5, name: "Arun Kumar", role: "Training Partner", avatar: "AK",
        lastMessage: "Let's meet at the track at 6 AM tomorrow.",
        time: "Sunday", unread: 0, online: false
    },
];

const MESSAGES_DATA = {
    1: [
        { id: 1, text: "Hey, how's your training going this week?", time: "10:15 AM", isMe: false },
        { id: 2, text: "Going well coach! Hit a new PB in the 200m yesterday.", time: "10:18 AM", isMe: true },
        { id: 3, text: "That's great progress! I saw your performance log entry.", time: "10:22 AM", isMe: false },
        { id: 4, text: "Are you ready for the mock match tomorrow?", time: "10:30 AM", isMe: false },
        { id: 5, text: "Yes coach. Logged the training hours in the portal already.", time: "10:32 AM", isMe: true },
        { id: 6, text: "Excellent. I checked your recovery chart, looks like the ACL stress is down by 40%.", time: "10:40 AM", isMe: false },
        { id: 7, text: "Make sure you log the morning session intensity.", time: "10:45 AM", isMe: false },
    ],
    2: [
        { id: 1, text: "Hi! How's the knee feeling after yesterday's session?", time: "8:30 AM", isMe: false },
        { id: 2, text: "Much better. The ice therapy really helped.", time: "8:45 AM", isMe: true },
        { id: 3, text: "Good to hear. Continue the exercises I prescribed.", time: "9:00 AM", isMe: false },
        { id: 4, text: "Your knee recovery is on track. See you Thursday.", time: "9:20 AM", isMe: false },
    ],
    3: [
        { id: 1, text: "We've reviewed your profile for the upcoming district trials.", time: "2:00 PM", isMe: false },
        { id: 2, text: "Thank you! When will I hear back?", time: "2:15 PM", isMe: true },
        { id: 3, text: "Your profile is under review for the next trials.", time: "3:00 PM", isMe: false },
    ],
    4: [
        { id: 1, text: "Welcome to Athlixir! Your account setup is complete.", time: "Mon 10:00 AM", isMe: false },
        { id: 2, text: "Thanks! How do I get verified?", time: "Mon 10:05 AM", isMe: true },
        { id: 3, text: "Upload your sports ID and performance certificate in Settings > Profile.", time: "Mon 10:10 AM", isMe: false },
        { id: 4, text: "Your identity verification is now complete.", time: "Mon 11:00 AM", isMe: false },
    ],
    5: [
        { id: 1, text: "Great session today! That 400m relay was intense.", time: "Sat 7:00 PM", isMe: false },
        { id: 2, text: "Totally! My legs are dead though 😅", time: "Sat 7:05 PM", isMe: true },
        { id: 3, text: "Let's meet at the track at 6 AM tomorrow.", time: "Sun 9:00 PM", isMe: false },
    ],
};

const Messages = () => {
    const { user } = useAuth();
    const [activeChat, setActiveChat] = useState(1);
    const [messageInput, setMessageInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showSidebar, setShowSidebar] = useState(true);
    const messagesEndRef = useRef(null);

    const activeContact = CHATS.find((c) => c.id === activeChat);
    const messages = MESSAGES_DATA[activeChat] || [];

    const filteredChats = CHATS.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalUnread = CHATS.reduce((a, b) => a + b.unread, 0);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeChat]);

    const handleSend = () => {
        if (!messageInput.trim()) return;
        setMessageInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-[calc(100vh-10rem)] flex rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {/* Sidebar - Chat List */}
            <div className={`${showSidebar ? "flex" : "hidden"} md:flex w-full md:w-80 lg:w-96 border-r border-white/[0.06] flex-col bg-white/[0.01]`}>
                <div className="p-4 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <MessageSquare size={20} className="text-primary" /> Messages
                        </h2>
                        {totalUnread > 0 && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-lg text-xs font-medium">{totalUnread} new</span>
                        )}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => { setActiveChat(chat.id); setShowSidebar(false); }}
                            className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-3 border-b border-white/[0.03] ${activeChat === chat.id ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-white/[0.03]"}`}
                        >
                            <div className="relative shrink-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold ${activeChat === chat.id ? "bg-primary text-white" : "bg-white/[0.08] text-gray-400"}`}>
                                    {chat.avatar}
                                </div>
                                {chat.online && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium text-white truncate">{chat.name}</h4>
                                    <span className="text-[10px] text-gray-500 shrink-0 ml-2">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center mt-0.5">
                                    <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                                    {chat.unread > 0 && (
                                        <span className="ml-2 shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-medium text-white">{chat.unread}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`${!showSidebar ? "flex" : "hidden"} md:flex flex-1 flex-col`}>
                {activeContact ? (
                    <>
                        {/* Chat Header */}
                        <header className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowSidebar(true)}
                                    className="md:hidden p-2 text-gray-500 hover:text-white rounded-lg"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
                                        {activeContact.avatar}
                                    </div>
                                    {activeContact.online && (
                                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">{activeContact.name}</h3>
                                    <p className="text-[10px] text-gray-500">{activeContact.online ? "Online" : "Offline"} · {activeContact.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button type="button" className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06]"><Phone size={16} /></button>
                                <button type="button" className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06]"><Video size={16} /></button>
                                <button type="button" className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06]"><MoreVertical size={16} /></button>
                            </div>
                        </header>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                            <div className="text-center py-2">
                                <span className="px-3 py-1 bg-white/[0.04] rounded-full text-[10px] text-gray-500">Messages are end-to-end encrypted</span>
                            </div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[75%] ${msg.isMe ? "items-end" : "items-start"}`}>
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.isMe
                                            ? "bg-primary text-white rounded-br-md"
                                            : "bg-white/[0.06] border border-white/[0.06] text-gray-200 rounded-bl-md"
                                        }`}>
                                            {msg.text}
                                        </div>
                                        <div className={`flex items-center gap-1.5 mt-1 px-1 ${msg.isMe ? "justify-end" : "justify-start"}`}>
                                            <span className="text-[10px] text-gray-600">{msg.time}</span>
                                            {msg.isMe && <CheckCheck size={12} className="text-primary/70" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-white/[0.06]">
                            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1 focus-within:border-primary/40 transition-colors">
                                <button type="button" className="p-1.5 text-gray-500 hover:text-white rounded-lg"><SmilePlus size={18} /></button>
                                <button type="button" className="p-1.5 text-gray-500 hover:text-white rounded-lg"><Paperclip size={18} /></button>
                                <button type="button" className="p-1.5 text-gray-500 hover:text-white rounded-lg"><Image size={18} /></button>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-gray-500 outline-none"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button
                                    type="button"
                                    onClick={handleSend}
                                    disabled={!messageInput.trim()}
                                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
