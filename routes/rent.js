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
    res.render('rent', { title: 'Rent' })

    db.query
})
.post((req, res, next) => {
    
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router