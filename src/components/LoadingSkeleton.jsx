/**
 * LoadingSkeleton Component
 * Reusable skeleton loaders for different content types
 */

// Card Skeleton
export const CardSkeleton = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-6 animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
                            <div className="h-3 bg-white/10 rounded-lg w-1/2"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-white/10 rounded-lg w-full"></div>
                        <div className="h-3 bg-white/10 rounded-lg w-5/6"></div>
                    </div>
                </div>
            ))}
        </>
    );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
            <div className="p-4 border-b border-white/10 bg-white/5">
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                    {Array.from({ length: columns }).map((_, i) => (
                        <div key={i} className="h-4 bg-white/10 rounded-lg"></div>
                    ))}
                </div>
            </div>
            <div className="p-4 space-y-3">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div key={colIndex} className="h-10 bg-white/10 rounded-lg"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Profile Skeleton
export const ProfileSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div className="w-48 h-48 bg-white/10 rounded-3xl"></div>
                <div className="flex-1 space-y-4">
                    <div className="h-8 bg-white/10 rounded-lg w-1/2"></div>
                    <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded-lg w-2/3"></div>
                    <div className="flex gap-3">
                        <div className="h-10 bg-white/10 rounded-xl w-32"></div>
                        <div className="h-10 bg-white/10 rounded-xl w-32"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stats Skeleton
export const StatsSkeleton = ({ count = 4 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-6 animate-pulse">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl mb-4"></div>
                    <div className="h-8 bg-white/10 rounded-lg w-2/3 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded-lg w-1/2"></div>
                </div>
            ))}
        </div>
    );
};

// List Skeleton
export const ListSkeleton = ({ count = 5 }) => {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 bg-white/10 rounded-xl shrink-0"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
                        <div className="h-3 bg-white/10 rounded-lg w-1/2"></div>
                    </div>
                    <div className="w-24 h-8 bg-white/10 rounded-lg shrink-0"></div>
                </div>
            ))}
        </div>
    );
};

// Chart Skeleton
export const ChartSkeleton = () => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 animate-pulse">
            <div className="h-6 bg-white/10 rounded-lg w-1/3 mb-6"></div>
            <div className="h-64 bg-white/10 rounded-2xl"></div>
        </div>
    );
};

// Page Skeleton (Full page loader)
export const PageSkeleton = () => {
    return (
        <div className="space-y-8">
            <div className="animate-pulse">
                <div className="h-8 bg-white/10 rounded-lg w-1/4 mb-2"></div>
                <div className="h-4 bg-white/10 rounded-lg w-1/3"></div>
            </div>
            <StatsSkeleton count={4} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartSkeleton />
                <ChartSkeleton />
            </div>
        </div>
    );
};

export default {
    CardSkeleton,
    TableSkeleton,
    ProfileSkeleton,
    StatsSkeleton,
    ListSkeleton,
    ChartSkeleton,
    PageSkeleton
};
