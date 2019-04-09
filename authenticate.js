const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('./db.js')

const brcypt = require('bcrypt')
const saltRounds = 10

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = {
    authenticationMiddleware: () => {  
        return (req, res, next) => {
            console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`)

            if (req.isAuthenticated()) return next()
            res.redirect('/signin')
        }
    },

    getRent: (req, res, next) => {
        if (req.user.user_id === 0) {
            db.query('select * from rent r, users u where r.re_ren_roll = u.username', (error, results, fields) => {
                if (error) throw error
    
                res.render('rent', { results: results, admin: 'true' })
            })
        } else {
            db.query('select * from users u, bicycle b, rent r where r.re_own_roll = b.bi_own_roll and b.bi_own_roll = u.username \
            and b.availability = "false" and u.id != ? order by rent_id desc limit 0,1', [req.user.user_id], 
            (error, results, fields) => {
                if (error) throw error

                res.render('rent', {results: results, renter: 'true'})
            })
        }
    },

    getProfile: (req, res, next) => {
        db.query('select * from users where id = ?', [req.user.user_id], (error, results, fields) => {
            // console.log(results)
            if (results[0].username === 'admin') {
                res.render('profile', { title: 'Admin Profile' })
            } else if (results[0].name) {
                var resName = results[0].name
                res.render('profile', { title: 'Profile', exists: 'true', name: resName })
            } else {
                res.render('profile', { title: 'Profile', notexists: 'true' })
            }
        })
    },

    postProfile: (req, res, next) => {
        const name = req.body.name
        const phone_number = req.body.phone
        const role = req.body.role
        console.log(req.body)
        
        db.query('update users set role = ?, name = ?, phone_number = ? where id = ' + req.user.user_id, [role, name, phone_number],
        (error, results, fields) => {
            if (error) {
                res.render('error', { message: error })
            } else {
                console.log('updated profile')
                res.redirect('/profile')
            }
        })

        if (role === 'owner') {
            var gear = req.body.optGear
            var start_time = req.body.start_time
            var end_time = req.body.end_time
            var bi_own_roll = ''

            var rent = 0
            if (gear === 'geared') {
                rent = 15
            } else {
                rent = 10
            }
            console.log(gear, rent, start_time, end_time)

            // get owner's roll number
            db.query('select username from users where id = ' + req.user.user_id,
            (error, results, fields) => {
                if (error) {
                    res.render('error', { message: error })
                } else {
                    bi_own_roll = results[0].username
                    console.log('username = ', bi_own_roll)

                    db.query('insert into bicycle (geared, rent_rate, start_time, end_time, availability, bi_own_roll) values (?, ?, ?, ?, "true", ?)', [gear, rent, start_time, end_time, bi_own_roll], 
                    (error, results, fields) => {
                        if (error) {
                            throw error
                        } else {
                            res.render('profile', { title: 'Profile' })
                        }
                    })
                }
            })
        }
    },

    getIndex: (req, res, next) => {
        db.query('select * from users where id = ?', [req.user.user_id], (error, results, fields) => {
            if (error) throw error
    
            if (results[0].username === 'admin') {
                db.query('select * from users', (error, results, fields) => {
                    if (error) throw error
    
                    res.render('index', { all: results, result: '', ownFields: '' })
                })
            } else if (results[0].role === 'renter') {
                db.query('select * from bicycle b, users u where b.bi_own_roll = u.username and availability = "true"',
                (error, results, fields) => {
                    if (error) throw error
                    // console.log(results)
                    
                    res.render('index', { result: results, all: '', ownFields: '' })
                })
            } else if (results[0].role === 'owner') {
                db.query('select * from rent where re_own_roll = ? order by rent_id desc limit 0,1', [results[0].username], (error, results, fields) => {
                    if (error) throw error
                    
                    if (results.length > 0) {
                        const ren_roll = results[0].re_ren_roll
                        db.query('select * from users u, bicycle b where u.username = ?', [ren_roll], (error, results, fields) => {
                            if (error) throw error
                            
                            res.render('index', { ownFields: results, all: '', result: '' })
                        })
                    } else {
                        res.render('index', { result: '', all: '', ownFields: '' })
                    }
                })
            } else {
                res.redirect('/profile')
            }
        })
    },

    postIndex: (req, res, next) => {
        console.log('big shaq', req.body)
        const own_roll = req.body.rentThis
        const rent = req.body.rentRate

        db.query('update bicycle set availability = "false" where bi_own_roll = ?', [own_roll],
        (error, results, fields) => {
            if (error) throw error

            db.query('select username from users where id = ?', [req.user.user_id], (error, results, fields) => {
                if (error) throw error
                const ren_roll = results[0].username
                
                db.query('insert into rent (amount, re_own_roll, re_ren_roll) values (?, ?, ?)', [rent, own_roll, ren_roll],
                (error, results, fields) => {
                    if (error) throw error

                    res.redirect('/rent');
                })
            })
        })
    },

    postSignUp: (req, res, next) => {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        db.query('select * from users where username = ?', [username], 
        (error, results, fields) => {
            console.log(results)
            if (error) {
                throw error
            } else if (results.length > 0) {
                res.render('signup', { title: 'Registration Error', errors: [{"msg":"Username already exists"}] })
            } else {
                brcypt.hash(password, saltRounds, (err, hash) => {
                    console.log('hashing the password')
                    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash],
                    (error, results, fields) => {
                        if (error) throw error

                        db.query('SELECT LAST_INSERT_ID() as user_id', (err, results, fields) => {
                            if (err) throw err

                            const user_id = results[0]
                            console.log(results[0])
                            req.login(user_id, (err) => {
                                res.redirect('/')
                            })
                        })
                    })
                })
            }
        })
    }
}