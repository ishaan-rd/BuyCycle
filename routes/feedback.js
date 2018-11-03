const express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const db = require('../db.js')

// auth
const auth = require('../authenticate.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get(auth.authenticationMiddleware(), (req, res, next) => {
    res.statusCode = 200
    res.render('feedback', { title: 'Feedback' })
})
.post(auth.authenticationMiddleware(), (req, res, next) => {
    const data = req.body.feedback
    const rating = parseInt(req.body.rating)

    // find a way to get fe_own_roll
    const fe_own_roll = ''

    // get today's date
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth()+1     // January is 0!
    var yyyy = today.getFullYear()
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    } 
    today = yyyy + ':' + mm + ':' + dd
    
    db.query(`select username from users where id = ${req.user.user_id}`, (error, results, fields) => {
        if (error) throw error

        const fe_ren_roll = results[0].username
        db.query('insert into feedback values (?, ?, ?, ?, ?)', [data, today, rating, fe_own_roll, fe_ren_roll],
        (error, results, fields) => {
            if (error) throw error

            res.redirect('/')
        })

    })

})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router