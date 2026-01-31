const express = require('express');
const router = express.Router();
const { sendNotification, getMyNotifications } = require('../controllers/notificationController');
const { protect, admin, teacher } = require('../middleware/authMiddleware');

// Only admin and teacher can send notifications (for now, maybe expand logic later)
router.post('/', protect, sendNotification);
router.get('/', protect, getMyNotifications);

module.exports = router;
