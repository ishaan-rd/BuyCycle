const express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
.get((req, res, next) => {
    res.statusCode = 200
    res.render('feedback', { title: 'Feedback' })
})
.post((req, res, next) => {
    
})
.put((req, res, next) => {

})
.delete((req, res, next) => {
    
})

module.exports = router