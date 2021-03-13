const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    }],
    savedPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    }],
    isPublic: {
        type: Boolean,
        required: true,
    },
    bio: {
        type: String,
    },
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    following: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

module.exports = mongoose.model('User', userSchema);