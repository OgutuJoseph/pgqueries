const pool = require('../utils/db');
const { APIError, DataStoreError } = require('../lib/errors');
const { psQlData } = require('../utils/utils');

/** student actions */
// Create a Student
const createStudent = async (req, res, next) => {
    try{
        const data = req.body;

        const fields = [ 'full_name', 'teacher_id', 'department_id' ];

        data.forEach((newData) => {
            fields.forEach((element) => {
                if (!newData[element]) throw new APIError(`${element} is missing is one or more of the rows inserted.`, 400);
            });
        })
        
        /** inerting data */
        // const newStudent = await pool.query('INSERT INTO tbl_students (full_name, teacher_id, department_id) VALUES ($1, $2, $3) RETURNING *', [full_name, teacher_id, department_id]);
        // res.json(newStudent.rows)

        Promise.all(data.map((d) => {
            const studentData = [
                {
                    full_name: d.full_name,
                    teacher_id: d.teacher_id,
                    department_id: d.department_id
                }
            ]

            return studentData.map((dd) => {
                const toInsertData = psQlData(dd);
                
                const query = {
                    text:  `INSERT INTO tbl_students (${toInsertData[0].join(', ')}) VALUES (${toInsertData[1].join(', ')})`,
                    values: toInsertData[2],
                }

                return pool.query(query);
            });
        }))
        .then(() => { res.status(201).json('Student created successfullly.') })
        .catch((error) => { next(error) });        
    } catch (err) {
        console.log(err.message);
    }
};

// Get all Students
const getAllStudents = async (req, res, next) => {
    try {
        const allStudents = await pool.query('SELECT * FROM tbl_students');

        res.status(200).json(allStudents.rows);
    } catch (err) {
        console.log(err.message);
    }
};

// Get a Student
const getStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await pool.query('SELECT * FROM tbl_students WHERE student_id = $1', [id]);
        
        res.status(200).json(student.rows)
    } catch (err) {
        console.log(err.message);
    }
};

// Update a Student
const editStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { full_name, teacher_id, department_id } = data;
        await pool.query('UPDATE tbl_students SET full_name = $1, teacher_id = $2, department_id = $3 WHERE student_id = $4', [full_name, teacher_id, department_id, id]);

        res.status(200).json('Student updated successfully.')
    } catch (err) {
        console.log(err.message)
    }
};

// Delete a Student
const deleteStudent = async ( req, res, next) => {
    try {   
        const { id } = req.params;

        /** confirm if student exists */
        const checkStudent = {
            text: `SELECT student_id FROM tbl_students WHERE student_id = ${id} LIMIT 1`
        };
        const checkStudentData = await pool.query(checkStudent);
        if (Object.entries(checkStudentData.rows).length < 1) { 
            throw new APIError('Student does not exist.', 400)                        
        };

        await pool.query('DELETE FROM tbl_students WHERE student_id = $1', [id]);

        res.status(200).json('Student deleted successfully.')
    } catch (err) {
        console.log(err.message); 
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudent,
    editStudent,
    deleteStudent
}