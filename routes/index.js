const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    res.statusCode = 200
    res.render('index', { title: 'Index' })
})
.post((req, res, next) => {
    
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router