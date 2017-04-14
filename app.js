require('dotenv').config({
    silent: true
})
var express = require('express')
var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('./config/passport')
var flash = require('connect-flash')
var app = express()
var isLoggedIn = require('./middleware/isLoggedIn')
var csurf = require("csurf")
var port = process.env.PORT || 4000

// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/wdi-project2'
mongoose.connect(dbURI)
mongoose.Promise = global.promise

// check if our connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    // we're connected!
    console.log('really really connected')
})

// setup the ejs template
app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
// initialize the passport configuration and session as middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(ejsLayouts)

app.use(function(req, res, next) {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next()
})

// setup the method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use('/auth', require('./controllers/auth'))

// // require the users_controller
// var usersController = require('./controllers/users_controller')
// app.use(usersController)
//
// // require the checkout_controller
// var checkoutController = require('./controllers/checkout_controller')
// app.use(checkoutController)

// Always setup your loading page at the end after you require everything
app.get('/', function(req, res) {
    console.log("login page runs");
    res.render('auth/login')
})

app.use(isLoggedIn)
// anything below here requires the user to be logged in
app.get('/backendhome', function(req, res) {
    res.render('backendhome')
})

app.use(function(req, res) {
    res.send('error found')
})

app.listen(port, function() {
    console.log('app is running at ' + port)
})
