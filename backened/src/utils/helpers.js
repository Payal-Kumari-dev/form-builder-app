const mongoose = require('mongoose');

const utilityHelpers = {
    isValidObjectId: (id) => {
        return mongoose.Types.ObjectId.isValid(id);
    },

    sanitizeInput: (input) => {
        if (typeof input !== 'string') return input;
        return input.trim().replace(/[<>]/g, '');
    },

    createCustomError: (message, code) => {
        return Object.assign(new Error(message), { code });
    },

    generateResponseObject: (status, message, data = null) => {
        const response = {
            status,
            message,
            timestamp: new Date().toISOString()
        };

        if (data) {
            response.data = data;
        }

        return response;
    },

    validatePaginationParams: (page, limit) => {
        const parsedPage = parseInt(page) || 1;
        const parsedLimit = parseInt(limit) || 10;
        
        return {
            skip: (parsedPage - 1) * parsedLimit,
            limit: parsedLimit
        };
    }
};

module.exports = utilityHelpers; 