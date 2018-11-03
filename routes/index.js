const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db.js')

// auth
const auth = require('../authenticate.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get(auth.authenticationMiddleware(), (req, res, next) => {
    db.query('select b.geared, b.rent_rate, b.start_time, b.end_time, u.name, u.phone_number, u.email from bicycle b, users u where b.bi_own_roll = u.username',
    (error, results, fields) => {
        if (error) throw error
        // console.log(results)
        
        res.render('index', { results: results})
    })
})
.post((req, res, next) => {
    
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router