const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

// @desc    Create a new assignment
// @route   POST /api/assignments
// @access  Teacher
const createAssignment = async (req, res) => {
    try {
        const { title, description, classId, dueDate, fileUrl } = req.body;

        const assignment = await Assignment.create({
            title,
            description,
            class: classId,
            teacher: req.user._id,
            dueDate,
            fileUrl
        });

        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get assignments for a class
// @route   GET /api/assignments/class/:classId
// @access  Teacher/Student
const getClassAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ class: req.params.classId })
            .populate('teacher', 'name email');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit an assignment
// @route   POST /api/assignments/:id/submit
// @access  Student
const submitAssignment = async (req, res) => {
    try {
        const { link } = req.body;
        const assignmentId = req.params.id;

        // Check if already submitted
        const existingSubmission = await Submission.findOne({
            assignment: assignmentId,
            student: req.user._id
        });

        if (existingSubmission) {
            return res.status(400).json({ message: 'Assignment already submitted' });
        }

        const submission = await Submission.create({
            assignment: assignmentId,
            student: req.user._id,
            link
        });

        res.status(201).json(submission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get submissions for an assignment
// @route   GET /api/assignments/:id/submissions
// @access  Teacher
const getAssignmentSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ assignment: req.params.id })
            .populate('student', 'name email');
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAssignment,
    getClassAssignments,
    submitAssignment,
    getAssignmentSubmissions
};
