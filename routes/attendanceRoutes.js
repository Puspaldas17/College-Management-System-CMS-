const express = require('express');
const router = express.Router();
const { markAttendance, getStudentAttendance } = require('../controllers/attendanceController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.post('/', protect, teacher, markAttendance);
router.get('/student/:studentId', protect, getStudentAttendance);

module.exports = router;
