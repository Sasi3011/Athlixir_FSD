import { useState } from "react";
import { Check, X, FileText, Download, Eye } from "lucide-react";

const AthleteVerification = () => {
    // Dummy Data
    const [requests, setRequests] = useState([
        { id: 1, name: "Michael Jordan", sport: "Basketball", documents: ["Birth Certificate.pdf", "Medical Record.pdf"], status: "Pending", date: "2023-10-25" },
        { id: 2, name: "Serena Williams", sport: "Tennis", documents: ["ID Proof.jpg"], status: "Pending", date: "2023-10-26" },
        { id: 3, name: "Usain Bolt", sport: "Athletics", documents: ["Passport.pdf", "Achievement.pdf"], status: "In Review", date: "2023-10-24" },
    ]);

    const handleApprove = (id) => {
        setRequests(requests.filter(req => req.id !== id));
        // Logic to update user status to verified would go here
    };

    const handleReject = (id) => {
        setRequests(requests.filter(req => req.id !== id));
        // Logic to reject and notify user
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Athlete Verification</h1>
                <p className="text-gray-400">Review and verify athlete documents for authenticity.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {requests.map((req) => (
                    <div key={req.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold">
                                {req.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{req.name}</h3>
                                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{req.sport} • {req.date}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Uploaded Documents</p>
                            <div className="flex gap-2 flex-wrap">
                                {req.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-black/40 rounded-lg border border-white/5 hover:border-primary/50 cursor-pointer transition-colors group">
                                        <FileText size={14} className="text-gray-400 group-hover:text-primary" />
                                        <span className="text-sm text-gray-300 group-hover:text-white">{doc}</span>
                                        <Eye size={12} className="text-gray-600 group-hover:text-white ml-2" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button
                                onClick={() => handleReject(req.id)}
                                className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                            >
                                <X size={18} />
                                Reject
                            </button>
                            <button
                                onClick={() => handleApprove(req.id)}
                                className="flex-1 md:flex-none px-6 py-3 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                            >
                                <Check size={18} />
                                Approve
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {requests.length === 0 && (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                    <Check size={48} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-white">All Caught Up!</h3>
                    <p className="text-gray-500">No pending verification requests.</p>
                </div>
            )}
        </div>
    );
};

export default AthleteVerification;
