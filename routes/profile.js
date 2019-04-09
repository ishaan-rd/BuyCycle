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
    auth.getProfile(req, res, next)
    // console.log(req.user.user_id)
})
.post(auth.authenticationMiddleware(), (req, res, next) => {
    auth.postProfile(req, res, next)
})

module.exports = router