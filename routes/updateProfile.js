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
    res.render('updateProfile', { title: 'Update Your Profile' })
})
.post(auth.authenticationMiddleware(), (req, res, next) => {
    console.log(req.body.name.length)
    if (req.body.name.length >= 1) {
        const name = req.body.name
        db.query('update users set name = ? where id = ' + req.user.user_id, [name],
        (error, results, fields) => {
            if (error) {
                res.render('error', { message: error })
            }
        })
    }
    if (req.body.phone.length >= 1) {
        const phone_number = req.body.phone
        db.query('update users set phone_number = ? where id = ' + req.user.user_id, [phone_number],
        (error, results, fields) => {
            if (error) {
                res.render('error', { message: error })
            }
        })
    }
    if (req.body.role) {
        role = req.body.role
        db.query('update users set role = ? where id = ' + req.user.user_id, [role],
        (error, results, fields) => {
            if (error) {
                res.render('error', { message: error })
            } else if (role === 'owner') {
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
    }    
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router