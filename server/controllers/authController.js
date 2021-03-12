const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuth = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const config = require('../config/index');

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    User.where({ username, password })
        .findOne()
        .then(user => {
            let token = jwt.sign({
                _id: user._id,
                username: user.username,
            }, config.development.SECRET, { expiresIn: '1h' });

            res.status(200).json({
                _id: user._id,
                username: user.username,
                token
            })
        })
        .catch(err => {
            next({ status: 404, message: 'No such user or password!', type: 'ERROR' })
        })
});

router.post('/register', (req, res) => {
    // TODO: Check if user exists

    let user = new User(req.body);

    user.save()
        .then(createdUser => {
            console.log(createdUser);

            res.status(201).json({ _id: createdUser._id });
        });

});

module.exports = router;