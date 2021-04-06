const router = require('express').Router();
const postService = require('../services/postService');

const { auth } = require('../middlewares/auth');

router.post('/create', async (req, res, next) => {
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
        // console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/:id', auth, async (req, res, next) => {
    try {
        let result = await postService.getById(req.params.id);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/:_id/like', async (req, res, next) => {
    try {
        let result = await postService.likePost(req.body);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/:_id/comments/:postId/like', async (req, res, next) => {
    try {
        let result = await postService.likeComment(req.body);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/:_id/save', async (req, res, next) => {
    try {
        let result = await postService.savePost(req.body);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/:_id/delete', auth, async (req, res, next) => {
    try {
        let id = req.params._id;
        let user = req.user;
        let result = await postService.deletePost({ id, user });
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/comment', async (req, res, next) => {
    try {
        let result = await postService.addComment(req.body);
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;