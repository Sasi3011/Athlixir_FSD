
const ReportsAnalytics = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Reports & Analytics</h1>
                <p className="text-gray-400">In-depth analysis of platform growth and engagement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-96 flex items-center justify-center">
                    <span className="text-gray-500">[Athlete Growth Chart]</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-96 flex items-center justify-center">
                    <span className="text-gray-500">[Injury Statistics]</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-96 flex items-center justify-center">
                    <span className="text-gray-500">[Sponsorship Volume]</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-96 flex items-center justify-center">
                    <span className="text-gray-500">[Geographic Activity]</span>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
