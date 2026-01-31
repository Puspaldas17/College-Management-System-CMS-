import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="h-16 bg-white shadow flex items-center justify-between px-8">
            <h2 className="text-xl font-semibold text-gray-800">
                Welcome, {userInfo?.name}
            </h2>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
