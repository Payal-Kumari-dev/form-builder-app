const express = require('express');
const userRouter = express.Router();

const authenticateRequest = require('../middlewares/verifyToken');
const validateUserInput = require('../middlewares/validateUser');

// Verify that all these functions exist in your User controller
const {
    loginUser,
    registerUser,
    updateUser,
    userDashboard
} = require('../controllers/User');

// Public authentication routes
userRouter.post('/auth/login', validateUserInput, loginUser);
userRouter.post('/auth/register', validateUserInput, registerUser);

// Protected user routes
userRouter.use('/user', authenticateRequest);
userRouter.patch('/user/profile', validateUserInput, updateUser);
userRouter.get('/user/profile', userDashboard);

module.exports = userRouter;