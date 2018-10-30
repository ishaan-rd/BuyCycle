var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@6298",
  database: "dbms_project"
});

con.connect(function(err) {
  if (err) throw err
  console.log("Connected!")
  var sql = "CREATE TABLE if not exists ab (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err
    console.log("Table created")
  })
})
