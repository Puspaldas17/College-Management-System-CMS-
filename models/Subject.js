const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        credits: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
