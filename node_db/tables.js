var db = require('../db.js')
var sql = ''
module.exports = {
  createTables: () => {
    sql = "CREATE TABLE if not exists       \
    users                                   \
    (                                       \
      id int AUTO_INCREMENT PRIMARY KEY,    \
      username varchar(15) UNIQUE NOT NULL, \
      email varchar(100) UNIQUE NOT NULL,   \
      password binary(60) NOT NULL,         \
      role varchar(6),                      \
      phone_number varchar(10) UNIQUE,      \
      name varchar(50)                      \
    );"
    db.query(sql, function (err, result) {
      if (err) throw err
      // console.log("User created")
    })

    // sql = "CREATE TABLE if not exists \
    // Owner                                 \
    // (                                     \
    //   First_Name varchar(20) NOT NULL,    \
    //   Last_Name varchar(20) NOT NULL,     \
    //   Own_Roll_Number varchar(7) NOT NULL,\
    //   Email_ID varchar(40) NOT NULL,      \
    //   Phone_Number varchar(10) NOT NULL,  \
    //   Password varchar(20) NOT NULL,      \
    //   Feedback varchar(100),              \
    //   Ratings INT,                        \
    //   PRIMARY KEY (Own_Roll_Number)       \
    // );"
    // db.query(sql, function (err, result) {
    //   if (err) throw err
    //   console.log("Owner created")
    // })

    // sql = "CREATE TABLE if not exists     \
    // Renter                                \
    // (                                     \
    //   First_Name varchar(20) NOT NULL,    \
    //   Last_Name varchar(20) NOT NULL,     \
    //   Ren_Roll_Number varchar(7) NOT NULL,\
    //   Email_ID varchar(40) NOT NULL,      \
    //   Phone_Number varchar(10) NOT NULL,  \
    //   Password varchar(20) NOT NULL,      \
    //   PRIMARY KEY (Ren_Roll_Number)       \
    // );"
    // db.query(sql, function (err, result) {
    //   if (err) throw err
    //   console.log("Renter created")
    // })

    sql = "CREATE TABLE if not exists                     \
    bicycle                                               \
    (                                                     \
      bicycle_id INT AUTO_INCREMENT,                      \
      geared varchar(10),                                  \
      rent_rate INT,                                      \
      start_time TIME,                                    \
      end_time TIME,                                      \
      availability varchar(5),                            \
      bi_own_roll varchar(7),                             \
      PRIMARY KEY (bicycle_id, bi_own_roll)               \
    );"
    db.query(sql, function (err, result) {
      if (err) throw err
      // console.log("Bicycle created")
    })

    sql = "CREATE TABLE if not exists                             \
    feedback                                                      \
    (                                                             \
      feedback_id  INT AUTO_INCREMENT,                            \
      feedback_data text NOT NULL,                                \
      feedback_date DATE NOT NULL,                                \
      ratings INT NOT NULL,                                       \
      fe_own_roll varchar(7),                                     \
      fe_ren_roll varchar(7),                                     \
      PRIMARY KEY (feedback_id, fe_own_roll, fe_ren_roll)         \
    );"
    db.query(sql, function (err, result) {
      if (err) throw err
      // console.log("Feedback created")
    })

    sql = "CREATE TABLE if not exists                             \
    fine                                                          \
    (                                                             \
      fine_id INT AUTO_INCREMENT NOT NULL,                        \
      crossed_time varchar(5) NOT NULL,                           \
      damage varchar(5) NOT NULL,                                 \
      amount INT NOT NULL,                                        \
      fi_own_roll varchar(7) NOT NULL,                            \
      fi_ren_roll varchar(7) NOT NULL,                            \
      PRIMARY KEY (fine_id, fi_own_roll, fi_ren_roll)             \
    );"
    db.query(sql, function (err, result) {
      if (err) throw err
      // console.log("Fine created")
    })

    sql = "CREATE TABLE if not exists                             \
    rent                                                          \
    (                                                             \
      rent_id INT AUTO_INCREMENT NOT NULL,                        \
      amount INT NOT NULL,                                        \
      re_own_roll varchar(7) NOT NULL,                            \
      re_ren_roll varchar(7) NOT NULL,                            \
      PRIMARY KEY (rent_id, re_own_roll, re_ren_roll)             \
    );"
    db.query(sql, function (err, result) {
      if (err) throw err
      // console.log("Rent created")
    })
  }
}