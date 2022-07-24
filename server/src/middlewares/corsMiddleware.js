module.exports = () => (req, res, next) => {

    const allowedOrigin = "http://localhost:3000";

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader("Allow-Control-Access-Policy", "true");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Credentials, Allow-Control-Access-Policy, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
};