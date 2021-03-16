const router = require('express').Router();
const postService = require('../services/postService');

const isAuth = require('../middlewares/isAuthenticated');
const { auth } = require('../middlewares/auth');
const isGuest = require('../middlewares/isGuest');

router.post('/create', auth, async (req, res, next) => {
    try {
        let result = await postService.create(req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return json(error);
    }
});


module.exports = router;