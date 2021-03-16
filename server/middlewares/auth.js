const jwt = require('jsonwebtoken');
const config = require('../config/index');

function auth(req, res, next) {
    let authorizationHeader = req.get('session');
    if (authorizationHeader) {
        let token = authorizationHeader.replace('\"', '');
        token = token.replace('\"', '');

        try {
            let decoded = jwt.verify(token, config.SECRET);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json({ errorData: { message: 'You cannot perform this action!' } });
        }
    }

    next();
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