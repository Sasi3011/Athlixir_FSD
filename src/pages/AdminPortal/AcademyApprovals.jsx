
const AcademyApprovals = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Academy Approvals</h1>
                <p className="text-gray-400">Review and approve new academy registrations.</p>
            </div>

            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                <p className="text-gray-500">No pending academy approvals.</p>
            </div>
        </div>
    );
};

export default AcademyApprovals;
