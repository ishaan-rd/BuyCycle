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
    if (req.user.user_id === 0) {
        db.query('select * from rent', (error, results, fields) => {
            if (error) throw error

            res.render('rent', { results: results, admin: 'true' })
        })
    } else {
        db.query('select * from users u, bicycle b, rent r where r.re_own_roll = b.bi_own_roll and b.bi_own_roll = u.username \
        and b.availability = "false" order by rent_id desc limit 0,1',
    (   error, results, fields) => {
            if (error) throw error

            // console.log('i wanna', results)
           res.render('rent', {results: results})
        })
    }
})
.post((req, res, next) => {
    // console.log(req.body.returnCycle)
    db.query('update bicycle set availability = "true" where bi_own_roll = ?', [req.body.returnCycle],
    (error, results, fields) => {
        if (error) throw error

        res.redirect('/')
    })
})

module.exports = router