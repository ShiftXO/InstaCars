const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, SECRET } = require('../config');
const User = require('../models/User');

const register = async (data) => {
    const { email, fullName, username, password, isPublic } = data;

    let userdb = await User.findOne({ username });
    if (userdb) throw { error: { message: 'User already exists!' } };

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ email, fullName, username, isPublic: true, password: hash });

    return await user.save();
};

const login = async (data) => {
    const { email, fullName, username, password } = data;

    let user = await User.findOne({ email });
    if (!user) throw { error: { message: 'User not found' } };

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { error: { message: 'Password does not match' } };

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET, { expiresIn: '1h' })
    //let token = jwt.sign({ _id: user._id, email: user.email }, SECRET)

    return token;
};

const getUserById = async (id) => {
    return await User.findById(id).lean();
};

const getUsername = async (_id) => {
    let result = await User.findById(_id).select('username');
    return result.username;
};

module.exports = {
    register,
    login,
    getUsername,
    getUserById,
};