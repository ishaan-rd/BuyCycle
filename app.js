const express = require('express')
const bodyParser = require('body-parser')
const path = require(path)

const usersRouter = require('./routes/users')
const feedbackRouter = require('./routes/feedback')


var app = express()


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', index)
app.use('/users', usersRouter)
app.use('/feedback', feedbackRouter)

app.use(express.static(path.join(__dirname, 'public')))

// catch 404 error
app.use(function(req, res, next) {
    var err = new Error('Page Not Found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

module.exports = app