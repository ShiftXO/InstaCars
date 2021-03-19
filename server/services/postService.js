const Post = require('../models/Post');
const User = require('../models/User');

const create = async (data) => {
    const { imageUrl, userId, description } = data;

    const user = await User.findOne({ userId });
    if (!user) throw { error: { message: "User not found" } };

    const post = new Post({ imageUrl, owner: userId, description });

    user.posts.push(post);
    await user.save();

    return await post.save();
};

module.exports = {
    create,
};