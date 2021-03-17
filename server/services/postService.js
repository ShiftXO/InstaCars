const Post = require('../models/Post');

const create = async (data) => {
    const { imageUrl, userId, description } = data;

    const post = new Post({ imageUrl, owner: userId, description });

    return await post.save();
};

module.exports = {
    create,
};