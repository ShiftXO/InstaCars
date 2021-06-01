const router = require('express').Router();
const config = require('../config/index');
const chatService = require('../services/chatService');

const { auth } = require('../middlewares/auth');
const { json } = require('express');

router.post("/create", async (req, res, next) => {
    try {
        const newMessage = await chatService.createMessage(req.body);
        res.status(200).json(newMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/:chatId", async (req, res, next) => {
    try {
        const messages = await chatService.getMessages(req.params.chatId);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;