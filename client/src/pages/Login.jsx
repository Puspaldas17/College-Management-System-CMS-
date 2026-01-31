import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Login = () => {
    const [role, setRole] = useState('student'); // Default role
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Send selected role to backend for verification
            const { data } = await api.post('/auth/login', {
                email: email.trim(),
                password,
                role
            });
            localStorage.setItem('userInfo', JSON.stringify(data));

            if (data.role === 'admin') navigate('/admin');
            else if (data.role === 'teacher') navigate('/teacher');
            else navigate('/student');
        } catch (err) {
            console.error('Login Error:', err);
            const errorMessage = err.response?.data?.message
                ? err.response.data.message
                : 'Connection failed. Is the server running?';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setError(''); // Clear error when switching tabs
    };

    const tabs = [
        { id: 'admin', label: 'Admin' },
        { id: 'teacher', label: 'Teacher' },
        { id: 'student', label: 'Student' }
    ];

    // Static color mapping for Tailwind
    const roleColors = {
        admin: {
            bg: 'bg-indigo-50',
            header: 'bg-indigo-600',
            textRef: 'text-indigo-700',
            border: 'border-indigo-600',
            tabBg: 'bg-indigo-50',
            focusRing: 'focus:ring-indigo-500',
            focusBorder: 'focus:border-indigo-500',
            checkboxText: 'text-indigo-600',
            button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
            linkHover: 'hover:text-indigo-700'
        },
        teacher: {
            bg: 'bg-blue-50',
            header: 'bg-blue-600',
            textRef: 'text-blue-700',
            border: 'border-blue-600',
            tabBg: 'bg-blue-50',
            focusRing: 'focus:ring-blue-500',
            focusBorder: 'focus:border-blue-500',
            checkboxText: 'text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
            linkHover: 'hover:text-blue-700'
        },
        student: {
            bg: 'bg-green-50',
            header: 'bg-green-600',
            textRef: 'text-green-700',
            border: 'border-green-600',
            tabBg: 'bg-green-50',
            focusRing: 'focus:ring-green-500',
            focusBorder: 'focus:border-green-500',
            checkboxText: 'text-green-600',
            button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
            linkHover: 'hover:text-green-700'
        }
    };

    const currentColors = roleColors[role];

    return (
        <div className={`min-h-screen flex items-center justify-center ${currentColors.bg} relative transition-colors duration-500`}>

            <div className="relative z-10 w-full max-w-md p-6">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

                    {/* Header */}
                    <div className={`${currentColors.header} p-8 text-center transition-colors duration-300`}>
                        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Welcome Back</h2>
                        <p className="text-white/80 font-medium">Login as {role.charAt(0).toUpperCase() + role.slice(1)}</p>
                    </div>

                    {/* Role Tabs */}
                    <div className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleRoleChange(tab.id)}
                                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors
                        ${role === tab.id
                                        ? `border-b-4 ${currentColors.border} ${currentColors.textRef} ${currentColors.tabBg}`
                                        : 'text-gray-400 hover:text-gray-600 bg-white'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-bold text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 ${currentColors.focusBorder} focus:bg-white focus:ring-2 ${currentColors.focusRing} transition-all outline-none text-gray-900 font-medium placeholder-gray-400`}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 ${currentColors.focusBorder} focus:bg-white focus:ring-2 ${currentColors.focusRing} transition-all outline-none text-gray-900 font-medium placeholder-gray-400`}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center text-gray-700 cursor-pointer font-medium">
                                    <input type="checkbox" className={`form-checkbox h-4 w-4 rounded border-gray-300 ${currentColors.checkboxText} focus:ring-transparent`} />
                                    <span className="ml-2">Remember me</span>
                                </label>
                                <a href="#" className={`font-bold ${currentColors.textRef} ${currentColors.linkHover}`}>Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white ${currentColors.button} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5`}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Sign In'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
                        <Link to="/" className={`text-sm text-gray-600 ${currentColors.linkHover} font-bold transition`}>
                            &larr; Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
