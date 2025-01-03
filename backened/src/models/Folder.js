const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    folderName: {
        type: String,
        required: [true, 'Folder name is required'],
        trim: true,
        minlength: [1, 'Folder name cannot be empty']
    },
    creatorId: {
        type: mongoose.ObjectId,
        ref: 'UserAccount',
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isArchived: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('FolderStructure', folderSchema);