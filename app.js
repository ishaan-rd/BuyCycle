const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const db = require('./db')

// authentication packages
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var MySQLStore = require('express-mysql-session')(session)
var bcrypt = require('bcrypt')

var createSchema = require('./node_db/tables.js')

const indexRouter = require('./routes/index')
const logoutRouter = require('./routes/logout')
const feedbackRouter = require('./routes/feedback')
const fineRouter = require('./routes/fine')
const profileRouter = require('./routes/profile')
const rentRouter = require('./routes/rent')
const signinRouter = require('./routes/signin')
const signupRouter = require('./routes/signup')
const transationsRouter = require('./routes/transactions')
const updateProfileRouter = require('./routes/updateProfile')

const port = 3001;

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator([]))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

var options = {
    host: "localhost",
    user: "root",
    password: "mysql@6298",
    database: "dbms_project"
}

var sessionStore = new MySQLStore(options)

app.use(session({
    secret: 'mksldfjasdfll',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    next()
})

app.use('/', indexRouter)
app.use('/index', indexRouter)
app.use('/logout', logoutRouter)
app.use('/feedback', feedbackRouter)
app.use('/fine', fineRouter)
app.use('/profile', profileRouter)
app.use('/rent', rentRouter)
app.use('/signin', signinRouter)
app.use('/signup', signupRouter)
app.use('/transactions', transationsRouter)
app.use('/updateProfile', updateProfileRouter)

// authentication for login
passport.use(new LocalStrategy(
    function(username, password, done) {
        db.query('select id, password from users where username = ?', [username], (err, results, fields) => {
            if (err) {done(err)}

            if (results.length === 0) {
                done(null, false)
            } else {
                const hash = results[0].password.toString()
                bcrypt.compare(password, hash, (err, response) => {
                    if (response === true) {
                        return done(null, {user_id: results[0].id})
                    } else {
                        return done(null, false)
                    }
                })
            }
        })
    }
))

// catch 404 error
app.use(function(req, res, next) {
    var err = new Error('Page Not Found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

// Handlebars default config
const hbs = require('hbs')
const fs = require('fs')

const partialsDir = __dirname + '/views/partials'

const filenames = fs.readdirSync(partialsDir)

filenames.forEach(function (filename) {
  const matches = /^([^.]+).hbs$/.exec(filename)
  if (!matches) {
    return
  }
  const name = matches[1]
  const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8')
  hbs.registerPartial(name, template)
})

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2)
})

app.listen(process.env.PORT || port, () => console.log(`Server started running on port: ${port}`))

createSchema.createTables()

module.exports = app