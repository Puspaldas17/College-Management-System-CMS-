import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ role }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-indigo-800 text-white' : 'text-gray-300 hover:bg-indigo-800 hover:text-white';
    };

    const adminLinks = [
        { path: '/admin', label: 'Dashboard' },
        { path: '/admin/users', label: 'Users' },
        { path: '/admin/academic', label: 'Academic' },
        { path: '/admin/timetable', label: 'Timetable' },
        { path: '/admin/notifications', label: 'Notifications' },
    ];

    const teacherLinks = [
        { path: '/teacher', label: 'Dashboard' },
        { path: '/teacher/classes', label: 'My Classes' },
    ];

    const studentLinks = [
        { path: '/student', label: 'Dashboard' },
    ];

    let links = [];
    if (role === 'admin') links = adminLinks;
    else if (role === 'teacher') links = teacherLinks;
    else if (role === 'student') links = studentLinks;

    return (
        <div className="w-64 bg-indigo-900 min-h-screen text-white flex flex-col">
            <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-indigo-800">
                LMS Admin
            </div>
            <nav className="flex-1 px-2 py-4 space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2 rounded-md transition duration-200 ${isActive(link.path)}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
