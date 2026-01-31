const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        recipientType: {
            type: String,
            enum: ['all', 'student', 'teacher', 'individual'],
            required: true,
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // Only required if recipientType is 'individual'
        },
        isRead: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
