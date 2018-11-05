const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db.js')

// auth
const auth = require('../authenticate.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    if (req.user.user_id === 0) {
        db.query('select * from fine', (error, results, fields) => {
            if (error) throw error

            res.render('fine', { results: results, admin: 'true' })
        })
    } else {}
})
.post((req, res, next) => {
    
})

module.exports = router