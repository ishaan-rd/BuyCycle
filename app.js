const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const feedbackRouter = require('./routes/feedback')
const fineRouter = require('./routes/fine')
const profileRouter = require('./routes/profile')
const rentRouter = require('./routes/rent')
const transationsRouter = require('./routes/transactions')
const usersRouter = require('./routes/users')

const port = 5000;

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/feedback', feedbackRouter)
app.use('/fine', fineRouter)
app.use('/profile', profileRouter)
app.use('/rent', rentRouter)
app.use('/transactions', transationsRouter)
app.use('/users', usersRouter)

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

app.listen(process.env.PORT || port, () => console.log(`Server started running on port: ${port}`));

module.exports = app