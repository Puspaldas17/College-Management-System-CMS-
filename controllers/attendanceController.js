const Attendance = require('../models/Attendance');

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Teacher
const markAttendance = async (req, res) => {
    try {
        const { classId, studentId, status, date } = req.body;
        const attendance = await Attendance.create({
            class: classId,
            student: studentId,
            status,
            date: date || Date.now()
        });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get student attendance
// @route   GET /api/attendance/student/:studentId
// @access  Private
const getStudentAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ student: req.params.studentId }).populate('class', 'name');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    markAttendance,
    getStudentAttendance
};
