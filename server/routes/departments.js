const router = require('express').Router();
const { createDepartment, getAllDepartments, getDepartment, editDepartment, deleteDepartment } = require('../controllers/department');

// Create a Department
router.post('/', createDepartment);

// Get all Departments
router.get('/', getAllDepartments);

// Get a Department
router.get('/:id', getDepartment);

// Update a Department
router.put('/:id', editDepartment);

//  Delete a Department
router.delete('/:id', deleteDepartment);

module.exports = router;