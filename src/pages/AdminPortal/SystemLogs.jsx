
const SystemLogs = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">System Logs</h1>
                <p className="text-gray-400">Track all system activities and security logs.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="space-y-4">
                    {/* Mock Logs */}
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-gray-400 text-sm font-mono">2024-02-14 10:24:00</span>
                        <span className="text-white text-sm">User <span className="text-primary">AthlixirAdmin</span> logged in.</span>
                        <span className="text-green-500 text-xs font-bold uppercase">Auth</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-gray-400 text-sm font-mono">2024-02-14 10:20:15</span>
                        <span className="text-white text-sm">Automated system check completed.</span>
                        <span className="text-blue-500 text-xs font-bold uppercase">System</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-gray-400 text-sm font-mono">2024-02-14 09:45:10</span>
                        <span className="text-white text-sm">New user Verification Request received.</span>
                        <span className="text-yellow-500 text-xs font-bold uppercase">User</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemLogs;
