const mongoose = require('mongoose');

const commentScheme = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    },
    content: {
        type: String,
        required: true,
    },
    usersLiked: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentScheme);
