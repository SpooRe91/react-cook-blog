const { getErrorMessage } = require("../utils/errorHelpers");

exports.errorHandler = (err, req, res, next) => {
    const status = err.status || 404;
    res.status(404).json({ message: getErrorMessage(err.message) });
};