const { Router } = require('express');

const postController = require('./controllers/postController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');
const messageController = require('./controllers/messageController');

const router = Router();

router.use('/post', postController);
router.use('/auth', authController);
router.use('/user', userController);
router.use('/inbox', chatController);
router.use('/message', messageController);
router.get('*', (req, res) => {
    //res.render('404');
});

module.exports = router;