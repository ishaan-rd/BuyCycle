const express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res, next) => {

})

router.post('/', (req, res, next) => {
    var obj = {
        ratings: req.body.ratings,
        review: req.body.review,
        uid: req.user._id
    }
    console.log(obj)
    
})

module.exports = router