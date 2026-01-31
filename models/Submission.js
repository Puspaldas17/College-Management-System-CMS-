const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema(
    {
        assignment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        link: {
            type: String, // URL to submitted work
            required: true,
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
        grade: {
            type: Number,
        },
        feedback: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
