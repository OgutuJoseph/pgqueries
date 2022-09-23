const pool = require('../utils/db');
const { APIError, DataStoreError } = require('../lib/errors');
const { psQlData } = require('../utils/utils');

/** teacher actions */
// Create a Teacher
const createTeacher = async (req, res, next) => {
    try{
        const data = req.body;

        const fields = [ 'full_name',  'department_id' ];

        fields.forEach((element) => {
            if (!data[element]) throw new APIError(`${element} is missing is one or more of the rows inserted.`, 400);
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
            text: `INSERT INTO tbl_teachers(${columns.join(', ')}) VALUES(${positions.join(
                ', '
            )}) RETURNING *`,
            values
        };
        console.log('data to insert: ', dataToInsert)
        await pool.query(dataToInsert)
        
        .then(() => { res.status(201).json('Teacher created successfullly.') })
        .catch((error) => { next(error) }); 
    
    } catch (err) {
        console.log(err.message);
    }
};

// Get all Teachers
const getAllTeachers = async (req, res, next) => {
    try {
        const allTeachers = await pool.query('SELECT * FROM tbl_teachers');

        res.status(200).json(allTeachers.rows);
    } catch (err) {
        console.log(err.message);
    }
};

// Get a Teacher
const getTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const teacher = await pool.query('SELECT * FROM tbl_teachers WHERE _id = $1', [id]);
        
        res.status(200).json(teacher.rows)
    } catch (err) {
        console.log(err.message);
    }
};

// Update a Teacher
const editTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { full_name, department_id } = data;
        await pool.query('UPDATE tbl_teachers SET full_name = $1, department_id = $2 WHERE _id = $3', [full_name, department_id, id]);

        res.status(200).json('Teacher updated successfully.')
    } catch (err) {
        console.log(err.message)
    }
};

// Delete a Teacher
const deleteTeacher = async ( req, res, next) => {
    try {   
        const { id } = req.params;

        /** confirm if teacher exists */
        const checkTeacher = {
            text: `SELECT _id FROM tbl_teachers WHERE _id = ${id} LIMIT 1`
        };
        const checkTeacherData = await pool.query(checkTeacher);
        if (Object.entries(checkTeacherData.rows).length < 1) { 
            throw new APIError('Teacher does not exist.', 400)                        
        };

        await pool.query('DELETE FROM tbl_teachers WHERE _id = $1', [id]);

        res.status(200).json('Teacher deleted successfully.')
    } catch (err) {
        console.log(err.message); 
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacher,
    editTeacher,
    deleteTeacher
}