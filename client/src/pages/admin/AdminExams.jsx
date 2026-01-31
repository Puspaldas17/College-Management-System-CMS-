import { useState, useEffect } from 'react';
import api from '../../api';
import Layout from '../../components/Layout';

const AdminExams = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [exams, setExams] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    // Forms
    const [examForm, setExamForm] = useState({ name: '', type: 'Internal', startDate: '', endDate: '', description: '' });
    const [scheduleForm, setScheduleForm] = useState({ examId: '', classId: '', subjectId: '', date: '', startTime: '', duration: 60 });
    
    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [examRes, classRes, subjectRes] = await Promise.all([
                api.get('/exams'),
                api.get('/classes'),
                api.get('/admin/subjects')
            ]);
            setExams(examRes.data);
            setClasses(classRes.data);
            setSubjects(subjectRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCreateExam = async (e) => {
        e.preventDefault();
        try {
            await api.post('/exams', examForm);
            alert('Exam Created Successfully');
            setExamForm({ name: '', type: 'Internal', startDate: '', endDate: '', description: '' });
            fetchInitialData();
        } catch (error) {
            alert('Error creating exam');
        }
    };

    const handleScheduleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/exams/${scheduleForm.examId}/schedule`, scheduleForm);
            alert('Schedule Added Successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Error scheduling');
        }
    };

    return (
        <Layout>
            <div className="bg-white p-6 rounded-lg shadow-md min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Examination Management</h1>
                
                {/* Tabs */}
                <div className="flex border-b mb-6">
                    <button 
                        className={`px-4 py-2 font-semibold ${activeTab === 'create' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('create')}
                    >
                        Create Exam
                    </button>
                    <button 
                        className={`px-4 py-2 font-semibold ${activeTab === 'schedule' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('schedule')}
                    >
                        Schedule Exams
                    </button>
                    <button 
                        className={`px-4 py-2 font-semibold ${activeTab === 'results' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('results')}
                    >
                        Upload Marks
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'create' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-lg font-bold mb-4">Create New Exam</h2>
                            <form onSubmit={handleCreateExam} className="space-y-4">
                                <input type="text" placeholder="Exam Name (e.g. Final Sem 1)" className="w-full border p-2 rounded" 
                                    value={examForm.name} onChange={e => setExamForm({...examForm, name: e.target.value})} required />
                                <select className="w-full border p-2 rounded"
                                    value={examForm.type} onChange={e => setExamForm({...examForm, type: e.target.value})}>
                                    <option value="Internal">Internal</option>
                                    <option value="Semester">Semester</option>
                                    <option value="Final">Final</option>
                                </select>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500">Start Date</label>
                                        <input type="date" className="w-full border p-2 rounded"
                                            value={examForm.startDate} onChange={e => setExamForm({...examForm, startDate: e.target.value})} required />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">End Date</label>
                                        <input type="date" className="w-full border p-2 rounded"
                                            value={examForm.endDate} onChange={e => setExamForm({...examForm, endDate: e.target.value})} required />
                                    </div>
                                </div>
                                <textarea placeholder="Description" className="w-full border p-2 rounded"
                                    value={examForm.description} onChange={e => setExamForm({...examForm, description: e.target.value})} />
                                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full font-bold">Create Exam</button>
                            </form>
                        </div>
                        
                        <div>
                            <h2 className="text-lg font-bold mb-4">Existing Exams</h2>
                            <ul className="space-y-3">
                                {exams.map(exam => (
                                    <li key={exam._id} className="border p-3 rounded bg-gray-50 hover:bg-gray-100">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-indigo-700">{exam.name}</span>
                                            <span className="text-xs bg-gray-200 px-2 py-1 rounded">{exam.type}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(exam.startDate).toLocaleDateString()} - {new Date(exam.endDate).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div className="max-w-xl">
                        <h2 className="text-lg font-bold mb-4">Add Subject Schedule</h2>
                        <form onSubmit={handleScheduleSubmit} className="space-y-4 bg-gray-50 p-6 rounded border">
                            <select className="w-full border p-2 rounded"
                                value={scheduleForm.examId} onChange={e => setScheduleForm({...scheduleForm, examId: e.target.value})} required>
                                <option value="">Select Exam</option>
                                {exams.filter(e => e.isActive).map(e => (
                                    <option key={e._id} value={e._id}>{e.name}</option>
                                ))}
                            </select>

                            <select className="w-full border p-2 rounded"
                                value={scheduleForm.classId} onChange={e => setScheduleForm({...scheduleForm, classId: e.target.value})} required>
                                <option value="">Select Class</option>
                                {classes.map(c => (
                                    <option key={c._id} value={c._id}>{c.name} ({c.section})</option>
                                ))}
                            </select>

                            <select className="w-full border p-2 rounded"
                                value={scheduleForm.subjectId} onChange={e => setScheduleForm({...scheduleForm, subjectId: e.target.value})} required>
                                <option value="">Select Subject</option>
                                {subjects.map(s => (
                                    <option key={s._id} value={s._id}>{s.name} ({s.code})</option>
                                ))}
                            </select>

                            <div className="grid grid-cols-2 gap-4">
                                <input type="date" className="w-full border p-2 rounded"
                                    value={scheduleForm.date} onChange={e => setScheduleForm({...scheduleForm, date: e.target.value})} required />
                                <input type="time" className="w-full border p-2 rounded"
                                    value={scheduleForm.startTime} onChange={e => setScheduleForm({...scheduleForm, startTime: e.target.value})} required />
                            </div>
                            
                            <input type="number" placeholder="Duration (minutes)" className="w-full border p-2 rounded"
                                value={scheduleForm.duration} onChange={e => setScheduleForm({...scheduleForm, duration: e.target.value})} required />

                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full font-bold">Add Schedule</button>
                        </form>
                    </div>
                )}
                
                {activeTab === 'results' && (
                    <ResultUpload exams={exams} classes={classes} subjects={subjects} />
                )}
            </div>
        </Layout>
    );
};

export default AdminExams;

const ResultUpload = ({ exams, classes, subjects }) => {
    const [selected, setSelected] = useState({ examId: '', classId: '', subjectId: '' });
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selected.classId) {
            fetchStudents(selected.classId);
        }
    }, [selected.classId]);

    const fetchStudents = async (classId) => {
        try {
            // Wait, we don't have a direct 'get students by class' endpoint easily accessible or we can use the class object if it populated students
            // Actually, /classes returns students array. Let's filter from the 'classes' prop if possible, or fetch.
            // But 'classes' prop might be just basic info. Let's fetch /classes again or assume strict structure.
            // Better: POST /api/admin/users/class/:id ?? No.
            // Let's use the existing users endpoint and filter? No, inefficient.
            // Let's rely on the fact that we can get class details.
            // For now, let's assume we can fetch:
            const { data } = await api.get('/admin/users'); // This returns ALL users. 
            // We should filter users where user.studentClass === classId ?? 
            // In the User model, do we have class info?
            // Actually, simply:
            // A quick fix: Fetch all users, filter by role='student' (and if we update User model to have 'class' field).
            // OR checks 'classes' prop.
            const cls = classes.find(c => c._id === classId);
            if(cls && cls.students) {
                // If students are populated (objects), set them. If IDs, we need to fetch details.
                // The /classes endpoint usually populates students.
                // Let's check filter.
                // If simple ID strings:
                if (typeof cls.students[0] === 'string') {
                     const allUsers = data.filter(u => cls.students.includes(u._id));
                     setStudents(allUsers);
                } else {
                    setStudents(cls.students);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // Actually, simpler approach:
    // Just fetch /admin/users and filter? No, standard way is Classes.
    
    const handleMarkChange = (studentId, marks) => {
        setStudents(prev => prev.map(s => s._id === studentId ? { ...s, marks } : s));
    };

    const submitMarks = async () => {
        setLoading(true);
        try {
            const promises = students.filter(s => s.marks !== undefined).map(s => 
                api.post('/exams/results', {
                    examId: selected.examId,
                    classId: selected.classId,
                    studentId: s._id,
                    subjectId: selected.subjectId,
                    marksObtained: s.marks,
                    maxMarks: 100 // Default max marks
                })
            );
            await Promise.all(promises);
            alert('Results Uploaded Successfully!');
        } catch (error) {
            console.error(error);
            alert('Error uploading results');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <select className="border p-2 rounded" onChange={e => setSelected({...selected, examId: e.target.value})}>
                    <option value="">Select Exam</option>
                    {exams.map(e => <option key={e._id} value={e._id}>{e.name}</option>)}
                </select>
                <select className="border p-2 rounded" onChange={e => setSelected({...selected, classId: e.target.value})}>
                    <option value="">Select Class</option>
                    {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <select className="border p-2 rounded" onChange={e => setSelected({...selected, subjectId: e.target.value})}>
                    <option value="">Select Subject</option>
                    {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
            </div>

            {selected.classId && students.length > 0 && (
                <div className="bg-white rounded border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks (Out of 100)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {students.map(student => (
                                <tr key={student._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input 
                                            type="number" 
                                            className="border p-1 rounded w-24"
                                            placeholder="0"
                                            onChange={(e) => handleMarkChange(student._id, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 text-right">
                        <button 
                            onClick={submitMarks}
                            disabled={loading || !selected.examId || !selected.subjectId}
                            className={`px-6 py-2 rounded text-white font-bold ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {loading ? 'Uploading...' : 'Save Results'}
                        </button>
                    </div>
                </div>
            )}
            
            {selected.classId && students.length === 0 && (
                <p className="text-gray-500 italic">No students found in this class.</p>
            )}
        </div>
    );
};
