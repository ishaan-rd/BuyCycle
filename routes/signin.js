const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

// auth
const passport = require('passport')
const auth = require('../authenticate.js')

const brcypt = require('bcrypt')
const saltRounds = 10

const db = require('../db.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    res.render('signin', { title: 'Sign In' })
})
.post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    // failureFlash: true
}))

module.exports = router