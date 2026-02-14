
const EventModeration = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Event Moderation</h1>
                <p className="text-gray-400">Moderate and approve events.</p>
            </div>

            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                <p className="text-gray-500">No events requiring moderation at this time.</p>
            </div>
        </div>
    );
};

export default EventModeration;
