import { useState } from "react";
import { Search, Filter, MoreVertical, Shield, Ban, Trash2, CheckCircle } from "lucide-react";

const UsersManagement = () => {
    // Dummy Data
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Athlete", status: "Active", verified: true },
        { id: 2, name: "Jane Smith", email: "jane@coach.com", role: "Coach", status: "Active", verified: true },
        { id: 3, name: "Future Stars Academy", email: "admin@stars.com", role: "Academy", status: "Pending", verified: false },
        { id: 4, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Suspended", verified: false },
        { id: 5, name: "Sarah Connor", email: "sarah@athlete.com", role: "Athlete", status: "Active", verified: true },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
    };

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Users Management</h1>
                    <p className="text-gray-400">Manage all registered users, roles, and statuses.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-red-500/50"
                        />
                    </div>
                    <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-6 text-xs font-black uppercase tracking-wider text-gray-500">Name</th>
                                <th className="p-6 text-xs font-black uppercase tracking-wider text-gray-500">Role</th>
                                <th className="p-6 text-xs font-black uppercase tracking-wider text-gray-500">Status</th>
                                <th className="p-6 text-xs font-black uppercase tracking-wider text-gray-500">Verified</th>
                                <th className="p-6 text-xs font-black uppercase tracking-wider text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                    <td className="p-6 font-medium text-white">
                                        <div>{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
                                            ${user.role === 'Athlete' ? 'bg-blue-500/10 text-blue-500' :
                                                user.role === 'Coach' ? 'bg-purple-500/10 text-purple-500' :
                                                    user.role === 'Academy' ? 'bg-orange-500/10 text-orange-500' :
                                                        'bg-gray-500/10 text-gray-500'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider 
                                            ${user.status === 'Active' ? 'text-green-500' :
                                                user.status === 'Suspended' ? 'text-red-500' :
                                                    'text-yellow-500'}`}>
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' :
                                                user.status === 'Suspended' ? 'bg-red-500' :
                                                    'bg-yellow-500'}`} />
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        {user.verified ? (
                                            <CheckCircle size={18} className="text-blue-500" />
                                        ) : (
                                            <span className="text-gray-600">-</span>
                                        )}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {user.status !== 'Active' ? (
                                                <button
                                                    onClick={() => handleStatusChange(user.id, 'Active')}
                                                    className="p-2 hover:bg-green-500/10 text-gray-400 hover:text-green-500 rounded-lg transition-colors"
                                                    title="Activate"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleStatusChange(user.id, 'Suspended')}
                                                    className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                                    title="Suspend"
                                                >
                                                    <Ban size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersManagement;
