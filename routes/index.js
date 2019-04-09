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
    auth.getIndex(req, res, next)
})
.post(auth.authenticationMiddleware(), (req, res, next) => {
    auth.postIndex(req, res, next)
})

module.exports = router