const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    res.statusCode = 200
    
    var sql = `select * from Bicycle`
    db.query(sql, (err, results, fields) => {
        if (err) throw err;
        console.log(results)
        res.send(results)
    })
})
.post((req, res, next) => {
    
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router