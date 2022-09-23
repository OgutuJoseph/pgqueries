const router = require('express').Router();
const { createTeacher, getAllTeachers, getTeacher, editTeacher, deleteTeacher } = require('../controllers/teacher');

// Create a Teacher
router.post('/', createTeacher);

// Get all Teachers
router.get('/', getAllTeachers);

// Get a Teacher
router.get('/:id', getTeacher);

// Update a Teacher
router.put('/:id', editTeacher);

//  Delete a Teacher
router.delete('/:id', deleteTeacher);

module.exports = router;