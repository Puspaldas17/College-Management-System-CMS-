const express = require('express');
const router = express.Router();
const { createClass, getClasses } = require('../controllers/classController');
const { protect, admin, teacher } = require('../middleware/authMiddleware');

router.post('/', protect, admin, createClass);
router.get('/', protect, getClasses);

module.exports = router;
