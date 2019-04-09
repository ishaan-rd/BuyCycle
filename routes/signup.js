const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

// auth
const passport = require('passport')
const auth = require('../authenticate.js')

const db = require('../db')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    res.render('signup', { title: 'Sign Up' })
    console.log(req.user)
    console.log(req.isAuthenticated())
})
.post(async (req, res, next) => {
    req.checkBody('username', 'Username field cannot be empty.').notEmpty()
    req.checkBody('username', 'Username must be of the specified format').len(7)
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail()
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100)
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100)
    // req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password)
    // Additional validation to ensure username is alphanumeric with underscores and dashes
    req.checkBody('username', 'Username not matching the required format (16CO101)').matches(/[1][5-8][A-Z][A-Z][1-2][0-9][0-9]/);

    const errors = req.validationErrors();

    if (errors) {
        console.log(`errors: ${JSON.stringify(errors)}`)

        res.render('signup', {
            title: 'Registration Error',
            errors: errors
        })
    } else {
        auth.postSignUp(req, res, next)
    }
})
passport.serializeUser(function(user_id, done) {
    done(null, user_id);
})
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
})

module.exports = router