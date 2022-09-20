const router = require('express').Router();
const { createToDo, getAllToDos, getToDo, editToDo, deleteToDo } = require('../controllers/todo');

// Create a To-Do
// router.post('/', async(req, res) => {
    
// });
router.post('/', createToDo);

// Get all To-Dos
router.get('/', getAllToDos);

// Get a To-Do
router.get('/:id', getToDo);

// Update a To-Do
router.put('/:id', editToDo);

//  Delete a To-Do
router.delete('/:id', deleteToDo);

module.exports = router