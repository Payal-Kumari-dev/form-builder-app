const jwt = require('jsonwebtoken');

const authenticateRequest = (request, response, next) => {
    try {
        const authHeader = request.header('Authorization');
        const accessToken = authHeader ? authHeader.split(' ')[1] : null;
        
        if (!accessToken) {
            throw Object.assign(Error("Authentication token missing"), { code: 403 });
        }

        const decodedData = jwt.verify(accessToken, process.env.JWT_SECRET);
        request.authenticatedUser = decodedData.uid;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            error.name = "AuthenticationError";
        }
        next(error);
    }
};

module.exports = authenticateRequest;