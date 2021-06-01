const router = require('express').Router();
const config = require('../config/index');
const chatService = require('../services/chatService');

const { auth } = require('../middlewares/auth');
const { json } = require('express');

//new conv
router.post('/create', async (req, res, next) => {
    try {
        const newConversation = await chatService.create(req.body)
        res.status(200).json(newConversation);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//get conv of a user
router.get("/:userId", async (req, res, next) => {
    try {
        const conversation = await chatService.getChat(req.params.userId);
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await chatService.getChatOfTwo(req.params.firstUserId, req.params.secondUserId)
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;