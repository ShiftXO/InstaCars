const router = require('express').Router();
const authService = require('../services/authService');

const { auth } = require('../middlewares/auth');

router.get('/', async (req, res, next) => {
    try {
        let result = await authService.getUsers();
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let result = await authService.getUserById(req.params.id);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/:id/saved', async (req, res, next) => {
    try {
        let result = await authService.getUserSavedPosts(req.params.id);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/:id/follow', async (req, res, next) => {
    try {
        let result = await authService.followUser(req.body);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;