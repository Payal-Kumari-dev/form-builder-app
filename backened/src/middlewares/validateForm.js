const validateFormInput = (req, res, next) => {
    try {
        const { formName, formSequence, formTheme } = req.body;
        const requestPath = req.path;

        if (requestPath.includes('/form/manage/create')) {
            if (!formName || formName.trim().length === 0) {
                throw Object.assign(Error("Form name is required"), { code: 400 });
            }
        }

        if (requestPath.includes('/form/manage/edit')) {
            if (formSequence && !Array.isArray(formSequence)) {
                throw Object.assign(Error("Form sequence must be an array"), { code: 400 });
            }

            if (formTheme && !formTheme.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
                throw Object.assign(Error("Invalid theme color format"), { code: 400 });
            }
        }

        if (requestPath.includes('/form/public/submit')) {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw Object.assign(Error("Form response cannot be empty"), { code: 400 });
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validateFormInput; 