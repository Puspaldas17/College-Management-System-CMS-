const express = require('express');
const {
    addUser,
    getUsers,
    createDepartment,
    getDepartments,
    createSubject,
    getSubjects,
    createTimetableEntry,
    getTimetable
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users/add', protect, admin, addUser);
router.get('/users', protect, admin, getUsers);

router.post('/departments', protect, admin, createDepartment);
router.get('/departments', protect, admin, getDepartments);

router.post('/subjects', protect, admin, createSubject);
router.get('/subjects', protect, admin, getSubjects);

router.post('/timetable', protect, admin, createTimetableEntry);
router.get('/timetable', protect, admin, getTimetable);

module.exports = router;
