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
    auth.getRent(req, res, next)
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