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
  
  var sql = "CREATE TABLE Owner         \
  (                                     \
    First_Name varchar(20) NOT NULL,    \
    Last_Name varchar(20) NOT NULL,     \
    Own_Roll_Number varchar(7) NOT NULL,\
    Email_ID varchar(40) NOT NULL,      \
    Phone_Number varchar(10) NOT NULL,  \
    Password varchar(20) NOT NULL,      \
    Feedback varchar(100),              \
    Ratings INT,                        \
    PRIMARY KEY (Own_Roll_Number)       \
  );"
  con.query(sql, function (err, result) {
    if (err) throw err
    console.log("Table created")
  })

  var sql = "CREATE TABLE Renter        \
  (                                     \
    First_Name varchar(20) NOT NULL,    \
    Last_Name varchar(20) NOT NULL,     \
    Ren_Roll_Number varchar(7) NOT NULL,\
    Email_ID varchar(40) NOT NULL,      \
    Phone_Number varchar(10) NOT NULL,  \
    Password varchar(20) NOT NULL,      \
    PRIMARY KEY (Ren_Roll_Number)       \
  );"
  con.query(sql, function (err, result) {
    if (err) throw err
    console.log("Table created")
  })

  var sql = "CREATE TABLE Bicycle                               \
  (                                                             \
    Bicycle_id INT AUTO_INCREMENT NOT NULL,                     \
    Bicycle_Condition varchar(3) NOT NULL,                      \
    Geared varchar(5) NOT NULL,                                 \
    Rental_Rate INT NOT NULL,                                   \
    Timings TIME NOT NULL,                                      \
    Images BLOB,                                                \
    Availability varchar(5) NOT NULL,                           \
    Bi_Own_Roll varchar(7),                                     \
    PRIMARY KEY (Bicycle_id, Bi_Own_Roll),                      \
    FOREIGN KEY (Bi_Own_Roll) REFERENCES Owner(Own_Roll_Number) \
  );"
  con.query(sql, function (err, result) {
    if (err) throw err
    console.log("Table created")
  })

  var sql = "CREATE TABLE Feedback                              \
  (                                                             \
    Feedback_Data varchar(100) NOT NULL,                        \
    feedback_date DATE NOT NULL,                                \
    Ratings INT NOT NULL,                                       \
    Fe_Own_Roll varchar(7),                                     \
    Fe_Ren_Roll varchar(7),                                     \
    PRIMARY KEY (feedback_date, Fe_Own_Roll, Fe_Ren_Roll),      \
    FOREIGN KEY (Fe_Own_Roll) REFERENCES Owner(Own_Roll_Number),\
    FOREIGN KEY (Fe_Ren_Roll) REFERENCES Renter(Ren_Roll_Number)\
  );"
  con.query(sql, function (err, result) {
    if (err) throw err
    console.log("Table created")
  })

  var sql = "CREATE TABLE Fine                                  \
  (                                                             \
    Fine_id INT AUTO_INCREMENT NOT NULL,                        \
    Crossed_time varchar(5) NOT NULL,                           \
    Damage varchar(5) NOT NULL,                                 \
    Amount INT NOT NULL,                                        \
    Own_Roll_Number varchar(7) NOT NULL,                        \
    Ren_Roll varchar(7) NOT NULL,                               \
    Fi_Own_Roll varchar(7),                                     \
    Fi_Ren_Roll varchar(7),                                     \
    PRIMARY KEY (Fine_id, Fi_Own_Roll, Fi_Ren_Roll),            \
    FOREIGN KEY (Fi_Own_Roll) REFERENCES Owner(Own_Roll_Number),\
    FOREIGN KEY (Fi_Ren_Roll) REFERENCES Renter(Ren_Roll_Number)\
  );"
  con.query(sql, function (err, result) {
    if (err) throw err
    console.log("Table created")
  })

})