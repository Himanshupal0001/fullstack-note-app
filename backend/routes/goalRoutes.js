const express = require('express');
const router = express.Router();
const { getGoals, SetGoals, updateGoals, deleteGoals } = require('../controllers/goalController');
const protect = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, SetGoals);
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals);

// router.get('/', getGoals);

// router.post('/', SetGoals);

// router.put('/:id', updateGoals);

// router.delete('/:id', deleteGoals);


module.exports = router;