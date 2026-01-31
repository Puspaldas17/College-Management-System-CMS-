const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional verify if installed or remove
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();

        const users = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: '123456',
                role: 'admin',
            },
            {
                name: 'Test Teacher',
                email: 'teacher@example.com',
                password: 'password123',
                role: 'teacher',
            },
            {
                name: 'Test Student',
                email: 'student@example.com',
                password: 'password123',
                role: 'student',
            }
        ];

        // Use create() for each user to trigger pre-save middleware (hashing)
        for (const user of users) {
            await User.create(user);
        }

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
