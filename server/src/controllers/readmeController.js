const router = require('express').Router();

router.get('/readme', (req, res) => {

    const file = `C:/Users/mbogd/Desktop/Soft Uni/my-first-code-clone/REACT-JS/React-js-course/react-js-project-final/react-js-project-final/server/README.doc`
    res.setHeader('Content-disposition', 'attachment; filename=README.doc');
    res.setHeader('Content-type', 'application/msword');

    res.download(file);
    res.end();
});

module.exports = router;