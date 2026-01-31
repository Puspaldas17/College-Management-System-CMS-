const mongoose = require('mongoose');

const timetableSchema = mongoose.Schema(
    {
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: true,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // The teacher taking this specific slot
        },
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            required: true,
        },
        startTime: {
            type: String, // Format: "10:00"
            required: true,
        },
        endTime: {
            type: String, // Format: "11:00"
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
