const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required: true,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        fileUrl: {
            type: String, // URL to uploaded file (if any)
        },
    },
    {
        timestamps: true,
    }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
