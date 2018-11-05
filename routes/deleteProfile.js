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
    
})
.post(auth.authenticationMiddleware(), (req, res, next) => {
    db.query('delete from users where id = ?', [req.user.user_id], (error, results, fields) => {
        if (error) throw error

        req.logout()
        req.session.destroy()
        res.redirect('/signin')
    })
})

module.exports = router