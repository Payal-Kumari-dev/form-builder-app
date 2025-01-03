const express = require('express');
const formRouter = express.Router();

const authenticateRequest = require('../middlewares/verifyToken');
const {
    fetchAllForm: getAllForms,
    fetchFormById: getFormDetails,
    createForm: initiateNewForm,
    updateForm: modifyFormContent,
    deleteForm: removeForm,
    shareForm: getPublicForm,
    countFormHit: incrementVisitorCount,
    saveFormResponse: storeFormSubmission
} = require('../controllers/Form');

// Protected routes
formRouter.use('/form/manage', authenticateRequest);
formRouter.get('/form/manage/list', getAllForms);
formRouter.get('/form/manage/details/:formId', getFormDetails);
formRouter.post('/form/manage/create', initiateNewForm);
formRouter.patch('/form/manage/edit/:formId', modifyFormContent);
formRouter.delete('/form/manage/remove/:formId', removeForm);

// Public routes
formRouter.get('/form/public/:formId', getPublicForm);
formRouter.post('/form/public/analytics/:formId', incrementVisitorCount);
formRouter.post('/form/public/submit/:formId', storeFormSubmission);

module.exports = formRouter;