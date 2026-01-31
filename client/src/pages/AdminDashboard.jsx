import Layout from '../components/Layout';

const AdminDashboard = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <h3 className="text-gray-500 text-sm font-uppercase font-bold mb-2">Total Students</h3>
                    <p className="text-3xl font-bold text-gray-800">1,240</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-uppercase font-bold mb-2">Total Teachers</h3>
                    <p className="text-3xl font-bold text-gray-800">45</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-uppercase font-bold mb-2">Departments</h3>
                    <p className="text-3xl font-bold text-gray-800">8</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Use the sidebar to manage users, academic structure, and attendance.</p>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
