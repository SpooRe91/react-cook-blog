exports.getErrorMessage = (err) => {
    if (err) {
        return err.message;
    }
};