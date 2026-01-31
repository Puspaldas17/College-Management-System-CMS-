const express = require('express');
const router = express.Router();
const {
    createExam,
    getExams,
    addExamSchedule,
    addResult,
    getResults
} = require('../controllers/examController');
const { protect, admin, teacher } = require('../middleware/authMiddleware');

router.post('/', protect, admin, createExam);
router.get('/', protect, getExams);

router.post('/:id/schedule', protect, admin, addExamSchedule);

router.post('/results', protect, addResult); // Admin or Teacher can add results
router.get('/:examId/results', protect, getResults);

module.exports = router;
