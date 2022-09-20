const router = require('express').Router();
const { createStudent, getAllStudents, getStudent, editStudent, deleteStudent } = require('../controllers/student');

// Create a Student
router.post('/', createStudent);

// Get all Students
router.get('/', getAllStudents);

// Get a Student
router.get('/:id', getStudent);

// Update a Student
router.put('/:id', editStudent);

//  Delete a Student
router.delete('/:id', deleteStudent);

module.exports = router;