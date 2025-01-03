const express = require('express');
const folderRouter = express.Router();

const authenticateRequest = require('../middlewares/verifyToken');
const {
    fetchAllFolder,
    fetchAllFormByFolder,
    createFolder,
    deleteFolder
} = require('../controllers/Folder');

// All folder routes require authentication
folderRouter.use('/folder', authenticateRequest);

folderRouter.get('/folder/list', fetchAllFolder);
folderRouter.get('/folder/contents/:folderId', fetchAllFormByFolder);
folderRouter.post('/folder/create', createFolder);
folderRouter.delete('/folder/remove/:folderId', deleteFolder);

module.exports = folderRouter;