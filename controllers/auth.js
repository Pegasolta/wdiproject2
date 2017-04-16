var express = require('express')
var router = express.Router()
var User = require("../models/user")
var mid = require('../middleware/isLoggedIn')

// GET /profile
router.get('/profile', mid.requiresLogin, function (req, res, next) {
  User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error)
        } else {
          return res.render('profile')
        }
      })
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
            var err = new Error('Passwords do not match.')
            err.status = 400
            return next(err)
        }

        // create object with form input
        var newUser = new User ({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })

        // use schema's `create` method to insert document into Mongo
        newUser.save(function (error, user) {
            if (error) {
                return next(error)
            } else {
                req.session.userId = user._id
                res.redirect("profile")
            }
        })

    } else {
        var err = new Error('All fields required.')
        err.status = 400
        return next(err)
    }
})


// GET /login
router.get('/login', function (req, res) {
    res.render('login')
})

// POST /login
router.post('/login', function (req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.')
        err.status = 401
        return next(err)
      } else {
        req.session.userId = user._id
        return res.redirect('/profile')
      }
    })
  } else {
    var err = new Error('Email and password are required.')
    err.status = 401
    return next(err)
  }
})

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contactus', function(req, res, next) {
  return res.render('contactus', { title: 'Contact' });
});

module.exports = router
