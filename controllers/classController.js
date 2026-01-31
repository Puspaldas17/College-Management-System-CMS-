const Class = require('../models/Class');

// @desc    Create a new class
// @route   POST /api/classes
// @access  Admin
const createClass = async (req, res) => {
    try {
        const { name, section, teacherId } = req.body;
        const newClass = await Class.create({
            name,
            section,
            teacher: teacherId
        });
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all classes
// @route   GET /api/classes
// @access  Admin/Teacher
const getClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('teacher', 'name email').populate('students', 'name email');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createClass,
    getClasses
};
