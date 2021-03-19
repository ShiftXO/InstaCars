const router = require('express').Router();
const postService = require('../services/postService');

const { auth } = require('../middlewares/auth');

router.post('/create', auth, async (req, res, next) => {
    try {
        let result = await postService.create(req.body);
        res.status(200).json({ result });
    } catch (error) {
        return res.status(400).json(error);
    }
});


module.exports = router;