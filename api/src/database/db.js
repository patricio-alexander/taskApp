// get the client
const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasksDB'
});


module.exports = connection;