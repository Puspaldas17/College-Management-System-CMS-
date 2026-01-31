const mongoose = require('mongoose');

const resultSchema = mongoose.Schema(
    {
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam',
            required: true,
        },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: true,
        },
        marksObtained: {
            type: Number,
            required: true,
        },
        maxMarks: {
            type: Number,
            required: true,
            default: 100,
        },
        grade: {
            type: String,
        },
        remarks: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate results for same exam, student, and subject
resultSchema.index({ exam: 1, student: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('Result', resultSchema);
