var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('../config/passport')

// SIGNUP PAGE
router.get('/signup', function (req, res) {
    res.render('auth/signup')
})

router.post('/signup', function (req, res) {
    var newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    })

    newUser.save(function(err, data) {
        if (err) {
            req.flash('error', 'Could not create user account')
            res.redirect('/auth/signup')
        } else {
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Account created and logged in'
            })(req, res)
        }
    })
})

// LOGIN PAGE
// router.get('/login', function (req, res) {
//     res.render('auth/login')
// })

router.post('/login', passport.authenticate('local', {
    successRedirect: '/backendhome',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username and/or password',
    successFlash: 'You have logged in'
}))

router.get('/logout', function (req, res) {
  console.log("logout runs");
    req.logout()
    req.flash('success', 'You have logged out')
    res.redirect('/')
})

module.exports = router
