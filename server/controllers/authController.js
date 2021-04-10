const router = require('express').Router();
const config = require('../config/index');
const authService = require('../services/authService');

const { auth } = require('../middlewares/auth');
const { json } = require('express');

router.post('/login', async (req, res, next) => {
    try {
        let token = await authService.login(req.body);
        let user = token.user;
        res.cookie(config.COOKIE_NAME, token.token, { httpOnly: true }).json({ user });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
});

router.post('/register', async (req, res) => {
    // TODO: isPublic prop
    try {
        let result = await authService.register(req.body);
        // console.log(result);
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.get('/:id', auth, async (req, res, next) => {
    try {
        let data = {
            _id: req.params.id,
            user: req.user,
        };

        let result = await authService.getUserData(data);
        return json(result);
    } catch (error) {
        console.log(error);
        return json(error);
    }
});

router.post('/:id/edit', auth, async (req, res, next) => {
    try {
        let data = {
            _id: req.params.id,
            user: req.user,
            data: { ...req.body }
        };

        let result = await authService.editUser(data);
        // console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.post('/:_id/delete', auth, async (req, res) => {
    // TODO: isPublic prop
    try {
        let data = {
            _id: req.params._id,
            user: req.user,
        };

        let result = await authService.deleteUser(data);
        // console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.post('/logout', async (req, res, next) => {
    res.clearCookie(config.COOKIE_NAME).send();
});

module.exports = router;