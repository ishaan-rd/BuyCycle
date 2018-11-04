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
    db.query('select * from users where id = ?', [req.user.user_id], (error, results, fields) => {
        if (error) throw error

        if (results[0].username === 'admin') {
            db.query('select * from users', (error, results, fields) => {
                if (error) throw error

                res.render('index', { all: results, result: '', ownFields: '' })
            })
        } else if (results[0].role === 'renter') {
            db.query('select * from bicycle b, users u where b.bi_own_roll = u.username and availability = "true"',
            (error, results, fields) => {
                if (error) throw error
                // console.log(results)
                
                res.render('index', { result: results, all: '', ownFields: '' })
            })
        } else if (results[0].role === 'owner') {
            db.query('select * from rent where re_own_roll = ? order by rent_id desc limit 0,1', [results[0].username], (error, results, fields) => {
                if (error) throw error

                const ren_roll = results[0].re_ren_roll
                db.query('select * from users u, bicycle b where u.username = ?', [ren_roll], (error, results, fields) => {
                    if (error) throw error
                    
                    console.log(results[0])
                    res.render('index', { ownFields: results, all: '', result: '' })
                })
            })
        } else {
            res.redirect('/profile')
        }
    })
})
.post(auth.authenticationMiddleware(), (req, res, next) => {
    console.log('big shaq', req.body)
    const own_roll = req.body.rentThis
    const rent = req.body.rentRate

    db.query('update bicycle set availability = "false" where bi_own_roll = ?', [own_roll],
    (error, results, fields) => {
        if (error) throw error

        db.query('select username from users where id = ?', [req.user.user_id], (error, results, fields) => {
            if (error) throw error
            const ren_roll = results[0].username
            
            db.query('insert into rent (amount, re_own_roll, re_ren_roll) values (?, ?, ?)', [rent, own_roll, ren_roll],
            (error, results, fields) => {
                if (error) throw error

                res.redirect('/rent');
            })
        })
    })
})

module.exports = router