const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Send a notification
// @route   POST /api/notifications
// @access  Admin/Teacher
const sendNotification = async (req, res) => {
    try {
        const { title, message, recipientType, recipientId } = req.body;

        // If recipientType is individual, recipientId is required
        if (recipientType === 'individual' && !recipientId) {
            return res.status(400).json({ message: 'Recipient ID is required for individual notifications' });
        }

        const notification = await Notification.create({
            title,
            message,
            sender: req.user._id,
            recipientType,
            recipient: recipientId || null
        });

        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get my notifications
// @route   GET /api/notifications
// @access  Private
const getMyNotifications = async (req, res) => {
    try {
        const userRole = req.user.role;
        const userId = req.user._id;

        // Find notifications where:
        // 1. recipientType is 'all'
        // 2. recipientType matches user's role
        // 3. recipient is the user's ID (individual)
        const notifications = await Notification.find({
            $or: [
                { recipientType: 'all' },
                { recipientType: userRole },
                { recipient: userId }
            ]
        }).sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendNotification,
    getMyNotifications
};
