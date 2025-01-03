const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    formName: {
        type: String,
        required: [true, 'Form name is required'],
        trim: true
    },
    formSequence: {
        type: Array,
        default: []
    },
    formTheme: {
        type: String,
        required: [true, 'Form theme is required'],
        default: '#ffffff'
    },
    visitorCount: {
        type: Number,
        default: 0,
        min: [0, 'Visitor count cannot be negative']
    },
    responseData: {
        type: Array,
        default: []
    },
    folderId: {
        type: mongoose.ObjectId,
        ref: 'Folder',
        index: true
    },
    creatorId: {
        type: mongoose.ObjectId,
        ref: 'UserAccount',
        required: true,
        index: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FormTemplate', formSchema);