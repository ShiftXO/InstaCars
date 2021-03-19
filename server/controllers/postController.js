const router = require('express').Router();
const postService = require('../services/postService');

const { auth } = require('../middlewares/auth');

router.post('/create', auth, async (req, res, next) => {
    try {
        let result = await postService.create(req.body);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/all', auth, async (req, res, next) => {
    try {
        let result = await postService.getAll(req.body);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/:_id/like', auth, async (req, res, next) => {
    try {
        let result = await postService.likePost(req.body);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;