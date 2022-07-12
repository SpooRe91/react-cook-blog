//function that returns a middleware, uses the Mongoose validator on a action level
const { getErrorMessage } = require("../utils/errorHelpers");

exports.modelValidator = (Model) => async (req, res, next) => {
        try {
                await Model.validate(req.body);
                next();
        } catch (error) {
                res.status(401).json({ message: getErrorMessage(error) });
        };
}