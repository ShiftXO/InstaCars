const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let authorizationHeader = req.get('Authorization');
    if (authorizationHeader) {
        let token = authorizationHeader.split(' ')[1];

        try {
            let decoded = jwt.verify(token, 'SOMESUPERSECRET');

            req.user = decoded;
        } catch (error) {
            return next();
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