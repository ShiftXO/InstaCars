const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

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
    let posts = await Post.find().populate({ path: 'owner', select: 'username profileImage' }).populate({ path: 'comments', populate: { path: 'user' } }).lean();
    //console.log(posts);

    return posts;
};

const getById = async (id) => {
    //TODO get user followers posts
    let posts = await Post.findOne({ _id: id }).populate({ path: 'owner', select: 'username profileImage' }).populate({ path: 'comments', populate: { path: 'user profileImage' } }).lean();
    console.log(posts);

    return posts;
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

const deletePost = async (data) => {
    const { id, user } = data;

    const post = await Post.findOne({ _id: id });
    if (post.owner != user._id) throw { error: { message: "Cannot perform this action" } };

    return await Post.deleteOne({ _id: id });
};

const savePost = async (data) => {
    const { _id, userId } = data;

    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id });

    let isSaved = post.usersSaved.some(x => x._id == _id);
    if (isSaved) {
        await post.usersSaved.remove(user)
        await user.savedPosts.remove(post);
        await user.save();
        return await post.save();
    }

    user.savedPosts.push(post);
    post.usersSaved.push(user);
    await user.save();
    return await post.save();
};

const addComment = async (data) => {
    const { postId, userId, comment: content } = data;

    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id: postId });

    let dbComment = new Comment({ user, post, content });
    let a = await dbComment.save();
    post.comments.push(dbComment);
    await post.save();
    return a;
};

module.exports = {
    getAll,
    create,
    getById,
    savePost,
    likePost,
    addComment,
    deletePost,
};