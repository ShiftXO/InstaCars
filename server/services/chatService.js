const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

const create = async (body) => {
    const chat = new Chat({ members: [body.senderId, body.receiverId] });
    return await chat.save();
};

const getChat = async (userId) => {
    let chat = await Chat.find({ members: { $in: [userId] } }).lean();
    return chat;
};

const getChatOfTwo = async (firstUserId, secondUserId) => {
    let chat = await Chat.findOne({ members: { $all: [firstUserId, secondUserId] } }).lean();
    return chat;
};

const createMessage = async (data) => {
    let message = await Message.create({ conversationId: data.conversationId, text: data.text, sender: data.sender });
    return await message.save();
};

const getMessages = async (conversationId) => {
    let messages = await Message.find({ conversationId }).lean();
    return messages;
};

module.exports = {
    create,
    getChat,
    getMessages,
    getChatOfTwo,
    createMessage,
};