require("dotenv").config();
const mysql = require("mysql");

//Database creditnal
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_1,
});

//Connect to the Database
connection.connect((error) => {
  if (error) throw error;
  console.log("Connection established");
});

module.exports = connection;
