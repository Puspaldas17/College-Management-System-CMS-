import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('userInfo');
        if (user) {
            setUserInfo(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-2xl`}>
                <div className="h-20 flex items-center justify-center border-b border-slate-700 bg-slate-900">
                    <h1 className="text-2xl font-extrabold text-white tracking-wide">CMS Student</h1>
                </div>
                <nav className="mt-6 px-4 space-y-3">
                    <a href="#" className="flex items-center px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-md transition-all transform hover:scale-105">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        <span className="font-semibold">Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                        <span className="font-medium">My Grades</span>
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
                    <h2 className="text-2xl font-bold text-gray-800">Student Portal</h2>
                    <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">S</div>
                        <span className="text-sm font-semibold text-gray-700 pr-2">Student</span>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
                        <h2 className="text-3xl font-extrabold mb-2">Hello, {userInfo?.name || 'Student'}! 👋</h2>
                        <p className="text-indigo-100 font-medium">You have 2 pending assignments and your attendance is 85%.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Timetable Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h3>
                            <div className="space-y-4">
                                <div className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                                    <div className="w-16 text-center font-bold text-gray-500 text-sm">09:00 AM</div>
                                    <div className="w-1 h-8 bg-indigo-500 rounded-full mx-4"></div>
                                    <div>
                                        <p className="font-bold text-gray-800">Web Development</p>
                                        <p className="text-xs text-gray-500">Room 304</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                                    <div className="w-16 text-center font-bold text-gray-500 text-sm">11:00 AM</div>
                                    <div className="w-1 h-8 bg-green-500 rounded-full mx-4"></div>
                                    <div>
                                        <p className="font-bold text-gray-800">Database Systems</p>
                                        <p className="text-xs text-gray-500">Lab 2</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assignment Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Pending Assignments</h3>
                            <div className="space-y-3">
                                <div className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-gray-800">Project Proposal</p>
                                            <p className="text-xs text-gray-500 mt-1">Due Tomorrow</p>
                                        </div>
                                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md">High Priority</span>
                                    </div>
                                </div>
                                <div className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-gray-800">React Components</p>
                                            <p className="text-xs text-gray-500 mt-1">Due in 3 days</p>
                                        </div>
                                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-md">Medium</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;
