const validateUserCredentials = (req, res, next) => {
    try {
        const { username, email, password, confirmPassword, currentPassword, newPassword } = req.body;
        const requestPath = req.path;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const validationRules = {
            '/user/login': () => {
                if (!email || !password) {
                    throw Object.assign(Error("Email and password are required"), { code: 400 });
                }
                if (!emailPattern.test(email)) {
                    throw Object.assign(Error("Invalid email format"), { code: 400 });
                }
            },

            '/user/register': () => {
                const requiredFields = { username, email, password, confirmPassword };
                const missingFields = Object.entries(requiredFields)
                    .filter(([_, value]) => !value)
                    .map(([field]) => field);

                if (missingFields.length > 0) {
                    throw Object.assign(
                        Error(`Missing required fields: ${missingFields.join(', ')}`),
                        { code: 400 }
                    );
                }

                if (!emailPattern.test(email)) {
                    throw Object.assign(Error("Invalid email format"), { code: 400 });
                }

                if (password.trim().length < 6) {
                    throw Object.assign(Error("Password must contain at least 6 characters"), { code: 400 });
                }

                if (password !== confirmPassword) {
                    throw Object.assign(Error("Password confirmation does not match"), { code: 400 });
                }
            },

            '/user/update': () => {
                if (email && !emailPattern.test(email)) {
                    throw Object.assign(Error("Invalid email format"), { code: 400 });
                }

                if (newPassword) {
                    if (newPassword.trim().length < 6) {
                        throw Object.assign(Error("New password must contain at least 6 characters"), { code: 400 });
                    }
                    if (!currentPassword) {
                        throw Object.assign(Error("Current password is required for password update"), { code: 400 });
                    }
                }
            }
        };

        const validator = validationRules[requestPath];
        if (validator) {
            validator();
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validateUserCredentials;
