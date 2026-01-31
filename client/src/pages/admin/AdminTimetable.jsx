import { useState, useEffect } from 'react';
import api from '../../api';
import Layout from '../../components/Layout';

const AdminTimetable = () => {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [timetable, setTimetable] = useState([]);
    
    // Selection state for viewing
    const [selectedClassId, setSelectedClassId] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        classId: '',
        subjectId: '',
        teacherId: '',
        day: 'Monday',
        startTime: '',
        endTime: ''
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedClassId) {
            fetchTimetable(selectedClassId);
            setFormData(prev => ({ ...prev, classId: selectedClassId })); // Auto-fill form
        }
    }, [selectedClassId]);

    const fetchInitialData = async () => {
        try {
            const classesRes = await api.get('/classes');
            const subjectsRes = await api.get('/admin/subjects');
            const usersRes = await api.get('/admin/users');
            
            setClasses(classesRes.data);
            setSubjects(subjectsRes.data);
            // Filter only teachers
            setTeachers(usersRes.data.filter(user => user.role === 'teacher'));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchTimetable = async (classId) => {
        try {
            const { data } = await api.get(`/admin/timetable?classId=${classId}`);
            setTimetable(data);
        } catch (error) {
            console.error('Error fetching timetable:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/timetable', formData);
            alert('Slot added successfully');
            if (selectedClassId) fetchTimetable(selectedClassId);
            // Optional: clear form logic
        } catch (error) {
            alert('Error adding timetable slot');
            console.error(error);
        }
    };

    const getDaySchedule = (day) => {
        return timetable
            .filter(t => t.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row gap-6 h-full">
                
                {/* Left Panel: Controls & Form */}
                <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Manage Timetable</h2>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Select Class to View</label>
                        <select 
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={selectedClassId}
                            onChange={(e) => setSelectedClassId(e.target.value)}
                        >
                            <option value="">-- Select Class --</option>
                            {classes.map(c => (
                                <option key={c._id} value={c._id}>{c.name} ({c.section})</option>
                            ))}
                        </select>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <h3 className="text-lg font-semibold mb-3 text-indigo-700">Add New Slot</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Class is auto-selected if viewing, but editable */}
                        <div>
                            <label className="text-xs font-bold text-gray-500">Class</label>
                            <select 
                                className="w-full border p-2 rounded"
                                value={formData.classId}
                                onChange={(e) => setFormData({...formData, classId: e.target.value})}
                                required
                            >
                                <option value="">Select Class</option>
                                {classes.map(c => (
                                    <option key={c._id} value={c._id}>{c.name} ({c.section})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500">Subject</label>
                            <select 
                                className="w-full border p-2 rounded"
                                value={formData.subjectId}
                                onChange={(e) => setFormData({...formData, subjectId: e.target.value})}
                                required
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(s => (
                                    <option key={s._id} value={s._id}>{s.name} ({s.code})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500">Teacher</label>
                            <select 
                                className="w-full border p-2 rounded"
                                value={formData.teacherId}
                                onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                                required
                            >
                                <option value="">Select Teacher</option>
                                {teachers.map(t => (
                                    <option key={t._id} value={t._id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                             <div>
                                <label className="text-xs font-bold text-gray-500">Start Time</label>
                                <input 
                                    type="time" 
                                    className="w-full border p-2 rounded"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500">End Time</label>
                                <input 
                                    type="time" 
                                    className="w-full border p-2 rounded"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500">Day</label>
                            <div className="grid grid-cols-3 gap-2">
                                {days.map(d => (
                                    <button 
                                        key={d}
                                        type="button"
                                        onClick={() => setFormData({...formData, day: d})}
                                        className={`text-xs py-1 rounded border ${
                                            formData.day === d ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-600'
                                        }`}
                                    >
                                        {d.slice(0, 3)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition mt-4">
                            + Add to Timetable
                        </button>
                    </form>
                </div>

                {/* Right Panel: Timetable Display */}
                <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        {selectedClassId 
                            ? `Weekly Schedule: ${classes.find(c => c._id === selectedClassId)?.name || ''}` 
                            : 'Select a class to view schedule'}
                    </h2>

                    {selectedClassId ? (
                        <div className="space-y-6">
                            {days.map(day => {
                                const daySlots = getDaySchedule(day);
                                if (daySlots.length === 0) return null;

                                return (
                                    <div key={day} className="border-b pb-4">
                                        <h3 className="font-bold text-indigo-700 mb-2">{day}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {daySlots.map(slot => (
                                                <div key={slot._id} className="bg-gray-50 border-l-4 border-blue-500 p-3 rounded shadow-sm">
                                                    <p className="font-bold text-gray-800 text-sm">{slot.subject?.name}</p>
                                                    <p className="text-xs text-gray-500">{slot.startTime} - {slot.endTime}</p>
                                                    <p className="text-xs text-gray-600 mt-1">👨‍🏫 {slot.teacher?.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                            {timetable.length === 0 && <p className="text-gray-400 italic">No slots scheduled yet.</p>}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <p>Select a class from the left panel to execute operations.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminTimetable;
