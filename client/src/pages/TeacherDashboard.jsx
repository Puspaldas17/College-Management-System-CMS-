import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('userInfo');
        if (user) {
            setUserInfo(JSON.parse(user));
        }
    }, []);

    // Mock Data
    const classes = [
        { id: 1, name: 'Computer Science 101', time: 'Mon, Wed 10:00 AM', students: 45 },
        { id: 2, name: 'Data Structures', time: 'Tue, Thu 02:00 PM', students: 38 },
        { id: 3, name: 'Web Development', time: 'Fri 09:00 AM', students: 50 },
    ];

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-2xl`}>
                <div className="h-20 flex items-center justify-center border-b border-slate-700 bg-slate-900">
                    <h1 className="text-2xl font-extrabold text-white tracking-wide">CMS Teacher</h1>
                </div>
                <nav className="mt-6 px-4 space-y-3">
                    <a href="#" className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl shadow-md transition-all transform hover:scale-105">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        <span className="font-semibold">My Classes</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                        <span className="font-medium">Attendance</span>
                    </a>
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-red-600 rounded-lg transition-colors">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                <header className="h-20 bg-white shadow-md flex items-center justify-between px-8 z-10 border-b border-gray-200">
                    <div className="md:hidden">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none p-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome, {userInfo?.name || 'Teacher'}
                    </h2>
                    <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">T</div>
                        <span className="text-sm font-semibold text-gray-700 pr-2">Teacher</span>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {classes.map((cls) => (
                            <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cls.name}</h3>
                                    <p className="text-gray-600 font-medium mb-4 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {cls.time}
                                    </p>
                                    <div className="flex justify-between items-center mt-6">
                                        <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{cls.students} Students</span>
                                        <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">View Details &rarr;</button>
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center py-2 px-4 rounded-lg bg-white border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-colors">
                                        Attendance
                                    </button>
                                    <button className="flex items-center justify-center py-2 px-4 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors">
                                        Assignment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboard;
