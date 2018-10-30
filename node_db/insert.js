var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@6298",
  database: "dbms_project"
})

con.connect(function(err) {
    if (err) throw err

    // insert some values in each table
    var sql = ""
})