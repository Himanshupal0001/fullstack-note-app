const asyncHandler = require('express-async-handler')
//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Goals' });
})

//@desc Set goals
//@route POST /api/goals
//@access Private
const SetGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text')
    }
    res.status(200).json({ message: 'Set Goals' });
})

//@desc UPDATE goals
//@route PUT /api/goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update goal ${req.params.id}` });
})

//@desc Delete goals
//@route DELETE /api/goals
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete goal ${req.params.id}` });
})

module.exports = {
    getGoals,
    SetGoals,
    updateGoals,
    deleteGoals
}