const express = require('express');
const router = express.Router();
const { getGoals, SetGoals, updateGoals, deleteGoals } = require('../controllers/goalController')

router.route('/').get(getGoals).post(SetGoals);
router.route('/:id').delete(deleteGoals).put(updateGoals);

// router.get('/', getGoals);

// router.post('/', SetGoals);

// router.put('/:id', updateGoals);

// router.delete('/:id', deleteGoals);


module.exports = router;