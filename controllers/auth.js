var express = require('express')
var router = express.Router()
var User = require("../models/user")
var passport = require('../config/passport')

// GET /logout
router.get('/logout', function (req, res) {
    req.logout()
    req.flash('success', 'You have logged out')
    res.redirect('/')
})

// GET /signup
router.get('/signup', function (req, res) {
    res.render('signup')
})

// POST /signup
router.post('/signup', function (req, res, next) {
    if (req.body.email &&
        req.body.name &&
        req.body.password &&
        req.body.confirmPassword) {
        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
          req.flash('error', 'Passwords do not match')
          return res.redirect('/signup')
        }

        // create object with form input
        var newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })

        // use schema's `save` method to insert document into Mongo
        newUser.save(function (error, user) {
          if (error) {
              req.flash('error', 'Could not create user account, contact Felix')
              res.redirect('/signup')
          } else {
              passport.authenticate('local', {
                  successRedirect: '/profile',
                  successFlash: 'Account created and logged in'
              })(req, res)
          }
      })

    } else {
      req.flash('error', 'All fields required')
      return res.redirect('/signup')
    }
})

// GET /login
router.get('/login', function (req, res) {
    res.render('login')
})

// POST /login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: 'Invalid username and/or password',
    successFlash: 'You have logged in'
}))

module.exports = router
