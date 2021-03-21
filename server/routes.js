const { Router } = require('express');

const postController = require('./controllers/postController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const router = Router();

router.use('/post', postController);
router.use('/auth', authController);
router.use('/user', userController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;