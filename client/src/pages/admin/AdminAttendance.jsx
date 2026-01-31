import { useState, useEffect } from 'react';
import api from '../../api';
import Layout from '../../components/Layout';

const AdminAttendance = () => {
    const [analytics, setAnalytics] = useState({
        today: {
            total: 0,
            present: 0,
            absent: 0,
            percentage: 0
        },
        lowAttendance: []
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const { data } = await api.get('/admin/attendance-analytics');
            setAnalytics(data);
        } catch (error) {
            console.error('Error fetching attendance analytics:', error);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Attendance Analytics</h1>

                {/* Daily Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                        <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Today's Attendance</h3>
                        <p className="text-3xl font-bold text-indigo-700">{analytics.today.percentage}%</p>
                        <p className="text-xs text-gray-500 mt-1">Total Records: {analytics.today.total}</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                        <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Present</h3>
                        <p className="text-3xl font-bold text-green-700">{analytics.today.present}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                        <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Absent</h3>
                        <p className="text-3xl font-bold text-red-700">{analytics.today.absent}</p>
                    </div>

                     <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                        <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">At Risk Students</h3>
                        <p className="text-3xl font-bold text-yellow-700">{analytics.lowAttendance.length}</p>
                    </div>
                </div>

                {/* Low Attendance Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">Low Attendance Students (&lt; 75%)</h2>
                        {analytics.lowAttendance.length > 0 && (
                             <button className="bg-red-50 text-red-600 px-4 py-2 rounded text-sm font-bold hover:bg-red-100 transition">
                                🔔 Notify All
                            </button>
                        )}
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {analytics.lowAttendance.length > 0 ? (
                                    analytics.lowAttendance.map((student, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{student.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{student.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                                                    {student.percentage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-indigo-600 hover:text-indigo-900">Notify</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-gray-500 italic">
                                            🎉 Great news! No students are below 75% attendance.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminAttendance;
