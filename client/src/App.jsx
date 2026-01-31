import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAcademic from './pages/admin/AdminAcademic';
import AdminTimetable from './pages/admin/AdminTimetable';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminClasses from './pages/admin/AdminClasses';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminExams from './pages/admin/AdminExams';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

// Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-3xl shadow-xl max-w-2xl text-center z-10 transition-transform hover:scale-105 duration-500">
        <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
          College Management <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-100">
            System
          </span>
        </h1>
        <p className="text-indigo-100 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
          Streamline academic operations, manage attendance, track assignments, and stay connected. All in one place.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center px-8 py-4 text-lg font-bold text-indigo-700 bg-white rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Access Portal
          <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      <footer className="absolute bottom-4 text-white/50 text-sm">
        &copy; {new Date().getFullYear()} College Management System. All rights reserved.
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/academic" element={<AdminAcademic />} />
        <Route path="/admin/timetable" element={<AdminTimetable />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/classes" element={<AdminClasses />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/exams" element={<AdminExams />} />
        
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
