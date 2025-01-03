const config = {
    database: {
        connectionOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true
        },
        reconnectInterval: 5000
    },
    security: {
        bcryptSaltRounds: 10,
        jwtExpiresIn: '24h',
        passwordMinLength: 6
    },
    validation: {
        emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        usernameMinLength: 3,
        maxRequestSize: '10mb'
    },
    pagination: {
        defaultPage: 1,
        defaultLimit: 10,
        maxLimit: 100
    }
};

module.exports = config; 