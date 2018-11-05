const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db.js')

// auth
const auth = require('../authenticate.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    if (req.user.user_id === 0) {
        db.query('select * from fine', (error, results, fields) => {
            if (error) throw error

            res.render('fine', { results: results, admin: 'true' })
        })
    } else {
        res.render('fine', { owner: 'true' })
    }
})
.post((req, res, next) => {
    db.query('select * from rent r, users u where u.username = r.re_own_roll and u.id = ? order by rent_id desc limit 0,1', [req.user.user_id],
    (error, results, fields) => {
        if (error) throw error
        // console.log(req.body)
        // console.log(results)
        var amount = 0

        db.query('insert into fine (crossed_time, damage, amount, fi_own_roll, fi_ren_roll) values (?, ?, ?, ?, ?)', [req.body.time, req.body.damage, amount, results[0].re_own_roll, results[0].re_ren_roll],
        (error, results, fields) => {
            if (error) throw error

            res.redirect('/')
        })
    })
})

module.exports = router