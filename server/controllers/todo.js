const pool = require('../utils/db');

/** to do actions */
// Create a To-Do
const createToDo = async (req, res, next) => {
    try{
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
};

// Get all To-Dos
const getAllToDos = async (req, res, next) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');

        res.json(allTodos.rows);
    } catch (err) {
        console.log(err.message);
    }
};

// Get a To-Do
const getToDo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        
        res.json(todo.rows)
    } catch (err) {
        console.log(err.message);
    }
};

// Update a To-Do
const editToDo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);

        res.json('To-Do was updated successfully.')
    } catch (err) {
        console.log(err.message)
    }
};

// Delete a To-Do
const deleteToDo = async ( req, res, next) => {
    try {   
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

        res.json('To-Do was deleted successfully.')
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    createToDo,
    getAllToDos,
    getToDo,
    editToDo,
    deleteToDo
}