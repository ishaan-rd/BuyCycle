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
    if (req.user.user_id === 0) {
        db.query('select * from feedback', (error, results, fields) => {
            if (error) throw error

            res.render('feedback', { title: 'Admin View of Feedbacks', admin: 'true', results: results})
        })
    } else {
        db.query('select * from users u where u.id = ?', [req.user.user_id], (error, results, fields) => {
            if (error) throw error

            if (results[0].role === 'owner') {
                db.query('select * from feedback where fe_own_roll = ?', [results[0].username], (error, results, fields) => {
                    if (error) throw error

                    res.render('feedback', { title: 'Feedbacks', results: results, owner: 'true' })
                })
            } else {
                res.render('feedback', { title: 'Submit Feedback' })
            }
        })
    }
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
    
    db.query('select * from rent r, users u where u.id = ? and u.username = r.re_ren_roll', [req.user.user_id], (error, results, fields) => {
        if (error) throw error

        // console.log('feed', results)
        const fe_ren_roll = results[0].username
        const fe_own_roll = results[0].re_own_roll
        db.query('insert into feedback (feedback_data, feedback_date, ratings, fe_own_roll, fe_ren_roll) values (?, ?, ?, ?, ?)', [data, today, rating, fe_own_roll, fe_ren_roll],
        (error, results, fields) => {
            if (error) throw error

            res.redirect('/rent')
        })

    })

})

module.exports = router