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
    db.query('select * from bicycle b, users u where b.bi_own_roll = u.username and availability = "true"',
    (error, results, fields) => {
        if (error) throw error
        // console.log(results)
        
        res.render('index', { results: results})
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
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router