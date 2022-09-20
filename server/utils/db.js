const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const PGUSER = process.env.PGUSER
const PGPASSWORD = process.env.PGPASSWOWRD
const PGHOST = process.env.PGHOST
const PGPORT = process.env.PGPORT
const PGDATABASE = process.env.PGDATABASE

const pool = new Pool({
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    port: PGPORT,
    database: PGDATABASE
});

pool.connect().then(
    (status) => {
        console.log(`DB :: ${PGDATABASE} connected on port :: ${PGPORT} succeefully.`)
    }
)

module.exports = pool;