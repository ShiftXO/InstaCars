const { Router } = require('express');

const postController = require('./controllers/postController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/post', postController);
router.use('/auth', authController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;