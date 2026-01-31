const Exam = require('../models/Exam');
const Result = require('../models/Result');
const Class = require('../models/Class');
const Subject = require('../models/Subject');

// @desc    Create a new Exam
// @route   POST /api/exams
// @access  Private/Admin
const createExam = async (req, res) => {
    try {
        const { name, type, startDate, endDate, description } = req.body;
        const exam = await Exam.create({
            name,
            type,
            startDate,
            endDate,
            description
        });
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all Exams
// @route   GET /api/exams
// @access  Private/Admin/Teacher
const getExams = async (req, res) => {
    try {
        const exams = await Exam.find({}).sort({ startDate: -1 });
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add Schedule to Exam
// @route   POST /api/exams/:id/schedule
// @access  Private/Admin
const addExamSchedule = async (req, res) => {
    try {
        const { classId, subjectId, date, startTime, duration } = req.body;
        const exam = await Exam.findById(req.params.id);

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Check if schedule already exists for this class and subject
        const exists = exam.schedules.find(
            s => s.class.toString() === classId && s.subject.toString() === subjectId
        );

        if (exists) {
            return res.status(400).json({ message: 'Schedule for this subject already exists in this exam' });
        }

        exam.schedules.push({
            class: classId,
            subject: subjectId,
            date,
            startTime,
            duration
        });

        await exam.save();
        res.json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add/Update Result for a student
// @route   POST /api/exams/results
// @access  Private/Admin/Teacher
const addResult = async (req, res) => {
    try {
        const { examId, classId, studentId, subjectId, marksObtained, maxMarks } = req.body;

        const result = await Result.findOneAndUpdate(
            { exam: examId, student: studentId, subject: subjectId },
            {
                class: classId,
                marksObtained,
                maxMarks,
                grade: calculateGrade(marksObtained, maxMarks)
            },
            { new: true, upsert: true }
        );

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Helper: Calculate Grade
const calculateGrade = (marks, max) => {
    const percentage = (marks / max) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
};

// @desc    Get Results (by Exam & Class)
// @route   GET /api/exams/:examId/results
// @access  Private
const getResults = async (req, res) => {
    try {
        const { classId } = req.query;
        let query = { exam: req.params.examId };
        if (classId) query.class = classId;

        const results = await Result.find(query)
            .populate('student', 'name email')
            .populate('subject', 'name code');
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createExam,
    getExams,
    addExamSchedule,
    addResult,
    getResults
};
