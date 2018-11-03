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
    db.query('select * from users where id = ?', [req.user.user_id], (error, results, fields) => {
        console.log(results)
        if (results[0].name) {
            res.render('profile', { title: 'Profile', exists: 'true', name: results[0].name })
        } else {
            res.render('profile', { title: 'Profile', exists: '' })
        }
    })
    console.log(req.user.user_id)
})
.post(auth.authenticationMiddleware(), (req, res, next) => {
    const name = req.body.name
    const phone_number = req.body.phone
    const role = req.body.role
    console.log(req.body.role)
    
    db.query('update users set role = ?, name = ?, phone_number = ? where id = ' + req.user.user_id, [role, name, phone_number],
    (error, results, fields) => {
        if (error) {
            res.render('error', { message: error })
        } else {
            console.log('updated profile')
            res.redirect('/profile')
        }
    })

    if (role === 'owner') {
        var gear = req.body.optGear
        var start_time = req.body.start_time
        var end_time = req.body.end_time
        var bi_own_roll = ''

        var rent = 0
        if (gear === true) {
            rent = 15
        } else {
            rent = 10
        }
        console.log(gear, rent, start_time, end_time)

        // get owner's roll number
        db.query('select username from users where id = ' + req.user.user_id,
        (error, results, fields) => {
            if (error) {
                res.render('error', { message: error })
            } else {
                bi_own_roll = results[0].username
                console.log('username = ', bi_own_roll)

                db.query('insert into bicycle (geared, rent_rate, start_time, end_time, bi_own_roll) values (?, ?, ?, ?, ?)', [gear, rent, start_time, end_time, bi_own_roll], 
                (error, results, fields) => {
                    if (error) {
                        res.render('error', { message: error })
                    } else {
                        res.render('profile', {  })
                    }
                })
            }
        })
    }
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router