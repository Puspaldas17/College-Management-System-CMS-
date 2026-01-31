const User = require('../models/User');
const Department = require('../models/Department');
const Subject = require('../models/Subject');
const Timetable = require('../models/Timetable');
const generateToken = require('../utils/generateToken');

// @desc    Add a new user (Teacher/Student)
// @route   POST /api/admin/users/add
// @access  Private/Admin
const addUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create Department
// @route   POST /api/admin/departments
// @access  Private/Admin
const createDepartment = async (req, res) => {
    try {
        const { name, code } = req.body;
        const department = await Department.create({ name, code });
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get All Departments
// @route   GET /api/admin/departments
// @access  Private/Admin
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find({});
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create Subject
// @route   POST /api/admin/subjects
// @access  Private/Admin
const createSubject = async (req, res) => {
    try {
        const { name, code, departmentId, credits } = req.body;
        const subject = await Subject.create({
            name,
            code,
            department: departmentId,
            credits
        });
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get All Subjects
// @route   GET /api/admin/subjects
// @access  Private/Admin
const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({}).populate('department', 'name');
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create Timetable Entry
// @route   POST /api/admin/timetable
// @access  Private/Admin
const createTimetableEntry = async (req, res) => {
    try {
        const { classId, subjectId, teacherId, day, startTime, endTime } = req.body;
        const timetable = await Timetable.create({
            class: classId,
            subject: subjectId,
            teacher: teacherId,
            day,
            startTime,
            endTime
        });
        res.status(201).json(timetable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get Timetable
// @route   GET /api/admin/timetable
// @access  Private/Admin
const getTimetable = async (req, res) => {
    try {
        const { classId } = req.query; // Filter by class
        let query = {};
        if (classId) query.class = classId;

        const timetable = await Timetable.find(query)
            .populate('class', 'name')
            .populate('subject', 'name')
            .populate('teacher', 'name');

        res.json(timetable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addUser,
    getUsers,
    createDepartment,
    getDepartments,
    createSubject,
    getSubjects,
    createTimetableEntry,
    getTimetable
};
