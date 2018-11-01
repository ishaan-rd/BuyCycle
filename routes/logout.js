const express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    req.logout()
    req.session.destroy()
    res.redirect('/signin')
})

module.exports = router