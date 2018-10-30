const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')


const db = require('../db.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    res.render('signup', { title: 'Sign Up' })
})
.post((req, res, next) => {
    req.checkBody('username', 'Username field cannot be empty.').notEmpty()
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(7)
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail()
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100)
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100)
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password)
    // Additional validation to ensure username is alphanumeric with underscores and dashes
    // req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

    const errors = req.validationErrors();

    if (errors) {
        console.log(`errors: ${JSON.stringify(errors)}`)

        res.render('signup', {
            title: 'Registration Error',
            errors: errors
        })
    } else {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        db.query('INSERT INTO users VALUES (?, ?, ?)', [username, email, password], (error, results, fields) => {
            if (error) throw error

            res.render('signup', {
                title: 'Sign Up Complete'
            })
        })
    }
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router