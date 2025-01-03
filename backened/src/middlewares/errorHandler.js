const customErrorHandler = (error, request, response, next) => {
    response.send({
        type: error.name,
        statusCode: error.code || 500,
        description: error.message || "Unexpected server error occurred"
    });
};

module.exports = customErrorHandler;