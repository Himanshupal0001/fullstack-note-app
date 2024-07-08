const asyncHandler = require('express-async-handler');
const Goals = require('../models/goalModel');
const User = require('../models/userModel');
//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goals.find({ user: req.user.id });
    res.status(200).json({ goals, message: 'success' });
})

//@desc Set goals
//@route POST /api/goals
//@access Private
const SetGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text')
    }

    const goal = await Goals.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json({ goal, message: 'success' });
})

//@desc UPDATE goals
//@route PUT /api/goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goals.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not find');
    }
    const user = await User.findById(req.user.id);

    //check user exist
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    //check user authorized
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json({ updatedGoal, message: 'success' });
})

//@desc Delete goals
//@route DELETE /api/goals
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goals.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id);
    //check user exist
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    //check user authorized
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await goal.deleteOne();
    res.status(200).json({ message: `delete sucess` });
})

module.exports = {
    getGoals,
    SetGoals,
    updateGoals,
    deleteGoals
}