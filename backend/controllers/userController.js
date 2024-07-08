const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
// @desc Register new user
//@route POST /api/users
//@access Private
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exist');
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create User
    const user = await User.create({
        name, email, password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Login new user
//@route POST /api/users
//@access Private
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid crendetials');
    }
});


// @desc Get all  user
//@route GET /api/users
//@access Private
const getUser = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (!users) {
        res.send(400);
        throw new Error('Users not found');
    }

    res.json({ users, message: 'success' })
});


// @desc delete a user
//@route DELETE /api/users
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    await user.deleteOne();
    res.status(200).json({ message: 'User deleted Successfully' });
});


const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteUser
}