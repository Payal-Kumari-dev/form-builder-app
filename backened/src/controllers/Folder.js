const Folder = require('../models/Folder');
const Form = require('../models/Form');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const validateFolderExists = async (folderId) => {
    if (!ObjectId.isValid(folderId)) {
        throw Object.assign(Error("Invalid folder identifier provided"), { code: 400 });
    }

    const folderRecord = await Folder.findById(folderId);
    if (!folderRecord) {
        throw Object.assign(Error("Requested folder does not exist"), { code: 404 });
    }

    return folderRecord;
};

const initiateFolder = async (req, res, next) => {
    try {
        const ownerId = req.authenticatedUser;
        const { folderName } = req.body;
        
        if (!folderName) {
            throw Object.assign(Error("Folder name is required"), { code: 400 });
        }

        await Folder.create({ userId: ownerId, folderName });
        res.status(200).json({ status: "success", msg: "New folder created successfully" });
    } catch (err) {
        next(err);
    }
};

const fetchAllFolder = async (req, res, next) => {
    try {
        const folderdata = await Folder.find({ userId: req.user });
        res.status(200).json({ status: "success", data: folderdata });
    } catch (err) {
        next(err);
    }
};

const fetchAllFormByFolder = async (req, res, next) => {
    const { folderId } = req.params;
    try {
        await validateFolderExists(folderId);
        const formdata = await Form.find({ folderId });
        res.status(200).json({ status: "success", data: formdata });
    } catch (err) {
        next(err);
    }
};

const deleteFolder = async (req, res, next) => {
    const { folderId } = req.params;
    try {
        await validateFolderExists(folderId);
        await Folder.findByIdAndDelete(folderId);
        await Form.deleteMany({ folderId });
        res.status(200).json({ status: "success", msg: "Folder deleted successfully." });
    } catch (err) {
        next(err);
    }
};

module.exports = { fetchAllFolder, fetchAllFormByFolder, initiateFolder, deleteFolder };