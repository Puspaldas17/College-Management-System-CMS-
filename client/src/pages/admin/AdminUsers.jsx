import { useState, useEffect } from 'react';
import api from '../../api';
import Layout from '../../components/Layout';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterRole, setFilterRole] = useState('all'); // all, admin, teacher, student

    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (filterRole === 'all') {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user => user.role === filterRole));
        }
    }, [filterRole, users]);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/users/add', formData);
            setMessage('User added successfully');
            setFormData({ name: '', email: '', password: '', role: 'student' });
            fetchUsers();
        } catch (error) {
            setMessage('Error adding user');
        }
    };

    return (
        <Layout>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                    
                    {/* Filter Dropdown */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-600">Filter by Role:</span>
                        <select 
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="all">All Users</option>
                            <option value="admin">Admins</option>
                            <option value="teacher">Teachers</option>
                            <option value="student">Students</option>
                        </select>
                    </div>
                </div>

                {message && <div className="mb-4 text-sm text-blue-600 font-semibold">{message}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 items-end bg-gray-50 p-4 rounded border">
                    <div className="col-span-1 md:col-span-5 mb-2">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Add New User</h3>
                    </div>
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-2 rounded"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 rounded"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <select
                        className="border p-2 rounded"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 font-semibold">
                        + Add User
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr className="text-left">
                                <th className="py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th className="py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                <th className="py-3 px-4 uppercase font-semibold text-sm">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition">
                                        <td className="py-3 px-4 text-gray-700 font-medium">{user.name}</td>
                                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                        <td className="py-3 px-4 capitalize">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="py-4 text-center text-gray-500 italic">
                                        No users found for this filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default AdminUsers;
