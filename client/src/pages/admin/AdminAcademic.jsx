import { useState, useEffect } from 'react';
import api from '../../api';
import Layout from '../../components/Layout';

const AdminAcademic = () => {
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [deptForm, setDeptForm] = useState({ name: '', code: '' });
    const [subjectForm, setSubjectForm] = useState({ name: '', code: '', departmentId: '', credits: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const deptRes = await api.get('/admin/departments');
            const subRes = await api.get('/admin/subjects');
            setDepartments(deptRes.data);
            setSubjects(subRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeptSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/departments', deptForm);
            setDeptForm({ name: '', code: '' });
            fetchData();
        } catch (error) {
            alert('Error adding department');
        }
    };

    const handleSubjectSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/subjects', subjectForm);
            setSubjectForm({ name: '', code: '', departmentId: '', credits: '' });
            fetchData();
        } catch (error) {
            alert('Error adding subject');
        }
    };

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Departments Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Departments</h2>
                    <form onSubmit={handleDeptSubmit} className="mb-4">
                        <div className="grid grid-cols-1 gap-2">
                            <input
                                type="text"
                                placeholder="Department Name"
                                className="border p-2 rounded"
                                value={deptForm.name}
                                onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                                required
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Code (e.g. CSE)"
                                    className="border p-2 rounded flex-1"
                                    value={deptForm.code}
                                    onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })}
                                    required
                                />
                                <button type="submit" className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700">Add</button>
                            </div>
                        </div>
                    </form>
                    <ul className="space-y-2 max-h-64 overflow-y-auto">
                        {departments.map((dept) => (
                            <li key={dept._id} className="flex justify-between bg-gray-50 p-3 rounded border">
                                <span className="font-medium">{dept.name}</span>
                                <span className="text-gray-500 text-sm bg-gray-200 px-2 py-1 rounded">{dept.code}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Subjects Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Subjects</h2>
                    <form onSubmit={handleSubjectSubmit} className="mb-4 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                placeholder="Subject Name"
                                className="border p-2 rounded"
                                value={subjectForm.name}
                                onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Code (e.g. CS101)"
                                className="border p-2 rounded"
                                value={subjectForm.code}
                                onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                className="border p-2 rounded"
                                value={subjectForm.departmentId}
                                onChange={(e) => setSubjectForm({ ...subjectForm, departmentId: e.target.value })}
                                required
                            >
                                <option value="">Select Dept</option>
                                {departments.map((d) => (
                                    <option key={d._id} value={d._id}>{d.name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Credits"
                                className="border p-2 rounded"
                                value={subjectForm.credits}
                                onChange={(e) => setSubjectForm({ ...subjectForm, credits: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Subject</button>
                    </form>
                    <ul className="space-y-2 max-h-64 overflow-y-auto">
                        {subjects.map((sub) => (
                            <li key={sub._id} className="bg-gray-50 p-3 rounded border">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">{sub.name} <span className="text-xs text-gray-500">({sub.code})</span></span>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{sub.department?.name || 'N/A'}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default AdminAcademic;
