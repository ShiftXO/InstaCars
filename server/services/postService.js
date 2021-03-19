const Post = require('../models/Post');
const User = require('../models/User');

const create = async (data) => {
    const { imageUrl, userId, description } = data;

    const user = await User.findOne({ _id: userId });
    if (!user) throw { error: { message: "User not found" } };

    const post = new Post({ imageUrl, owner: userId, description });

    user.posts.push(post);
    await user.save();

    return await post.save();
};

const getAll = async (data) => {
    const { imageUrl, userId, description } = data;

    //TODO get user followers posts

    return await Post.find().lean();
};

const likePost = async (data) => {
    const { _id, userId } = data;

    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id });

    if (post.usersLiked.includes(userId)) {
        post.usersLiked.remove(user);
        return await post.save();
    }

    post.usersLiked.push(user);

    return await post.save();
};

module.exports = {
    getAll,
    create,
    likePost,
};