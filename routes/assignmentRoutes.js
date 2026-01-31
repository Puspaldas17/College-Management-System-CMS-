const express = require('express');
const router = express.Router();
const { createAssignment, getClassAssignments, submitAssignment, getAssignmentSubmissions } = require('../controllers/assignmentController');
const { protect, teacher, student } = require('../middleware/authMiddleware'); // Assuming student middleware exists or protect checks role

router.post('/', protect, teacher, createAssignment);
router.get('/class/:classId', protect, getClassAssignments);
router.post('/:id/submit', protect, submitAssignment); // Add student check if needed
router.get('/:id/submissions', protect, teacher, getAssignmentSubmissions);

module.exports = router;
