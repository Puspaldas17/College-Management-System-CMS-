import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const role = userInfo?.role;

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar role={role} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
