const mongoose = require('mongoose');

const examSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String, // e.g., 'Internal', 'Semester', 'Final'
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        schedules: [
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
                date: {
                    type: Date,
                    required: true,
                },
                startTime: {
                    type: String,
                },
                duration: {
                    type: Number, // in minutes
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Exam', examSchema);
