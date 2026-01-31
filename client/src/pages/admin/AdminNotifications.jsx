import { useState } from 'react';
import api from '../../api';
import Layout from '../../components/Layout';

const AdminNotifications = () => {
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        recipientType: 'all', // all, student, teacher
        recipientId: '' // Optional, for future specific user targeting
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/notifications', formData);
            setStatus({ type: 'success', msg: 'Notification sent successfully!' });
            setFormData({ title: '', message: '', recipientType: 'all', recipientId: '' });
        } catch (error) {
            setStatus({ type: 'error', msg: error.response?.data?.message || 'Error sending notification' });
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Send Notification</h2>

                {status.msg && (
                    <div className={`p-4 rounded-md mb-6 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Exam Schedule Release"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                        <textarea
                            placeholder="Enter the main content of the notification..."
                            rows="4"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Group</label>
                        <div className="flex gap-4">
                            {['all', 'student', 'teacher'].map((type) => (
                                <label key={type} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="recipientType"
                                        value={type}
                                        checked={formData.recipientType === type}
                                        onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                                        className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 capitalize text-gray-700 font-medium">{type === 'all' ? 'Everyone' : type + 's'}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md"
                    >
                        Send Notification 🚀
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AdminNotifications;
