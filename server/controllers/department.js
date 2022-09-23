const pool = require('../utils/db');
const { APIError, DataStoreError } = require('../lib/errors');
const { psQlData } = require('../utils/utils');

/** department actions */
// Create a Department
const createDepartment = async (req, res, next) => {
    try{
        const data = req.body;

        const fields = [ 'teacher_id', 'department_name', ];

        fields.forEach((element) => {
            if (!data[element]) throw new APIError(`${element} is required.`, 400);
        });
        
        /** inerting data */
        const columns = [];
        const values = [];
        const positions = [];

        Object.entries(data).forEach(([column, value], index) => {
            columns.push(column);
            values.push(value);
            positions.push(`$${(index += 1)}`);
        })

        const dataToInsert = {
            text: `INSERT INTO tbl_departments(${columns.join(', ')}) VALUES(${positions.join(
                ', '
            )}) RETURNING *`,
            values
        };
        await pool.query(dataToInsert)
        
        .then(() => { res.status(201).json('Department created successfullly.') })
        .catch((error) => { next(error) }); 
    
    } catch (err) {
        console.log(err.message);
    }
};

// Get all Departments
const getAllDepartments = async (req, res, next) => {
    try {
        const allDepartments = await pool.query('SELECT * FROM tbl_departments');

        res.status(200).json(allDepartments.rows);
    } catch (err) {
        console.log(err.message);
    }
};

// Get a Department
const getDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const department = await pool.query('SELECT * FROM tbl_departments WHERE _id = $1', [id]);
        
        res.status(200).json(department.rows)
    } catch (err) {
        console.log(err.message);
    }
};

// Update a Department
const editDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { full_name, department_id } = data;
        await pool.query('UPDATE tbl_departments SET teacher_id = $1, department_name = $2 WHERE _id = $3', [teacher_id, department_name, id]);

        res.status(200).json('Department updated successfully.')
    } catch (err) {
        console.log(err.message)
    }
};

// Delete a Department
const deleteDepartment = async ( req, res, next) => {
    try {   
        const { id } = req.params;

        /** confirm if department exists */
        const checkDepartment = {
            text: `SELECT _id FROM tbl_departments WHERE _id = ${id} LIMIT 1`
        };
        const checkDepartmentData = await pool.query(checkDepartment);
        if (Object.entries(checkDepartmentData.rows).length < 1) { 
            throw new APIError('Department does not exist.', 400)                        
        };

        await pool.query('DELETE FROM tbl_departments WHERE _id = $1', [id]);

        res.status(200).json('Department deleted successfully.')
    } catch (err) {
        console.log(err.message); 
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartment,
    editDepartment,
    deleteDepartment
}