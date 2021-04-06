const jwt = require('jsonwebtoken');
const config = require('../config/index');

function auth(req, res, next) {
    try {
        const token = req.cookies[config.COOKIE_NAME];
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        const decoded = jwt.verify(token, config.SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
};

function isAuth(req, res, next) {
    if (!req.user) {
        res.status(401).json({ errorData: { message: 'You cannot perform this action!' } });
    }

    next();
};

module.exports = {
    isAuth,
    auth
}