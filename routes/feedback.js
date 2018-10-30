const express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.all((req, res, next) => {
    res.statusCode = 200
})
.get((req, res, next) => {

})
.post((req, res, next) => {
    
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router