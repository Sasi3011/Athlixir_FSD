import { useState } from "react";
import { Check, X, Calendar, MapPin } from "lucide-react";

const ManageOpportunities = () => {
    // Dummy Data
    const [opportunities, setOpportunities] = useState([
        { id: 1, title: "Summer Training Camp", type: "Camp", organizer: "Elite Sports Academy", date: "2024-06-15", status: "Pending" },
        { id: 2, title: "Pro Scholarship Trials", type: "Scholarship", organizer: "National Sports Fund", date: "2024-07-01", status: "Pending" },
        { id: 3, title: "Regional Seekers Tournament", type: "Tournament", organizer: "City Club", date: "2024-05-20", status: "Pending" },
    ]);

    const handleAction = (id) => {
        setOpportunities(opportunities.filter(op => op.id !== id));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Manage Opportunities</h1>
                <p className="text-gray-400">Approve or reject coach posted trials, academy events, and sponsorships.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {opportunities.map((op) => (
                    <div key={op.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-300">
                                    {op.type}
                                </span>
                                <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">{op.status}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{op.title}</h3>
                            <p className="text-sm text-gray-400 mb-1 font-medium">{op.organizer}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-wider mt-4">
                                <Calendar size={14} />
                                {op.date}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => handleAction(op.id)}
                                className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 font-bold uppercase text-xs tracking-wider transition-colors"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleAction(op.id)}
                                className="flex-1 py-3 bg-green-500 text-white hover:bg-green-600 rounded-xl font-bold uppercase text-xs tracking-wider transition-colors shadow-lg shadow-green-500/20"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {opportunities.length === 0 && (
                <div className="col-span-full text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                    <p className="text-gray-500">No opportunities pending approval.</p>
                </div>
            )}
        </div>
    );
};

export default ManageOpportunities;
