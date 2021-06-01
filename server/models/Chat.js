const mongoose = require('mongoose');

const chatScheme = new mongoose.Schema({
    members: {
        type: Array,
    },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatScheme);
