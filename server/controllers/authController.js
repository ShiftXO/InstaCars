const router = require('express').Router();
//const jwt = require('jsonwebtoken');
//const User = require('../models/User');
const authService = require('../services/authService');

const isAuth = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const config = require('../config/index');
const { json } = require('express');

router.post('/login', async (req, res, next) => {
    try {
        let token = await authService.login(req.body);
        let user = token.user;
        res.cookie(config.COOKIE_NAME, token.token, { httpOnly: true }).json({ user });
    } catch (error) {
        console.log(error);
        return json(error);
    }
});

router.post('/register', async (req, res) => {
    // TODO: isPublic prop
    try {
        let result = await authService.register(req.body);
        // console.log(result);
        return json(result);
    } catch (error) {
        console.log(error);
        return json(error);
    }
});

router.post('/logout', async (req, res, next) => {
    res.clearCookie(config.COOKIE_NAME).send();
});

module.exports = router;