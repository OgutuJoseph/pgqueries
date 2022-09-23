const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

/** middlewares */
app.use(cors());
app.use(express.json());

/** routes */
app.use('/students', require('./routes/students'));
app.use('/teachers', require('./routes/teachers'));
app.use('/departments', require('./routes/departments'));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});