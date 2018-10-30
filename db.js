var mysql = require('mysql')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql@6298",
    database: "dbms_project"
})

module.exports = connection